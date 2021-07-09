export class FhirConnector {
  constructor(baseUrl, profileName) {
    this.baseUrl = baseUrl;
    this.profileName = profileName;
    this.accessToken = '';
  }

  getAccessToken = async () => {
    if (this.accessToken.length > 0) return this.accessToken;

    const url =
      'https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/authentication/token';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'x-api-key': 'sfsdfddfdsfsdfs32342343', //"wOvYlZbrIW6THlB68QcJk6UlCwNPKYHfibNCMj03",
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        privateKey: null,
      }),
    });
    const data = await res.json();
    const token = data.body.access_token;
    console.log('access token ', token);
    this.accessToken = token;
    return token;
  };

  // Fetch a list of encounters for a patient
  fetchEncounters = async (patientId, encounterBaseUrl = this.baseUrl) => {
    const accessToken = await this.getAccessToken();
    const url = encounterBaseUrl + '/Encounter?patient=' + patientId;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken?.length > 0 ? 'bearer ' + accessToken : '',
      },
    });
    const data = await res.json();

    const encounterList = data.total > 0 ? data.entry : [];

    encounterList.sort((a, b) => {
      const timeA = new Date(a.resource.period.start).getTime();
      const timeB = new Date(b.resource.period.start).getTime();
      return timeB - timeA;
    });
    console.log('encounter', encounterList);
    return encounterList;
  };

  // Fetch referrals of an encounter
  fetchReferrals = async (encounterId, referralBaseUrl = this.baseUrl) => {
    const accessToken = await this.getAccessToken();
    const url =
      referralBaseUrl +
      '/Task?encounter=' +
      encounterId +
      '&_include=Task%3Apatient&_include=Task%3Aencounter&_include=Task%3Arequester&_include=Task%3A' +
      'based-on' + //(currentProfileName === "Epic" ? "basedon" : "based-on") + "%3AServiceRequest" +
      '&_include=Task%3Aowner%3AOrganization';

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken?.length > 0 ? 'bearer ' + accessToken : '',
      },
    });
    const data = await res.json();
    let entryList = data.total === 0 ? [] : data.entry;
    if (!entryList) return [];
    console.log('Task bundle received: ', entryList);

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
      if (entry.resource.resourceType === 'Task') {
        let referral = {
          id: 'Task/' + entry.resource.id,
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
          case 'ServiceRequest': {
            if (serviceRequestId === `ServiceRequest/${entryId}`)
              referral.ServiceRequest = entry;
            break;
          }
          case 'Patient': {
            if (patientId === `Patient/${entryId}`) referral.Patient = entry;
            break;
          }
          case 'Organization': {
            if (organizationId === `Organization/${entryId}`)
              referral.Organization = entry;
            break;
          }
          case 'Practitioner': {
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
      const communications = await this.fetchCommunications(referralId);
      referral.Communication = communications.entry;
    }

    // Fetch DocumentReferences for each ServiceRequest
    for (let referral of referralList) {
      const documentReferences = await this.fetchDocumentReferences(referral);
      if (documentReferences?.length > 0) {
        referral.DocumentReference = documentReferences;
        //setSampleDocumentReference(referral.DocumentReference[0].id);
        console.log('documentReference', referral.DocumentReference);
        //console.log("sampleDocumentReference", sampleDocumentReference);
      }
    }

    // Fetch Binaries for all DocumentReferences
    for (let referral of referralList) {
      if (referral.DocumentReference?.length > 0) {
        const binaryList = await this.fetchBinaries(referral.DocumentReference);
        if (binaryList?.length > 0) {
          referral.Binary = binaryList;
        }
      }
    }

    //referralList = referralList.filter((entry) => {
    //  return entry.Task;
    //});

    // Fetch Consents
    //if (currentProfileName === "Epic") {
    const consentList = await this.fetchConsents();
    if (consentList?.length > 0) {
      referralList.forEach((entry, index) => {
        entry.Consent = consentList;
      });
    }
    //}

    console.log('referral list', referralList);
    referralList.sort((a, b) => {
      const timeA = new Date(a.ServiceRequest.resource.authoredOn).getTime();
      const timeB = new Date(b.ServiceRequest.resource.authoredOn).getTime();
      return timeB - timeA;
    });
    return referralList;
  };

  // Fetch Communications for a Task
  fetchCommunications = async (taskId) => {
    const accessToken = await this.getAccessToken();
    const url = this.baseUrl + '/Communication?part-of=' + taskId;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken?.length > 0 ? 'bearer ' + accessToken : '',
      },
    });
    const data = await res.json();
    console.log('communications: ', data);
    return data;
  };

  // Fetch DocumentReferences for a ServiceRequest
  fetchDocumentReferences = async (referral) => {
    const accessToken = await this.getAccessToken();
    const documentList = [];
    const supportingInfo = referral?.ServiceRequest?.resource?.supportingInfo;

    if (!supportingInfo) return documentList;

    for (let entry of supportingInfo) {
      const url = this.baseUrl + '/' + entry.reference;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: accessToken?.length > 0 ? 'bearer ' + accessToken : '',
        },
      });
      const data = await res.json();
      console.log('documentReference: ', data);
      if (data?.resourceType === 'DocumentReference') documentList.push(data);
    }

    return documentList;
  };

  // Fetch Binaries for DocumentReferences
  fetchBinaries = async (documentReferenceList) => {
    const binaryList = [];

    if (!documentReferenceList) return binaryList;

    const accessToken = await this.getAccessToken();
    for (let entry of documentReferenceList) {
      const url = this.baseUrl + '/' + entry.content[0]?.attachment?.url;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/fhir+json',
          Authorization: accessToken?.length > 0 ? 'bearer ' + accessToken : '',
        },
      });
      const data = await res.json();
      if (data?.resourceType === 'Binary') {
        binaryList.push(data);
      }
    }

    return binaryList;
  };

  // Fetch Consent for a Patient
  fetchConsents = async (
    patientFhirId,
    category = this.profileName === 'Epic'
      ? 'http://loinc.org|64292-6'
      : '64292-6',
    status = 'active'
  ) => {
    const accessToken = await this.getAccessToken();
    const url = `${this.baseUrl}/Consent?patient=${patientFhirId}&category=${category}&status=${status}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken?.length > 0 ? 'bearer ' + accessToken : '',
      },
    });
    const data = await res.json();
    console.log('consent: ', data);
    return data.entry;
  };
}
