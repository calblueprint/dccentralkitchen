import RecordIds from '../constants/RecordIds';
import { getAllStores, getProductsByIds } from './airtable/request';

// Adds field 'distance' to stores
function updateStoreData(record) {
  return { ...record, distance: null };
}

// Adds field 'imageUrl' to products
function updateProductData(record) {
  return { ...record, imageUrl: record.image ? record.image[0].url : null };
}

// Gets all records in Airtable from the Stores table
// Returns a promise that resolves to an array of Store objects
export async function getStoreData() {
  const records = await getAllStores();
  // Filter out the Clerk Training store
  const stores = records
    .filter(record => record.id !== RecordIds.clerkTrainingStoreId)
    .map(updateStoreData);
  return stores;
}

// Gets all products for this store using linked records in Store table from Products table
export async function getProductData(store) {
  // Gracefully handle stores without products
  if (!('productIds' in store)) {
    return [];
  }
  const records = await getProductsByIds(store.productIds);
  const storeProducts = records.map(updateProductData);
  return storeProducts;
}

// Necessary to take into account different screen sizes
// 32px: Width of left and right margins
// 12px: Extra space for padding between items
// 130px: Size of 'See Products' button
// 48px: Size of EBTBar
export const getMaxWidth = function sync(screenWidth, ebt, seeProducts) {
  return screenWidth - 32 - 12 + (ebt ? -48 : 0) + (seeProducts ? -130 : 0);
};
