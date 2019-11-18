import BASE from '../../lib/common';

export const createPushToken = function async(token) {
  return BASE('Push Tokens').create([
    {
      fields: {
        Token: token
      }
    }
  ]);
};

export const createCustomer = function async(
  fName,
  lName,
  phoneNumber,
  password,
  tokenId
) {
  return BASE('Customers').create([
    {
      fields: {
        'First Name': fName,
        'Last Name': lName,
        'Phone Number': phoneNumber,
        Password: password,
        Points: 0,
        'Push Tokens': [tokenId]
      }
    }
  ]);
};

export const checkForDuplicateCustomer = function async(phoneNumber) {
  return new Promise((resolve, reject) => {
    const duplicate = false;
    BASE('Customers')
      .select({
        maxRecords: 1,
        filterByFormula: `SEARCH("${phoneNumber}", {Phone Number})`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (records.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
          fetchNextPage();
        },
        err => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(duplicate);
          }
        }
      );
  });
};

// lookupCustomer searches for users based on their
// phone numbers in the form (XXX) XXX-XXXX and checks against
// a correct password. If the user is found, we return their first
// and last name. Otherwise, we will display an error on the login screen.
export const lookupCustomer = function async(phoneNumber, password) {
  return new Promise((resolve, reject) => {
    const customerInfo = {
      custId: null,
      pushTokens: null
    };

    BASE('Customers')
      .select({
        maxRecords: 1,
        filterByFormula: `AND({Phone Number} = '${phoneNumber}', {Password} = '${password}')`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (records.length === 0) {
            reject(
              new Error('Incorrect phone number or password. Please try again.')
            );
          } else {
            records.forEach(function id(record) {
              customerInfo.custId = record.getId();
              customerInfo.pushTokens = record['Push Tokens'];
            });

            resolve(customerInfo);
          }
          fetchNextPage();
        },

        // TODO @anniero98 not sure if this function 'done' is even necessary
        function done(err) {
          if (err) {
            reject(err);
          }
        }
      );
  });
};

export const updateCustomerPushTokens = function async(
  customerInfo,
  currentToken
) {
  return new Promise((resolve, reject) => {
    // Loop through and check if pushToken is new
    // If it is new, add to pushTokens
    const { customerId, pushTokens } = customerInfo;
    let isNew = true;
    let i;
    for (i = 0; i < pushTokens.length; i++) {
      if (pushTokens[i] === currentToken) {
        isNew = false;
        break;
      }
    }
    // Update this customer's pushTokens array
    if (isNew) {
      pushTokens.push(currentToken);
    }

    BASE('Customers').update([
      {
        id: customerId,
        fields: {
          'Push Tokens': pushTokens
        }
      }
    ]),
      function (err, records) {
        if (err) {
          reject(err);
          return;
        }
        records.forEach(function (record) {
          resolve(record.getId());
        });
      };
  });
};
