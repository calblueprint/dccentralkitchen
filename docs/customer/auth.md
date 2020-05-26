# Authentication Flow

## Overview
This document runs through the user flow of the Customer Auth stack – it will touch on all the different screens and possible ways to modify them.

::: tip
Read [React Navigation 5](./navigation.md) for a detailed overview of what a stack is, and the different stacks that exists within the app.
:::

## Screens
![Authentication Flow](../assets/navigation/authflow.png)
Flow Diagram Taken from [React Navigation 5 Documentation](./navigation.md)

The current screens that exists in the Customer Auth stack are:
- `OnboardingScreen`
- `WelcomeScreen`
- `SignUpScreen`
- `LogInScreen`
- `PasswordResetScreen`

### `OnboardingScreen`

![onboarding](../assets/customer_auth/onboarding.png)
- A screen that shows a carousel of important information summarizing what the application does
- There are two buttons brings the user to different pages
    - **Log In** – brings the user to the `LogInScreen`. For users who already have an account to immediately log in.
    - **Get Started** – brings the user to the `WelcomeScreen`, which is further described below.

#### Modifying the onboarding content

- Navigate to the file `constants/Onboarding.js`, which contains all the content (text and illustration) of the different screens

### `WelcomeScreen`
![welcomescreen](../assets/customer_auth/welcome.png)

- Screen that shows three available buttons
    - Log In – brings the user to the `LogInScreen`.
    - Sign Up – brings the user to the `SignUpScreen`.
    - **Continue without an account** – allows user to immediately use the App as a Guest.
### `SignUpScreen`

![signupscreen](../assets/customer_auth/signup.png)

- Screen for user to input their information to sign up for an account.

### `LogInScreen`

![login](../assets/customer_auth/login.png)

- Screen to allow existing users to log in.
- For users who forgot their password, there is a **Forgot password?** button that brings the user to the `PasswordResetScreen`

### `PasswordResetScreen`

- Screen that brings the user through the flow of resetting the password

## Adding a new screen

- Create a new screen file in the `screens/auth` folder
- Add the screen to the `navigation/stack_navigators/AuthStack.js` file

## SMS Verification

Phone authentication is handled using Google Firebase through Expo, and imported as `expo-firebase-recaptcha`.

It is used on: 
- `SignUpScreen`
- `LogInScreen`
- `VerificationScreen`
- `PasswordResetScreen`

### Workflow
#### Signing Up
Clicking Create Account triggers the reCaptcha modal (provided by imports) to pop up. Upon successful anti-robot verification, setModalVisible is called to pull up `VerificationScreen`. This prompts the user to enter the verification code. On successful entry, the modal calls functions that have been passed in to complete account creation.

#### Forgot Password
Pressing forgot password prompts the user to enter their phone number, which if successful, triggers the reCaptcha modal (provided by imports) to pop up. Upon successful anti-robot verification, setModalVisible is called to pull up `VerificationScreen`. This prompts the user to enter the verification code. On successful entry, the modal calls functions that have been passed in to allow new passwords to be created.

#### Relevant PRs
- [Customer #97: Phone Number Authentication + Forgot Password Functionality](https://github.com/calblueprint/dccentralkitchen/pull/97)
#### Helpful links
- <https://expo.canny.io/feature-requests/p/phone-number-auth-with-firebase>
  
<img src="../assets/customer_auth/forgotpass.png" width="30%">
<img src="../assets/customer_auth/verifyphone.png" width="30%">
<img src="../assets/customer_auth/newpass.png" width="30%">

## Guest mode
- [Customer #74: Guest Mode](https://github.com/calblueprint/dccentralkitchen/pull/74)