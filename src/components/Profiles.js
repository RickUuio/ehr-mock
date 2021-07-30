export const Profile_Epic = {
  name: 'Epic',

  defaultPatient: {
    firstName: 'Calvin',
    lastName: 'Ccm',
    gender: 'Male',
    dob: '01/01/1990',
    mrn: '203724',
    fhirId: 'e4ikKcC2Rp3EsZQh8Ac6C5A3',
    uuid: 'b5318891-3dc8-426a-af50-531e106ad1a1',
  },

  defaultProvider: {
    firstName: 'Case',
    lastName: 'Manager',
    fhirId: 'eaToFIkaJ32mO4K002q3BLw3',
    uuid: '94e5f7ee-1425-42bc-8833-3474b687b125',
    groupId: 'bf4aa373-81eb-4da5-9980-2d3e51c57b3c',
    networkId: '145ca925-ba86-490d-b404-35f4fe5ada66',
  },

  defaultEncounter: 'eEDcHpsgsD0Pv4Ih8HnfOxA3', //"enZf6GWN2rMGQWF1rqqDgNg3",
  defaultDocumentReference: 'e1.cnazaNgltIElLYGLL4Sg3',
  defaultBaseUrl:
    'https://apporchard.epic.com/interconnect-aocurprd-oauth/api/FHIR/R4',
  defaultNotificationUrl:
    'https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService',
  accessToken:
    'e2a4575581b3f57203e182b0b1f3dcea479baecd31bef125cc57f6dd4b8905ac',
};

export const Profile_Epic_2 = {
  name: 'Epic2',

  defaultPatient: {
    firstName: 'Beverly',
    lastName: 'Ccm',
    gender: 'Female',
    dob: '01/01/1940',
    mrn: '203722',
    fhirId: 'egHmZUd91rLItB1AqGV49Pg3',
    uuid: 'b5318891-3dc8-426a-af50-531e106ad1a1',
  },

  defaultProvider: {
    firstName: 'Case',
    lastName: 'Manager',
    fhirId: 'eaToFIkaJ32mO4K002q3BLw3',
    uuid: '94e5f7ee-1425-42bc-8833-3474b687b125',
    groupId: 'bf4aa373-81eb-4da5-9980-2d3e51c57b3c',
    networkId: '145ca925-ba86-490d-b404-35f4fe5ada66',
  },

  defaultEncounter: 'eFBT3k94CLm3fCPMNlKH2DQ3', //"enZf6GWN2rMGQWF1rqqDgNg3",
  defaultDocumentReference: 'e.-1q0eXQDEZ.9mNdXwVjYA3',
  defaultBaseUrl:
    'https://apporchard.epic.com/interconnect-aocurprd-oauth/api/FHIR/R4',
  defaultNotificationUrl:
    'https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService',
  accessToken:
    'e2a4575581b3f57203e182b0b1f3dcea479baecd31bef125cc57f6dd4b8905ac',
};

export const Profile_Logica = {
  name: 'Logica',

  defaultPatient: {
    firstName: 'Beverly',
    lastName: 'Ccm',
    gender: 'Female',
    dob: '01/01/1940',
    mrn: '203722',
    fhirId: '14730',
    uuid: 'b5318891-3dc8-426a-af50-531e106ad1a1',
  },
  defaultProvider: {
    firstName: 'Demo',
    lastName: 'Provider',
    fhirId: '14734',
    uuid: '94e5f7ee-1425-42bc-8833-3474b687b125',
    groupId: 'bf4aa373-81eb-4da5-9980-2d3e51c57b3c',
    networkId: '145ca925-ba86-490d-b404-35f4fe5ada66',
  },

  defaultEncounter: '14801',
  defaultDocumentReference: '14740',

  defaultBaseUrl: 'https://api.logicahealth.org/uufhircrn/open',

  defaultNotificationUrl:
    'https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService',
  accessToken: '',
};

export const Stage_Staging = {
  name: 'staging',
  baseUrl: 'https://fhir-crn.uniteusdev.com/v1',
  token: 'wOvYlZbrIW6THlB68QcJk6UlCwNPKYHfibNCMj03',
};

export const Stage_Training = {
  name: 'training',
  baseUrl: 'https://fhir-crn.uniteustraining.com/v1',
  token: 'qgx2q5m35Q42q83kkM5FX67S0KHyFsCf4HVb5hpI',
};

export const Stage_POC = {
  name: 'poc',
  baseUrl: 'https://fhir-crn.uniteustraining.com/rick',
  token: 'sfsdfddfdsfsdfs32342343',
};
