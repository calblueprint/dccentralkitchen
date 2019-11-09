import Airtable from 'airtable';

import getEnvVars from '../environment';

// base is shared across our screens for Airtable API calls
/**
 * Usage:
 * import { base } from "../lib/common.js"
 * BASE("Products")...
 **/

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, IMG_API_KEY } = getEnvVars();
export const BASE = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID
);

export const IMG_KEY = IMG_API_KEY

