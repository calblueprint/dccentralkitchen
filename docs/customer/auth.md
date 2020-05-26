# Authentication Flow

## Overview
This document runs through the user flow of the Customer Auth stack – it will touch on all the different screens and possible ways to modify them.

::: tip
Read [React Navigation 5](./navigation.md) for a detailed overview of what a stack is, and the different stacks that exists within the app.
:::

## Screens
![Authentication Flow](../assets/customer_auth/authflow.png)
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

## SignUp

## SMS Verification

## Guest mode
