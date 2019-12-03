// TODO: @Johnathan get this as well as other signup files to work.
const validation = {
  phonenumber: {
    presence: {
      message: '^Please enter an email address'
    },
    phoneNumber: {
      message: '^Please enter a valid email address'
    }
  },

  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters'
    }
  }
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
  return '';
}

// For handling errors within the form. This is strecth to handle the
// onBlur thing that I talked about.
const TextField = props => (
  <View>
    <TextInput
      style={props.style}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
    <TextInput value={props.error ? <Text>{props.error}</Text> : null} />
  </View>
);

// For future use, to match for better passwords
// TODO: @Johnathan Fix passwords check
const pattern = '((?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[W]).{6,20})';

export default validate;
