import { env } from '../environment';

const RecordIds = {
  testCustomerId: null,
  guestCustomerId: null,
  defaultStoreId: null,
};

// Default store is 'Stanton Supermarket'

// IDs from DEV base
if (env === 'dev') {
  RecordIds.testCustomerId = 'recimV9zs2StWB2Mj';
  RecordIds.guestCustomerId = 'recLKK7cZHboMPEB8';
  RecordIds.defaultStoreId = 'rec6C14onap95XOK8';
  RecordIds.surveyStoreId = 'recfB0SrHB8b6a3Bb';

  // IDs from PROD base
} else if (env === 'prod') {
  RecordIds.testCustomerId = 'recomWMtzSUQCcIvr';
  RecordIds.guestCustomerId = 'recHSoc8R94UYNIR5';
  RecordIds.defaultStoreId = 'recwQ6SoM5pEj37xl';
  RecordIds.surveyStoreId = 'recQa6jv9KGqobDAZ';
}

export default RecordIds;
