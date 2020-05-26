# Clerk Authentication
This guide covers the three steps to get to the checkout screen:
1. [Store lookup](#step-1-store-lookup): "Enter store name"
2. [Clerk login](#step-2-clerk-login): "Enter your employee PIN"
3. [Customer lookup](#customer-lookup): "Enter customer phone number"

## Clerk Login
**Relevant Files**

`StoreLookupScreen.js`

`ClerkLoginScreen.js`

### Step 1: Store Lookup

#### State

- `stores`: All stores in the database
- `store`: The selected store from the dropdown menu
- `textFieldBlur`: Indicating that a store has been selected, so the user can go to the next page
- `searchStr`: Text string entered to search for a store

#### Overview

In `componentDidMount`, all stores are loaded into the state. The dropdown menu is a `ScrollView` component containing filtered stores based on the `searchStr` provided by the user. The "Next" button is disabled until the user selects a store from the dropdown (via `textFieldBlur`).

#### Relevant Methods

`_devBypass`: Sets pre-defined clerk and customer information into `AsyncStorage`, skipping all login steps and navigating to the checkout screen, *for testing purposes*

`_devConfirmBypass`: Skips all login and checkout steps to the confirmation page with a pre-defined transaction

`onSearchElementPress`: Sets the selected store in state and displays the store name in the search bar

`handleNavigate`: Sets `trainingMode`, if applicable, and navigates to the next screen — `ClerkLogin`

### Step 2: Clerk Login

#### State

- `password`: The clerk's store pin
- `errorMsg`: Displays an error message on screen if there are problems logging in
- `errorShown`: Boolean indicating whether an error message should be displayed

#### Overview

The clerk uses the `TextField` component to enter a clerk pin. This component is currently configured to only accept four numerical values:

```jsx
<TextField
  autoFocus
  clearButtonMode="always"
  style={{ marginTop: 32 }}
  error={this.state.errorShown}
  selectionColor={Colors.primaryGreen}
  placeholder="ex. 1234"
  keyboardType="number-pad"
  maxLength={4}
  onChangeText={(text) => this.setState({ password: text, errorShown: false })}
  value={this.state.password}
/>
```

#### Relevant Methods

`handleSubmit`: Performs a clerk lookup using `lookupClerk`. `lookupResult` comes with a `status`, `record`, and `errorMsg`.

If a clerk record is found corresponding to the given store name and clerk pin, the clerk and store information is stored in `AsyncStorage` via `_asyncLoginClerk`. The app then navigates to the `CustomerLoginScreen`.

If no clerk record is found, the `lookupResult.errorMsg` is displayed.

## Customer Lookup
**Relevant Files**

`CustomerLookupScreen.js`

### State

`clerkName`: The clerk name is displayed on the screen following a successful clerk login (see: [Clerk Login](https://www.notion.so/Clerk-Login-5b8a2bc5244b407a86a756ee8a382380))

`phoneNumber`: The customer's phone number, entered by the clerk

`errorMsg`: An error message to display on the screen given that there was a problem retrieving the customer, if applicable

`errorShown`: Boolean indicating whether `errorMsg` should be shown

### Overview

The clerk enters a ten-digit phone number into the `TextField` component. 

```jsx
//Source: CustomerLookupScreen.js
<TextField
    clearButtonMode="always"
    selectionColor={Colors.primaryGreen}
    style={{ marginTop: 32 }}
    error={this.state.errorShown}
    placeholder="ex. 1234567890"
    keyboardType="number-pad"
    maxLength={10}
    onChangeText={(text) => this.setState({ phoneNumber: text, errorShown: false })}
    value={this.state.phoneNumber}
/>
```

Once there are ten digits inputted, as checked by the const `customerPermission`, the "Next" button becomes clickable, allowing you to call `handleSubmit`.

An error message is displayed if the customer is not found in the database. Otherwise, we proceed to the checkout screen.

### Relevant Methods

#### `componentDidMount`

`_reset`: The logged in clerk's name and an empty string phone number are set in the state. If this is training mode, a pre-defined clerk name and phone number are provided to the state.

#### `_asyncCustomerFound`

Stores the customer ID in `AsyncStorage` and logs successful lookup in Analytics. Navigates to the checkout screen.

#### `_formatPhoneNumber`

Takes a ten-digit phone number string and reformats it into the format (xxx) xxx-xxxx. This is used for consistent phone number lookup in the Customers table because numbers are stored in this format.

#### `handleSubmit`

Formats the phone number and performs a customer lookup using `lookupCustomer`. The result, `lookupResult`, comes with attributes `status`, `record`, and `errorMsg`. If the customer is not found, the appropriate error message is displayed on the screen. Otherwise, the customer record is stored using `_asyncCustomerFound`.