import validatejs from 'validate.js';

// For future use, to match for better passwords
// TODO: @Johnathan Fix passwords check
const pattern = '((?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[W]).{6,20})';

// This is to create constraints for the validatejs library
const validation = {
  name: {
    presence: {
      message: '^Name cannot be blank',
    },
  },
  phoneNumber: {
    // This verifies that it's not blank.
    presence: {
      message: '^Phone number cannot be blank',
    },
    length: {
      is: 14,
      message: '^Must be a valid phone number',
    },
  },
  code: {
    // This verifies that it's not blank.
    presence: {
      message: '^Code cannot be blank',
    },
    length: {
      is: 6,
      message: '^Code must be six digits',
    },
  },
};

// This is the validate function that utilizes validate.js
// to check a fieldname based on an inputted value.
function validate(fieldName, value) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  const values = {};
  values[fieldName] = value;

  const constraints = {};
  constraints[fieldName] = validation[fieldName];
  // The values and validated against the constraints
  // the variable result hold the error messages of the field
  const result = validatejs(values, constraints);
  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0];
  }
  // Otherwise, return null
  return null;
}

export default validate;
