import { env } from '../environment';

const RecordIds = {
  testCustomerId: null,
  guestCustomerId: null,
  defaultStoreId: null,
};

// Default store is 'Dollar Plus Howard'

// IDs from DEV base
if (env === 'dev') {
  RecordIds.testCustomerId = 'recimV9zs2StWB2Mj';
  RecordIds.guestCustomerId = 'recLKK7cZHboMPEB8';
  RecordIds.defaultStoreId = 'recKmetaavnMWXVrk';

  // IDs from PROD base
} else if (env === 'prod') {
  RecordIds.testCustomerId = 'recomWMtzSUQCcIvr';
  RecordIds.guestCustomerId = 'recxEGfvExP4Dv8nr';
  RecordIds.defaultStoreId = 'recwQ6SoM5pEj37xl';
}

export default RecordIds;
