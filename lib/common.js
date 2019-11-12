import Airtable from 'airtable';

import getEnvVars from '../environment';

// BASE is shared across our screens for Airtable API calls
/**
 * Usage:
 * import BASE from "../lib/common"
 * BASE("Products")...
 * */

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = getEnvVars();
const BASE = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
export { BASE as default };
