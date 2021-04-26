import "./App.css";
import Header from "./components/Header";
import Encounters from "./components/Encounters";
import Referrals from "./components/Referrals";
import { useState, useEffect } from "react";

function App() {
  const defaultPatient = {
    firstName: "Aaron",
    lastName: "Alexis",
    gender: "Male",
    dob: "10/26/1989",
    mrn: "smart-9995679",
    fhirId: "smart-9995679",
    uuid: "74216479-7594-413c-9835-9f00a51e5686"
  };

  const defaultProvider = {
    firstName: "Demo",
    lastName: "Provider",
    fhirId: "smart-Practitioner-71482713",
    uuid: "94e5f7ee-1425-42bc-8833-3474b687b125",
    groupId: "bf4aa373-81eb-4da5-9980-2d3e51c57b3c",
    networkId: "145ca925-ba86-490d-b404-35f4fe5ada66"
  };

  const defaultEncounter = "smart-2";
  const defaultBaseUrl = "https://api.logicahealth.org/uufhircrn/open";
  const defaultNotificationUrl =
    "https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService";
  const [referrals, setReferrals] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [patient, setPatient] = useState(defaultPatient);
  const [provider, setProvider] = useState(defaultProvider);
  const [currentEncounter, setCurrentEncounter] = useState(defaultEncounter);

  // Create a referral
  const createReferral = async (referral) => {
    console.log("create referral: ", referral);
    const nowISO = new Date().toISOString();

    let url = "https://api.logicahealth.org/uufhircrn/open/ServiceRequest";
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

    url = "https://api.logicahealth.org/uufhircrn/open/Task";
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

    data = await fetchReferrals();
    console.log("new referral list: ", data);
    setReferrals(data);
  };

  const fetchReferrals = async (
    baseUrl = defaultBaseUrl,
    encounterId = currentEncounter
  ) => {
    const url =
      baseUrl +
      "/Task?encounter=" +
      encounterId +
      "&_include=Task%3Afor%3APatient&_include=Task%3Aencounter&_include=Task%3Arequester&_include=Task%3Abased-on%3AServiceRequest";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    //filter ServiceRequest and Task
    let entryList = data.total === 0 ? [] : data.entry;
    if (entryList.length > 0) {
      entryList = entryList.filter((entry) => {
        return (
          entry.resource.resourceType === "ServiceRequest" ||
          entry.resource.resourceType === "Task"
        );
      });
    }
    const referralList = [];
    entryList.forEach((entry, index) => {
      if (entry.resource.resourceType === "ServiceRequest") {
        let referral = {
          id: "ServiceRequest/" + entry.resource.id,
          ServiceRequest: entry,
        };
        referralList.push(referral);
      }
    });

    entryList.forEach((entry, index) => {
      if (entry.resource.resourceType === "Task") {
        let serviceRequestId = entry.resource.basedOn[0].reference;
        let referral = referralList.find((entry, index) => {
          return entry.id === serviceRequestId;
        });
        if (referral) {
          referral.Task = entry;
        }
      }
    });

    console.log("referral list", referralList);
    referralList.sort((a, b) => {
      const timeA = new Date(
        a.ServiceRequest.resource.meta.lastUpdated
      ).getTime();
      const timeB = new Date(
        b.ServiceRequest.resource.meta.lastUpdated
      ).getTime();
      return timeB - timeA;
    });
    return referralList;
  };

  const fetchEncounters = async (
    baseUrl = defaultBaseUrl,
    patientId = patient.fhirId
  ) => {
    const url = baseUrl + "/Encounter?patient=" + patientId;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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

  const changeCurrentEncounter = async (encounterSelected) => {
    if (encounterSelected === currentEncounter) return;

    setCurrentEncounter(encounterSelected);
    const data = await fetchReferrals(defaultBaseUrl, encounterSelected);
    setReferrals(data);
    return;
  };

  const getReferrals = async () => {
    const data = await fetchReferrals();
    setReferrals(data);
  };

  const getEncounters = async () => {
    const data = await fetchEncounters();
    setEncounters(data);
  };

  const sendNotificationUU = async () => {
    const url = defaultNotificationUrl;
    const notification = {
      resourceType: "Bundle",
      type: "Event",
      entry: [
        {
          fullUrl: defaultBaseUrl + "/Encounter/" + currentEncounter,
        },
      ],
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343", //"wOvYlZbrIW6THlB68QcJk6UlCwNPKYHfibNCMj03",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(notification),
    });
    const data = await res.json();
    console.log("notification response: ", data);
    return data;
  };

  useEffect(() => {
    setPatient(defaultPatient);
    setProvider(defaultProvider);
    setCurrentEncounter("smart-2");
    getEncounters();
    getReferrals();
    const now = new Date();
    console.log("now is ", new Date().toISOString(), now);
  }, []);

  return (
    <div className="App">
      <Header patient={patient} provider={provider} />
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
        />
      </div>
    </div>
  );
}

export default App;
