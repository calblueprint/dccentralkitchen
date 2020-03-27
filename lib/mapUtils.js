import BASE from './common';

function createStoreData(record) {
  const data = record.fields;
  return {
    name: data['Store Name'],
    id: data.id,
    latitude: data.Latitude,
    longitude: data.Longitude,
    hours: data['Store Hours'],
    address: data.Address,
    products: data.Products,
    // distance set and used to sort in MapScreen._orderStoresByDistance
    distance: null,
    ebt: data['SNAP or EBT Accepted'],
    rewards: data['Rewards Accepted'],
  };
}

function createProductData(record) {
  const data = record.fields;
  return {
    name: data.Name,
    id: data.id,
    category: data.Category,
    points: data.Points,
    customerCost: data['Customer Cost'],
    image: data.Image ? data.Image[0].url : null,
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
        const stores = records
          // Filter out the Clerk Training store
          .filter(record => record.id !== 'recq6630DixVw63un')
          .map(record => createStoreData(record));
        resolve(stores);
      })
      .catch(err => reject(err));
  });
};

// Gets all products for this store using linked records in Store table from Products table
// Returns a promise that resolves to an array of Products objects,
// or null if no products exist for this store
export const getProductData = function async(store) {
  // Gracefully handle empty products list in current store
  return new Promise((resolve, reject) => {
    const currProducts = store.products;
    if (currProducts) {
      const productRecords = currProducts.map(id => BASE('Products').find(id));

      Promise.all(productRecords)
        .then(records => {
          const products = records.map(record => createProductData(record));
          resolve(products);
        })
        .catch(err => reject(err));
    } else {
      // If no products, resolve with empty array
      resolve([]);
    }
  });
};
