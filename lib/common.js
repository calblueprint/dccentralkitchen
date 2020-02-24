import Airtable from 'airtable';

// BASE is shared across our screens for Airtable API calls
/**
 * Usage:
 * import BASE from "../lib/common"
 * BASE("Products")...
 * */
const BASE = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

export default BASE;
export const IMG_KEY = process.env.IMG_API_KEY;
