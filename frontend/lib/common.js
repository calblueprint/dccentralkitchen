import Airtable from 'airtable';

import getEnvVars from '../environment';

// base is shared across our screens for Airtable API calls
/**
 * Usage:
 * import { base } from "../lib/common.js"
 * base("Products")...
<<<<<<< HEAD
 **/ 
=======
 **/
>>>>>>> bcd53c9e2abe2d76eaee4ffb6a2d62c04bb2d788

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = getEnvVars();
export const BASE = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID
);
