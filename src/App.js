import "./App.css";
import Header from "./components/Header";
import Encounters from "./components/Encounters";
import Referrals from "./components/Referrals";
import { useState, useEffect } from "react";
import {
  Profile_Epic,
  Profile_Epic_2,
  Profile_Logica,
} from "./components/Profiles";

function App() {
  const defaultProfile = Profile_Epic;
  const defaultProfileName = defaultProfile.name;
  const [currentProfileName, setCurrentProfileName] =
    useState(defaultProfileName);
  //const [profile, setProfile] = useState(defaultProfile);
  const [patient, setPatient] = useState(defaultProfile.defaultPatient);
  const [provider, setProvider] = useState(defaultProfile.defaultProvider);
  const [currentEncounter, setCurrentEncounter] = useState(
    defaultProfile.defaultEncounter
  );
  const [accessToken, setAccessToken] = useState(defaultProfile.access_token);
  const [baseUrl, setBaseUrl] = useState(defaultProfile.defaultBaseUrl);
  const [notificationUrl, setNotificationUrl] = useState(
    defaultProfile.defaultNotificationUrl
  );
  const [referrals, setReferrals] = useState([]);
  const [encounters, setEncounters] = useState([]);

  const [sampleDocumentReference, setSampleDocumentReference] = useState("");

  const [toastMessage, setToastMessage] = useState(
    "Retrieving FHIR resources ... "
  );
  const [showMessageToast, setShowMessageToast] = useState(true);
  const toggleShowMessageToast = () => setShowMessageToast(!showMessageToast);

  const [progress, setProgress] = useState("0%");

  const switchProfile = async (profileName) => {
    //if (profileName === currentProfileName) return
    setProgress("0%");
    setShowMessageToast(true);

    console.log("Switch to profile: ", profileName);
    setCurrentProfileName(profileName);
    let newProfile; //'= profileName === "Logica" ? Profile_Logica : Profile_Epic;
    switch (profileName) {
      case "Logica":
        newProfile = Profile_Logica;
        break;
      case "Epic2":
        newProfile = Profile_Epic_2;
        break;
      default:
        newProfile = Profile_Epic;
    }
    setPatient(newProfile.defaultPatient);
    setProvider(newProfile.defaultProvider);
    setBaseUrl(newProfile.defaultBaseUrl);
    setNotificationUrl(newProfile.defaultNotificationUrl);
    if (newProfile.name === "Logica") {
      setAccessToken(newProfile.accessToken);
    } else {
      let token = await getAccessToken();
      setAccessToken(token);
    }

    setShowMessageToast(false);
    setProgress("0%");
    //setToastMessage("");
  };

  const refreshProfileSettings = async () => {
    const encounterList = await getEncounters(patient.fhirId, baseUrl);
    if (encounterList?.length > 0) {
      await changeCurrentEncounter(encounterList[0].resource.id, baseUrl);
    }
  };

  // Create a referral
  const createReferral = async (referral) => {
    setProgress("0%");
    setShowMessageToast(true);

    console.log("create referral: ", referral);
    const nowISO = new Date().toISOString();

    // Create ServiceRequest
    let url = baseUrl + "/ServiceRequest";
    let resource = {
      resourceType: "ServiceRequest",
      status: "active",
      intent: "plan",
      category: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "307835004",
              display: "Referral by service",
            },
          ],
          text: "Referral by service",
        },
      ],
      priority: "routine",
      subject: {
        reference: `Patient/${patient.fhirId}`,
        display: patient.lastName + ", " + patient.firstName,
      },
      encounter: {
        reference: `Encounter/${currentEncounter}`,
      },
      authoredOn: nowISO,
      requester: [
        {
          reference: `Practitioner/${provider.fhirId}`,
          display: provider.firstName + " " + provider.lastName,
        },
      ],
      // orderDetail: {
      //   text: referral.serviceType.text,
      //   coding: [
      //     {
      //       system: "Unite Us",
      //       code: referral.serviceType.value,
      //       display: referral.serviceType.text,
      //     },
      //   ],
      // },
    };

    if (referral.attachDocument && sampleDocumentReference.length > 0) {
      resource.supportingInfo = [
        {
          reference: `DocumentReference/${sampleDocumentReference}`,
        },
      ];
    }

    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    let data = await res.json();
    let newServiceRequestId = data.id;
    console.log("server request id: ", newServiceRequestId);

    // Create Task
    url = baseUrl + "/Task";
    resource = {
      resourceType: "Task",
      basedOn: [
        {
          reference: `ServiceRequest/${newServiceRequestId}`,
        },
      ],
      status: "requested",
      intent: "plan",
      priority: "routine",
      for: {
        reference: `Patient/${patient.fhirId}`,
        display: patient.lastName + ", " + patient.firstName,
      },
      encounter: {
        reference: `Encounter/${currentEncounter}`,
      },
      authoredOn: nowISO,
      lastModified: nowISO,
      requester: [
        {
          reference: `Practitioner/${provider.fhirId}`,
          display: provider.firstName + " " + provider.lastName,
        },
      ],
      // description:
      //   referral.description +
      //   "/n referred to : " +
      //   referral.referredToGroupIds.text +
      //   " [" +
      //   referral.referredToGroupIds.value +
      //   "]",
      owner: {
        reference: `Organization/${referral.referredToGroupIds.value}`,
        display: referral.referredToGroupIds.text,
      },
    };

    setProgress("5%");

    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    data = await res.json();
    let newTaskId = data.id;
    console.log("Task id: ", newTaskId);

    // Create initial Communication
    url = baseUrl + "/Communication";
    resource = {
      resourceType: "Communication",
      basedOn: [
        {
          reference: `ServiceRequest/${newServiceRequestId}`,
        },
      ],
      partOf: [
        {
          reference: `Task/${newTaskId}`,
        },
      ],
      status: "in-progress",
      subject: {
        reference: `Patient/${patient.fhirId}`,
        display: patient.lastName + ", " + patient.firstName,
      },
      encounter: {
        reference: `Encounter/${currentEncounter}`,
      },
      sent: nowISO,
      recipient: [
        {
          reference: `Organization/${referral.referredToGroupIds.value}`,
          display: referral.referredToGroupIds.text,
        },
      ],
      sender: {
        reference: `Practitioner/${provider.fhirId}`,
        display: provider.firstName + " " + provider.lastName,
      },
    };

    if (referral.description.length > 0) {
      resource.payload = [
        {
          contentString: referral.description,
        },
      ];
    }

    if (referral.attachDocument && sampleDocumentReference.length > 0) {
      resource.payload = [
        ...resource.payload,
        {
          contentReference: {
            reference: `DocumentReference/${sampleDocumentReference}`,
          },
        },
      ];
    }

    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    data = await res.json();
    let newCommunicationId = data.id;
    console.log("Communication id: ", newCommunicationId);

    await getReferrals();

    setProgress("100%");
    setShowMessageToast(false);
  };

  const fetchReferrals = async (
    encounterId = currentEncounter,
    referralBaseUrl = baseUrl
  ) => {
    // fetching Task + ServiceRequest
    //setToastMessage("Fetching FHIR resources: \n Tasks ... \n ServiceRequests ... ");
    setProgress("10%");

    const url =
      referralBaseUrl +
      "/Task?encounter=" +
      encounterId +
      "&_include=Task%3Apatient&_include=Task%3Aencounter&_include=Task%3Arequester&_include=Task%3A" +
      "based-on" + //(currentProfileName === "Epic" ? "basedon" : "based-on") + "%3AServiceRequest" +
      "&_include=Task%3Aowner%3AOrganization";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: accessToken?.length > 0 ? "bearer " + accessToken : "",
      },
    });
    const data = await res.json();
    let entryList = data.total === 0 ? [] : data.entry;
    if (!entryList) return [];
    console.log("Task bundle received: ", entryList);

    // //_include works at Epic, no need to fetch ServiceRequest seperatedly
    // const url2 = baseUrl + "/ServiceRequest?encounter=" + encounterId;
    // const res2 = await fetch(url2, {
    //   method: "GET",
    //   headers: {
    //     "Content-type": "application/json",
    //     Accept: "application/json",
    //     Authorization: accessToken.length > 0 ? "bearer " + accessToken : "",
    //   },
    // });
    // const data2 = await res2.json();
    // let entryList2 = data2.total === 0 ? [] : data2.entry;
    // entryList = entryList.concat(entryList2);

    //filter ServiceRequest and Task
    // if (entryList.length > 0) {
    //   entryList = entryList.filter((entry) => {
    //     return (
    //       entry.resource.resourceType === "ServiceRequest" ||
    //       entry.resource.resourceType === "Task"
    //     );
    //   });
    // }

    // Take all the Task
    let referralList = [];
    entryList.forEach((entry, index) => {
      if (entry.resource.resourceType === "Task") {
        let referral = {
          id: "Task/" + entry.resource.id,
          Task: entry,
        };
        referralList.push(referral);
      }
    });

    // Group the other resources with the Task
    referralList.forEach((referral, index) => {
      const resource = referral?.Task?.resource;
      if (!resource) return;

      const patientId = resource.for?.reference;
      const serviceRequestId = resource.basedOn[0].reference;
      const practitionerId = resource.requester?.reference;
      const organizationId = resource.owner?.reference;

      entryList.forEach((entry, index) => {
        let entryId = entry.resource.id;
        switch (entry.resource.resourceType) {
          case "ServiceRequest": {
            if (serviceRequestId === `ServiceRequest/${entryId}`)
              referral.ServiceRequest = entry;
            break;
          }
          case "Patient": {
            if (patientId === `Patient/${entryId}`) referral.Patient = entry;
            break;
          }
          case "Organization": {
            if (organizationId === `Organization/${entryId}`)
              referral.Organization = entry;
            break;
          }
          case "Practitioner": {
            if (practitionerId === `Practitioner/${entryId}`)
              referral.Practitioner = entry;
            break;
          }
          default:
        }
      });
    });

    // Fetch Communications for each Task
    //setToastMessage((a) => { return a + "\n Communications ... "});
    setProgress("40%");
    for (let referral of referralList) {
      const referralId = referral?.Task?.resource?.id;
      const communications = await fetchCommunications(referralId);
      referral.Communication = communications.entry;
    }

    // Fetch DocumentReferences for each ServiceRequest
    //setToastMessage((a) => { return a + "\n DocumentReferences ... "});
    setProgress("70%");
    for (let referral of referralList) {
      const documentReferences = await fetchDocumentReferences(referral);
      if (documentReferences?.length > 0) {
        referral.DocumentReference = documentReferences;
        setSampleDocumentReference(referral.DocumentReference[0].id);
        console.log("documentReference", referral.DocumentReference);
        console.log("sampleDocumentReference", sampleDocumentReference);
      }
    }

    // Fetch Binaries for all DocumentReferences
    //setToastMessage((a) => { return a + "\nBinaries ... "});
    setProgress("85%");
    for (let referral of referralList) {
      if (referral.DocumentReference?.length > 0) {
        const binaryList = await fetchBinaries(referral.DocumentReference);
        if (binaryList?.length > 0) {
          referral.Binary = binaryList;
        }
      }
    }

    setProgress("95%");
    // look up referral UUID in AWS DDB
    for (let referral of referralList) {
      if (referral.Task?.resource?.id) {
        const trackingItem = await lookupUUReferralId(
          `${baseUrl}/Task/${referral.Task?.resource?.id}`
        );
        if (trackingItem) referral.trackingItem = trackingItem;
      }
    }

    //referralList = referralList.filter((entry) => {
    //  return entry.Task;
    //});

    // Fetch Consents
    //if (currentProfileName === "Epic") {
    //setToastMessage((a) => { return a + "\n Consents ... "});
    const consentList = await fetchConsents();
    if (consentList?.length > 0) {
      referralList.forEach((entry, index) => {
        entry.Consent = consentList;
      });
    }
    //}

    console.log("referral list", referralList);
    referralList.sort((a, b) => {
      const timeA = new Date(a.ServiceRequest.resource.authoredOn).getTime();
      const timeB = new Date(b.ServiceRequest.resource.authoredOn).getTime();
      return timeB - timeA;
    });

    setProgress("100%");
    return referralList;
  };

  const fetchEncounters = async (
    patientId = patient.fhirId,
    encounterBaseUrl = baseUrl
  ) => {
    const url = encounterBaseUrl + "/Encounter?patient=" + patientId;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization:
          accessToken?.length > 0 && currentProfileName !== "Logica"
            ? "bearer " + accessToken
            : "",
      },
    });
    const data = await res.json();

    const encounterList = data.total > 0 ? data.entry : [];

    encounterList.sort((a, b) => {
      const timeA = new Date(a.resource.period.start).getTime();
      const timeB = new Date(b.resource.period.start).getTime();
      return timeB - timeA;
    });
    console.log("encounter", encounterList);
    return encounterList;
  };

  // Fetch Communications for a Task
  const fetchCommunications = async (taskId) => {
    const url = baseUrl + "/Communication?part-of=" + taskId;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: accessToken?.length > 0 ? "bearer " + accessToken : "",
      },
    });
    const data = await res.json();
    console.log("communications: ", data);
    return data;
  };

  // Fetch DocumentReferences for a ServiceRequest
  const fetchDocumentReferences = async (referral) => {
    const documentList = [];
    const supportingInfo = referral?.ServiceRequest?.resource?.supportingInfo;

    if (!supportingInfo) return documentList;

    for (let entry of supportingInfo) {
      const url = baseUrl + "/" + entry.reference;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: accessToken?.length > 0 ? "bearer " + accessToken : "",
        },
      });
      const data = await res.json();
      console.log("documentReference: ", data);
      if (data?.resourceType === "DocumentReference") documentList.push(data);
    }

    return documentList;
  };

  // Fetch DocumentReferences for a ServiceRequest
  const fetchBinaries = async (documentReferenceList) => {
    const binaryList = [];

    if (!documentReferenceList) return binaryList;

    for (let entry of documentReferenceList) {
      const url = baseUrl + "/" + entry.content[0]?.attachment?.url;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/fhir+json",
          Authorization: accessToken?.length > 0 ? "bearer " + accessToken : "",
        },
      });
      const data = await res.json();
      if (data?.resourceType === "Binary") {
        binaryList.push(data);
      }
    }

    return binaryList;
  };

  // Fetch Consent for a Patient
  const fetchConsents = async (
    patientFhirId = patient.fhirId,
    category = currentProfileName === "Logica"
      ? "64292-6"
      : "http://loinc.org|64292-6",
    status = "active"
  ) => {
    const url = `${baseUrl}/Consent?patient=${patientFhirId}&category=${category}&status=${status}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: accessToken?.length > 0 ? "bearer " + accessToken : "",
      },
    });
    const data = await res.json();
    console.log("consent: ", data);
    return data.entry;
  };

  const lookupUUReferralId = async (fhirUrl) => {
    const url =
      "https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/resource_tracking/read";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343",
      },
      body: JSON.stringify({
        full_url: fhirUrl,
      }),
    });
    const data = await res.json();
    const item = data.response?.item;
    console.log("Found item: ", item);
    return item;
  };

  const changeCurrentEncounter = async (encounterSelected, currentBaseUrl) => {
    //if (encounterSelected === currentEncounter) return;
    setProgress("0%");
    setShowMessageToast(true);

    setCurrentEncounter(encounterSelected);
    await getReferrals(encounterSelected, currentBaseUrl);

    setShowMessageToast(false);
    setProgress("0%");
    //setToastMessage("");

    return;
  };

  const getReferrals = async (encounterSelected, referralBaseUrl) => {
    const data = await fetchReferrals(encounterSelected, referralBaseUrl);
    setReferrals(data);
  };

  const getEncounters = async (patientId, encounterBaseUrl) => {
    setProgress("0%");
    setShowMessageToast(true);

    const data = await fetchEncounters(patientId, encounterBaseUrl);
    setEncounters(data);

    setShowMessageToast(false);
    setProgress("0%");
    //setToastMessage("");

    return data;
  };

  const sendNotificationUU = async () => {
    const url = notificationUrl;
    const notification = {
      resourceType: "Bundle",
      type: "Event",
      entry: [
        {
          fullUrl: baseUrl + "/Encounter/" + currentEncounter,
        },
      ],
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343", //"wOvYlZbrIW6THlB68QcJk6UlCwNPKYHfibNCMj03",
      },
      body: JSON.stringify(notification),
    });
    const data = await res.json();
    console.log("notification response: ", data);
    return data;
  };

  const getAccessToken = async () => {
    const url =
      "https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/authentication/token";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343", //"wOvYlZbrIW6THlB68QcJk6UlCwNPKYHfibNCMj03",
      },
      body: JSON.stringify({
        privateKey: null,
      }),
    });
    const data = await res.json();
    const token = data.body.access_token;
    console.log("access token ", token);
    return token;
  };

  const updateReferralStatus = async (taskFhirId, newStatus) => {
    console.log("new status: ", newStatus);
    setProgress("0%");
    setToastMessage("Updating Task Status ...");
    setShowMessageToast(true);

    // fetch the Task first
    let url =
      "https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/request/read";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343",
      },
      body: JSON.stringify({
        baseUrl: baseUrl,
        resourceType: "Task",
        resourceId: taskFhirId,
      }),
    });
    let data = await res.json();
    let task = data.response.body;
    let headers = data.response.headers;
    let eTag =
      currentProfileName === "Logica"
        ? headers["etag"][0]
        : headers["e-tag"][0];
    console.log("task: ", task);
    console.log("headers", headers);

    setProgress("5%");
    // update status and match header
    task.status = newStatus.value;
    let epicCode = mapToEpicCode(newStatus.rejectReason.reason.text);
    if (newStatus.value === "rejected") {
      task.statusReason = {
        coding: [
          {
            system:
              currentProfileName === "Logica"
                ? "HTTPS://UNITEUS.COM/IO/STRUCTUREDEFINITION/STATUS-REASON"
                : "urn:oid:1.2.840.114350.1.13.0.1.7.4.698084.34025",
            code: epicCode.code,
            display: epicCode.display,
          },
        ],
        text: `${newStatus.rejectReason.reason.value}. ${newStatus.rejectReason.note}`,
      };
    }
    console.log("new task: ", task);

    // send Task update requester
    url =
      "https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/request/update";
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343",
      },
      body: JSON.stringify({
        baseUrl: baseUrl,
        resourceType: "Task",
        resourceId: taskFhirId,
        etag: eTag,
        resource: task,
      }),
    });

    setProgress("10%");
    setToastMessage("Retrieving FHIR Resources ...");
    await getReferrals(currentEncounter, baseUrl);
    setShowMessageToast(false);
    setProgress("0%");
    return;
  };

  const mapToEpicCode = (uuCode) => {
    switch (uuCode) {
      case "Not Eligible":
        return {
          system: "urn:oid:1.2.840.114350.1.13.0.1.7.4.698084.34025",
          code: "104",
          display:
            "Patient does not meet the level of care required for admission",
        };
      case "No Capacity":
        return {
          system: "urn:oid:1.2.840.114350.1.13.0.1.7.4.698084.34025",
          code: "101",
          display: "Facility Full",
        };
      case "Do Not Provide Service":
        return {
          system: "urn:oid:1.2.840.114350.1.13.0.1.7.4.698084.34025",
          code: "103",
          display: "Facility cannot provide for patient's needs",
        };
      case "Duplicate":
      case "Unable to Contact Client":
      case "Other":
      default:
        return {
          system: "urn:oid:1.2.840.114350.1.13.0.1.7.4.698084.34025",
          code: "99",
          display: "Other (Comment)",
        };
    }
  };

  useEffect(() => {
    const setProfile = async (profileName) => {
      await switchProfile(profileName);
    };

    setProfile(defaultProfileName);
  }, []);

  useEffect(() => {
    const updateFhir = async () => {
      await refreshProfileSettings();
    };

    updateFhir();
  }, [accessToken]);

  return (
    <div className="App">
      <Header
        patient={patient}
        provider={provider}
        profileName={currentProfileName}
        switchProfile={switchProfile}
      />

      <div
        className={
          showMessageToast ? "toast bg-warning text-secondary show" : "toast"
        }
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="messageToast"
      >
        <div className="toast-header">
          <strong className="me-auto">Please Wait ...</strong>
        </div>
        <div className="toast-body">
          {toastMessage}
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">...</span>
          </div>
          <div className="progress my-2">
            <div
              className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: progress }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row mt-1 mx-0">
          <Encounters
            encounterList={encounters}
            currentEncounter={currentEncounter}
            changeCurrentEncounter={changeCurrentEncounter}
            refreshEncounters={getEncounters}
          />
          <Referrals
            onCreate={createReferral}
            referralList={referrals}
            currentEncounter={currentEncounter}
            sendNotificationUU={sendNotificationUU}
            profileName={currentProfileName}
            updateReferralStatus={updateReferralStatus}
            baseUrl={baseUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
