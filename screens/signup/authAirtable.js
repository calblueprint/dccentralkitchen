import BASE from '../../lib/common';

// Takes in Expo-generated token (a string)
// and creates a new record in the Push Tokens table
export const createPushToken = function async(token) {
  return BASE('Push Tokens').create([
    {
      fields: {
        Token: token
      }
    }
  ]);
};

// Creates a customer record in Airtable
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

// Used in SignUpScreen. Checks if phone number is already in use.
export const checkForDuplicateCustomer = function async(phoneNumber) {
  return new Promise((resolve, reject) => {
    BASE('Customers')
      .select({
        maxRecords: 1,
        filterByFormula: `SEARCH("${phoneNumber}", {Phone Number})`
      })
      .firstPage()
      .then(records => {
        if (records.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

// lookupCustomer searches for users based on their phone numbers
// in the form (XXX) XXX-XXXX and checks against a correct password
// If the user is found, we return a subset of fields in Airtable
// Otherwise, we return null & display an error on the login screen.
export const lookupCustomer = function async(phoneNumber, password) {
  return new Promise((resolve, reject) => {
    let customerInfo = {
      custId: null,
      pushTokens: null,
      tokenNames: null
    };

    BASE('Customers')
      .select({
        maxRecords: 1,
        filterByFormula: `AND({Phone Number} = '${phoneNumber}', {Password} = '${password}')`
      })
      .firstPage()
      .then(records => {
        if (records.length !== 0) {
          records.forEach(function id(record) {
            customerInfo.custId = record.getId();
            customerInfo.pushTokens = record.fields['Push Tokens'];
            customerInfo.tokenNames = record.fields.token_names;
          });
        } else {
          customerInfo = null;
        }
        // If no records exist, resolves with null object
        resolve(customerInfo);
      })
      .catch(err => reject(err));
  });
};

// updateCustomerPushTokens is called after lookupCustomer; and only if lookupCustomer returns non-null.
export const updateCustomerPushTokens = function async(
  customerInfo,
  currentToken
) {
  // currentToken is the value generated by Expo; a string
  return new Promise((resolve, reject) => {
    const { custId, tokenNames } = customerInfo;
    let { pushTokens } = customerInfo;
    // Loop through and check if currentToken is new
    let isNew = true;
    let i;

    // In a rare case (or in development), may not have registered a pushToken initially
    if (tokenNames) {
      for (i = 0; i < tokenNames.length; i++) {
        if (tokenNames[i] === currentToken) {
          isNew = false;
          break;
        }
      }
    }
    if (isNew) {
      // If it is new, create a new push token & add to pushTokens (local var)
      createPushToken(currentToken)
        .then(tokenRecords => {
          if (tokenRecords) {
            let tokenId = null;
            // Get tokenId
            tokenRecords.forEach(function process(record) {
              tokenId = record.getId();
            });
            // In a rare case (or in development), may not have registered a pushToken initially
            if (pushTokens) {
              // Append new tokenId to the list, then propagate value to next function
              pushTokens.push(tokenId);
            } else {
              pushTokens = [tokenId];
            }
            return pushTokens;
          }
          console.log('Error creating token');
          return null;
        })
        .catch(err => reject(err))
        .then(updatedPushTokens => {
          if (updatedPushTokens) {
            // Update this customer's pushTokens array
            BASE('Customers')
              .update([
                {
                  id: custId,
                  fields: {
                    'Push Tokens': updatedPushTokens
                  }
                }
              ])
              .then(records => {
                // If update is successful, resolve with customer ID
                records.forEach(record => resolve(record.getId()));
              })
              .catch(err => reject(err));
          }
          // Otherwise, error creating token; do nothing
          // Return null for semantics, resolve is what passes value back from the promise
          return null;
        })
        .catch(err => reject(err));
    }
  });
};
