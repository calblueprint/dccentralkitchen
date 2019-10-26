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
  }
  
  export default { validation }