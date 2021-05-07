import "./App.css";
import Header from "./components/Header";
import Encounters from "./components/Encounters";
import Referrals from "./components/Referrals";
import { useState, useEffect } from "react";
import { Profile_Epic, Profile_Logica } from "./components/Profiles";

function App() {
  const defaultProfile = Profile_Epic;
  const defaultProfileName = defaultProfile.name;
  const [currentProfileName, setCurrentProfileName] = useState(
    defaultProfileName
  );
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

  const switchProfile = async (profileName) => {
    //if (profileName === currentProfileName) return

    console.log("Switch to profile: ", profileName);
    setCurrentProfileName(profileName);
    const newProfile = profileName === "Logica" ? Profile_Logica : Profile_Epic;
    setPatient(newProfile.defaultPatient);
    setProvider(newProfile.defaultProvider);
    setBaseUrl(newProfile.defaultBaseUrl);
    setNotificationUrl(newProfile.defaultNotificationUrl);
    if (newProfile.name === "Epic") {
      let token = await getAccessToken();
      setAccessToken(token);
    } else setAccessToken(newProfile.accessToken);
  };

  const refreshProfileSettings = async () => {
    const encounterList = await getEncounters(patient.fhirId, baseUrl);
    if (encounterList?.length > 0) {
      await changeCurrentEncounter(encounterList[0].resource.id, baseUrl);
    }
  };

  // Create a referral
  const createReferral = async (referral) => {
    console.log("create referral: ", referral);
    const nowISO = new Date().toISOString();

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
              display: "Referral by service (finding)",
            },
          ],
          text: "Referral by service",
        },
      ],
      priority: "routine",
      subject: {
        reference: `Patient/${patient.fhirId}`,
        display: patient.firstName + " " + patient.lastName,
      },
      encounter: {
        reference: `Encounter/${currentEncounter}`,
        display: "Hospital Admission",
      },
      authoredOn: nowISO,
      requester: [
        {
          reference: `Practitioner/${provider.fhirId}`,
          display: provider.firstName + " " + provider.lastName,
        },
      ],
      orderDetail: {
        text: referral.serviceType.text,
        coding: [
          {
            system: "Unite Us",
            code: referral.serviceType.value,
            display: referral.serviceType.text,
          },
        ],
      },
    };

    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    let data = await res.json();
    console.log("new referral: ", data);
    let newId = data.id;
    console.log("server request id: ", newId);

    url = baseUrl + "/Task";
    resource = {
      resourceType: "Task",
      basedOn: [
        {
          reference: `ServiceRequest/${newId}`,
        },
      ],
      status: "requested",
      intent: "plan",
      priority: "routine",
      for: {
        reference: `Patient/${patient.fhirId}`,
        display: patient.firstName + " " + patient.lastName,
      },
      encounter: {
        reference: `Encounter/${currentEncounter}`,
        display: "Hospital Admission",
      },
      authoredOn: nowISO, //"2020-09-20T15:41:39Z",
      lastModified: nowISO,
      requester: [
        {
          reference: `Practitioner/${provider.fhirId}`,
          display: provider.firstName + " " + provider.lastName,
        },
      ],
      description:
        referral.description +
        "/n referred to : " +
        referral.referredToGroupIds.text +
        " [" +
        referral.referredToGroupIds.value +
        "]",
      owner: {
        type: "Organization",
        identifier: {
          use: "usual",
          system: "Unite Us",
          value: referral.referredToGroupIds.value,
        },
        display: referral.referredToGroupIds.text,
      },
    };

    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    data = await res.json();
    console.log("new referral: ", data);
    newId = data.id;
    console.log("Task id: ", newId);

    await getReferrals();
  };

  const fetchReferrals = async (
    encounterId = currentEncounter,
    referralBaseUrl = baseUrl
  ) => {
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
    for (let referral of referralList) {
      const referralId = referral?.Task?.resource?.id;
      const communications = await fetchCommunications(referralId);
      referral.Communication = communications.entry;
    };

    //referralList = referralList.filter((entry) => {
    //  return entry.Task;
    //});

    console.log("referral list", referralList);
    referralList.sort((a, b) => {
      const timeA = new Date(a.ServiceRequest.resource.authoredOn).getTime();
      const timeB = new Date(b.ServiceRequest.resource.authoredOn).getTime();
      return timeB - timeA;
    });
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
        Authorization: accessToken?.length > 0 ? "bearer " + accessToken : "",
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

  const changeCurrentEncounter = async (encounterSelected, currentBaseUrl) => {
    //if (encounterSelected === currentEncounter) return;

    setCurrentEncounter(encounterSelected);
    await getReferrals(encounterSelected, currentBaseUrl);
    return;
  };

  const getReferrals = async (encounterSelected, referralBaseUrl) => {
    const data = await fetchReferrals(encounterSelected, referralBaseUrl);
    setReferrals(data);
  };

  const getEncounters = async (patientId, encounterBaseUrl) => {
    const data = await fetchEncounters(patientId, encounterBaseUrl);
    setEncounters(data);
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
        "Access-Control-Allow-Origin": "*",
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
        />
      </div>
    </div>
  );
}

export default App;
