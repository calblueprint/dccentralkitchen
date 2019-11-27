import BASE from '../../lib/common';

function createStoreData(record) {
  const data = record.fields;
  return {
    name: data['Store Name'],
    id: data.id,
    latitude: data.Latitude,
    longitude: data.Longitude,
    hours: data['Store Hours'],
    address: data.Address,
    products: data.Products
  };
}

// Gets all records in Airtable from the Stores table
// Returns a promise that resolves to an array of Store objects
export const getStoreData = function async() {
  return new Promise((resolve, reject) => {
    BASE('Stores')
      .select()
      .all()
      .then(records => {
        const stores = records.map(record => createStoreData(record));
        resolve(stores);
      })
      .catch(err => reject(err));
  });
};
