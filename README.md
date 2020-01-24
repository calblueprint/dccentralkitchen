# DC Central Kitchen

Updated Jan. 22, 2020 | _in-progress_

A mobile application created with React Native, Expo, and Airtable as a backend. Developed by UC Berkeley @calblueprint's team for DC Central Kitchen's Healthy Corners initiative during the 2019-2020 school year.

This README is meant to be a guide for contributors to this project.

## Table of Contents

- [DC Central Kitchen](#dc-central-kitchen)
  - [Table of Contents](#table-of-contents)
  - [Companion projects](#companion-projects)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Setup](#setup)
    - [Contributing](#contributing)
  - [Features](#features)
  - [References](#references)

## Companion projects

This repo contains code for the customer-facing application and contains the majority of functionality for our project.

It indirectly interfaces with applications found in two other repos:
Clerk-facing application, designed for tablet use: https://github.com/calblueprint/dccentralkitchen-clerks
Express server, utilized only for push notifications: https://github.com/calblueprint/dccentralkitchen-backend

## Introduction

Fall 2019 Project Presentation: https://docs.google.com/presentation/d/1Q5_InElKnsrxvVdGdSQnlQo9-2z041UiefY3XZN8qhc/edit?usp=sharing

Design Prototypes: https://www.notion.so/Healthy-Corners-Design-Prototype-Instructions-36bd82a2c8614457940f49e9d1ff2042

## Getting Started

You'll need access to our Airtable base, linked here: [TODO edit for handoff]
Please request access from a member of the Healthy Corners team. [TODO edit for handoff]

### Setup

1. Requirements
   Install `yarn` and `Node`.
   Install Expo (which is used for development)
   Expo is \_\_\_\_ [TODO quick blurb on why we used Expo]

   - Install `expo-cli` via Expo's website [TODO link]
   - Install Expo's mobile app on mobile device(s) that you will use to test when developing.
   - If developing on a MacBook, it'd be optimal to install Xcode so that you can run the application on an iOS simulator. [TODO Windows instructions]

2. Clone the repo and install dependencies
   Clone this repo in your favorite folder using your favorite method.
   We use `yarn` instead of `npm` because that's what Expo uses under the hood to manage its dependencies.
   - Run `yarn install`
     This will install all dependencies that are listed in `package.json`.
3. Add `environment.js`
   We use `environment.js` as our config file for secrets and API keys. [TODO add .env.example to repo]
   Constants and functions in this file are never called directly [TODO this currently isn't true for IMG_API_KEY]; instead, `common.js` uses them to create a `BASE` constant that we use for all Airtable API calls.
4. Configure `eslint` and `prettier` for VSCode
   We develop with VS Code as our IDE [TODO link to vscode]. It has very handy extensions that you can add as packages; the useful ones in our case are for a linter and formatter - `eslint` and `prettier`, respectively.
   We've configured the project with rules already using `.eslintrc.js` and `prettier.config.js`. See this guide for more, or if you get blocked in the next step. [TODO link to documentation on ESLint setup from Notion]
   If all went well when you ran `yarn install`, you should just need to run `eslint --init` and follow the prompts. If it generates a new `.eslintrc.js` file for you, simply copy over the contents of [TODO link to file in repo].

### Contributing

One of the amazing developers in Blueprint created this package [TODO link to airtable generator] that generates helper functions for working with the Airtable API. Take a look at the README for details of how it works. In our code, we only ever call functions in 'requests.js'; see `utilities/` for example usage. [TODO well make that folder LOL]

## Features

## References

https://github.com/Airtable/airtable.js/blob/master/CHANGELOG.md
