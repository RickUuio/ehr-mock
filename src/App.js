import "./App.css";
import Header from "./components/Header";
import Encounters from "./components/Encounters";
import Referrals from "./components/Referrals";
import { useState, useEffect } from "react";
import { Profile_Epic, Profile_Logica } from "./components/Profiles";

function App() {
  const defaultProfile = Profile_Epic;
  const [profile, setProfile] = useState(defaultProfile);
  const [patient, setPatient] = useState(profile.defaultPatient);
  const [provider, setProvider] = useState(profile.defaultProvider);
  const [currentEncounter, setCurrentEncounter] = useState();
  const [referrals, setReferrals] = useState([]);
  const [encounters, setEncounters] = useState([]);

  let defaultBaseUrl = profile.defaultBaseUrl;
  let defaultNotificationUrl = profile.defaultNotificationUrl;
  let accessToken = profile.accessToken;

  const switchProfile = (profileName) => {
    console.log("Switch to profile: ", profileName);
    profileName === "Logica"
      ? setProfile(Profile_Logica)
      : setProfile(Profile_Epic);
  };

  // Create a referral
  const createReferral = async (referral) => {
    console.log("create referral: ", referral);
    const nowISO = new Date().toISOString();

    let url = defaultBaseUrl + "/ServiceRequest";
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

    url = defaultBaseUrl + "/Task";
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
      "&_include=Task%3Afor%3APatient&_include=Task%3Aencounter&_include=Task%3Arequester&_include=Task%3A" + 
      (profile.name === "Epic" ? "basedon" : "based-on") + 
      "%3AServiceRequest&_include=Task%3Aowner%3AOrganization";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: accessToken.length > 0 ? "bearer " + accessToken : "",
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
    let referralList = [];
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

    referralList = referralList.filter((entry) => {
      return entry.Task;
    });

    console.log("referral list", referralList);
    referralList.sort((a, b) => {
      const timeA = new Date(a.ServiceRequest.resource.authoredOn).getTime();
      const timeB = new Date(b.ServiceRequest.resource.authoredOn).getTime();
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
        Authorization: accessToken.length > 0 ? "bearer " + accessToken : "",
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
    const data = await fetchEncounters(
      profile.defaultBaseUrl,
      profile.defaultPatient.fhirId
    );
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
        "Accept": "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343", //"wOvYlZbrIW6THlB68QcJk6UlCwNPKYHfibNCMj03",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        privateKey: null
      }),
    });
    const data = await res.json();
    profile.accessToken = data.body.access_token;
    console.log("access token ", profile.accessToken);
  };

  useEffect(() => {
    //setProfile(Profile_Epic);
    setPatient(profile.defaultPatient);
    setProvider(profile.defaultProvider);
    if (profile.name === "Epic") getAccessToken();
    getEncounters();
    if (encounters.length > 0) {
      setCurrentEncounter(encounters[0].resource.id);
      getReferrals();
    }
  }, [profile]);

  return (
    <div className="App">
      <Header
        patient={patient}
        provider={provider}
        profileName={profile.name}
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
          profileName={profile.name}
        />
      </div>
    </div>
  );
}

export default App;
