import Airtable from 'airtable';

import getEnvVars from '../environment';

// BASE is shared across our screens for Airtable API calls
/**
 * Usage:
 * import BASE from "../lib/common"
 * BASE("Products")...
 * */

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, IMG_API_KEY } = getEnvVars();
export default BASE = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID
);
export const IMG_KEY = IMG_API_KEY;
