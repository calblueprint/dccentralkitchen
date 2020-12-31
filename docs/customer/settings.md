# Settings

## Overview
<img src="../assets/settings/settings_1.png" width="40%">
<img src="../assets/settings/settings_2.png" width="40%">

`AppNavigator.js` and`SettingsStack.js` have been modified/created to accommodate a new button in the drawer and new settings screens.

`SettingsScreen.js` contains 3 buttons, **Change Name**, **Change Number** and **Log Out**, and a tribute to Blueprint unless you are signed in as Guest, in which Change Name and Change Number become **Create Account**.

## Change Name
**Change Name** navigates to `NameChangeScreen.js`, which uses `AuthTextField` to validate the name and then updates Airtable.

## Change Phone Number
**Change Number** navigates to `PhoneNumberChangeScreen.js`, prompting the user to enter a new phone number. The user has to verify their phone number to change the phone number in Airtable. The logic here is very similar to the auth process.

For more information on phone number authentication, see the docs on [Customer Auth: SMS Verification](auth.html#sms-verification).

## Additional Options
- **Create Account** logs the guest out to sign up for an account
- Notifications, Privacy, and Location settings also found on this screen

## Adding to Settings
To add buttons/categories to the settings screen:
  - Add a button using `SettingsCard.js`
  - Add a category using `CategoryCard.js`

## Helpful links & PRs
- [Customer #177: Auth redesign and refactor](https://github.com/calblueprint/dccentralkitchen/pull/177)
- [Customer #148: Settings (Change Name/Number/Password)](https://github.com/calblueprint/dccentralkitchen/pull/148)
