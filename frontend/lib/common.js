import Airtable from "airtable";

import getEnvVars from "../environment";

// base is shared across our screens for Airtable API calls
/** 
 * Usage: 
 * import { BASE } from "../lib/common.js"
 * base("Products")...
 **/ 
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = getEnvVars();
export const BASE = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);