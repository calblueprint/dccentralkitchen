# Authentication
This guide covers the main components of the customer authentication flow, including Onboarding, Login, Signup, SMS Verification, and Guest mode.
[[toc]]

## Auth Screens
This section runs through the user flow of the Customer Auth stack, and will touch on all the different screens and possible ways to modify them.

::: tip
Read the guide on [React Navigation 5](./navigation.md) for a detailed overview of what a stack is, and the different stacks that exists within the app.
:::

::: tip NOTE
As of August 2020 in [PR #177]((https://github.com/calblueprint/dccentralkitchen/pull/177)), we removed passwords from the auth process and instead rely on SMS verification. This change improves account security and significantly simplifies the authentication flow.
::: 


The current screens that exists in the Customer Auth stack are:
- `OnboardingScreen`: starting welcome screen
- `PhoneNumberScreen`: for new and returning users to enter their phone number
- `CompleteSignUpScreen`: for new users to enter their name to complete the signup process
- `PermissionsScreen`: for new users to ask about location access + notification permissions
- `StoreSelectScreen`: for new users to select stores to 'favorite' in the onboarding flow
  
Additionally, `VerificationScreen` is used as a modal in the flow where customers enter their SMS verification codes. This is included in the main `AppStack` in `AppNavigator.js` instead, since it is reused in `PhoneNumberChangeScreen` from Settings.

### `OnboardingScreen`

This is the first screen the user sees once the app loads. It shows a carousel of important information summarizing what the application does.

- There are two buttons that bring the user to different pages:
    - **Get Started** – brings the user to the `PhoneNumberScreen`, which supports customers with and without accounts.
    - **Continue as guest** – brings the user into the app without an account using [Guest Mode](#guest-mode).

To modify the onboarding content, navigate to the file `constants/Onboarding.js`, which contains all the content (text and illustration) of the different screens

### `PhoneNumberScreen`

This screen handles both login and signup functionality. 

Since passwords were removed [(see PR #177)](https://github.com/calblueprint/dccentralkitchen/pull/177), authentication relies on SMS phone authentication. Both new and returning users first need to verify their phone numbers.

- If a customer record exists in Airtable with a matching phone number, the customer is successfully authenticated and taken into the app.
- If a matching customer record does **not exist** in Airtable, the user is taken through the sign up flow:
  1. Set a name in the `CompleteSignUpScreen` which creates a new customer record in Airtable
  2. Set location preferences, select favorite stores, and set notification preferences through `PermissionsScreen`.
  3. Finally, enter the app.

### `CompleteSignUpScreen`

This screen prompts new users to enter a name for their account. This completing this step officially adds a new customer record to the Airtable base using the phone number and name, and proceeds to the Permissions step.
   
### `PermissionsScreen`

This screen handles asking new users about their location and notification preferences. Since the flow uses two steps, there is a `step` variable that uses conditional rendering to display relevant information for the different prompts. It passes an `updateStep` callback to additional screens like `StoreSelectScreen` to update the rendered content as steps are completed.

   
### `StoreSelectScreen`

This screen has a lot of overlapping functionality with [Map Screen](../../screens/map/MapScreen.js), as it also requests the user's location and loads the list of stores. Customers can then select stores to 'favorite', which will let them receive alerts when these stores receive product deliveries.

## Adding a new screen

- Create a new screen file in the `screens/auth` folder
- Add the screen to the `navigation/stack_navigators/AuthStack.js` file

## SMS Verification

Phone authentication is handled using Google Firebase through Expo, and imported as `expo-firebase-recaptcha`.

It is used on `PhoneNumberScreen` and `PhoneNumberChangeScreen`. Verification codes are entered in `VerificationScreen`.
  
### Firebase setup
#### Configuration and Usage

Firebase is already configured in the app from `firebase.js` and initialized in `SignUpScreen.js.` The Firebase project is titled **Healthy Corners Prod**, and the Project ID is `quickstart-158********57`.

To make edits to the configuration (in the case of changing API keys, database urls, and etc.), changing them in `firebase.js` should be sufficient. If you initialize firebase from elsewhere in the app, be sure to delete `firebase.initializeApp(firebaseConfig);` from `SignUpScreen.js`.

We currently use it purely for phone number authentication and Google Analytics. If you do choose to add other methods of verification, see below to make the correct edits to the console, and follow provided guides on how to implement those.

To configure other methods of authentication, or change any vital settings, please consult the [Firebase console](https://console.firebase.google.com/) and relevant guides provided by Google.

## Guest mode
Guest Mode allows users to access non-rewards features of the app without the need for an account.

Guest Mode relies on a dummy account on Airtable with the phone number `##########` so that no one can intentionally log in as a guest.

::: warning
This Guest record must not be deleted from the Customers table or the record ID will not match.
:::

Throughout the app, the guest id is stored as a constant and used to check if the user is currently signed in as a guest. If so, the entirety of the rewards features are turned to pointers to create an account, but the user still retains access to [resources](resources.md), [settings](settings.md), and the ability to search and filter stores.


## Helpful links

#### Relevant PRs
- [Customer #177: Auth redesign and refactor](https://github.com/calblueprint/dccentralkitchen/pull/177)
- [Customer PR #74: Guest Mode](https://github.com/calblueprint/dccentralkitchen/pull/74)
- [Customer #97: Phone Number Authentication + Forgot Password Functionality (NOTE: mostly outdated)](https://github.com/calblueprint/dccentralkitchen/pull/97)

#### Additional resources
- <https://expo.canny.io/feature-requests/p/phone-number-auth-with-firebase>