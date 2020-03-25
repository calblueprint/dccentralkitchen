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
  const stores = records.map(updateStoreData);
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
