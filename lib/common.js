import Airtable from 'airtable';

// BASE is shared across our screens for Airtable API calls
/**
 * Usage:
 * import BASE from "../lib/common"
 * BASE("Products")...
 * */

// For some reason, will not register the `process.env` variables from `babel-plugin-inline-dotenv`
// unless we reference them as variables first
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const BASE = new Airtable({
  apiKey
}).base(baseId);

export default BASE;
export const IMG_KEY = process.env.IMG_API_KEY;
