# Customer Application

A mobile application created with React Native, Expo, and Airtable as a backend / database.

This repo contains code for the customer-facing application and contains the majority of functionality for our project. This README is meant to be a guide for contributors to this project.

## Getting Started

You'll need access to our Airtable workspace in order to access the bases. Please request access from a member of the Healthy Corners team.

### Setup

1. Requirements

   Install `yarn` and `Node`. We use `yarn` instead of `npm` because that's what Expo uses under the hood to manage its dependencies.

   Install Expo (which is used for development).

   - Install `expo-cli` via [Expo's website](https://docs.expo.io/versions/latest/get-started/installation/)
   - Install Expo's mobile app on the mobile device(s) that you will use to test when developing.
   - If developing on a MacBook, install Xcode if you don't already have it so that you can run the application on an iOS simulator.
   - If you have space on your laptop, first install [Android Studio](https://developer.android.com/studio) as well and install the emulator ([detailed instructions here](https://developer.android.com/studio/run/emulator)).

2. Clone the repo and install dependencies

   - Clone this repo using `git clone`
   - Run `yarn install` in the downloaded repo. This will install all dependencies that are listed in `package.json`.

3. Add `environment.js`

   We use `environment.js` as our config file for secrets and API keys. Duplicate `environment.example`, name it `environment.js`, and fill in your Airtable API key.

4. Configure `eslint` and `prettier` for VSCode

   We develop with [VSCode](https://code.visualstudio.com/) as our editor. It has very handy extensions that you can add as packages; the useful ones in our case are for a code linter and formatter - `eslint` and `prettier`, respectively.
   We've pre-configured the project with linting rules using `.eslintrc.js` and `prettier.config.js`. See [this guide](https://www.notion.so/ESLint-Prettier-in-VSCode-23198173239d41c69cb02748a1cd2f08) for more, or if you get blocked in the next step.
   If all went well when you ran `yarn install`, you should just need to run `eslint --init` and follow the prompts.

   The configuration files are already in `master`: `.eslintrc.js` and `.prettierrc`. If `eslint --init` generates a new `.eslintrc.js` file for you, simply copy over the contents of `.eslintrc.js` from `master`.

### Contributing

One of the amazing developers in Blueprint created the [`airtable-schema-generator` package](https://github.com/aivantg/airtable-schema-generator) that generates helper functions for working with the Airtable API. Take a look at its README for details of how it works. In our code, we only ever call functions in `request.js`; see `lib/<feature>Utils.js` for example usage.

## References

<https://github.com/Airtable/airtable.js/blob/master/CHANGELOG.md>

## App Store

- iOS App Store: <https://apps.apple.com/us/app/healthy-corners-rewards/id1503424404?ls=1>
- Google Play Store: <https://play.google.com/store/apps/details?id=org.calblueprint.HealthyCornersRewards>
