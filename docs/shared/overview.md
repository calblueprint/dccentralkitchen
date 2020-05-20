---
next: '../customer/'
---

# Project Overview

## Introduction

// unfinished (need a blurb)

- [Fall 2019 Project Presentation](https://docs.google.com/presentation/d/1Q5_InElKnsrxvVdGdSQnlQo9-2z041UiefY3XZN8qhc/edit?usp=sharing)
- [Spring 2020 Project Presentation](https://docs.google.com/presentation/d/1c3pYATagMPXHsOCdEdmAfON6V6Vqg8KVUIMyGI1Baj4/edit?usp=sharing)
- [Design Prototypes](https://www.notion.so/Healthy-Corners-Design-Prototype-Instructions-36bd82a2c8614457940f49e9d1ff2042)

## Applications

- [Customer-facing application](https://github.com/calblueprint/dccentralkitchen)
  - Designed for mobile use (iOS/Android)
- [Clerk-facing application](https://github.com/calblueprint/dccentralkitchen-clerks)
  - Designed for Android tablet usage
- [Backend server](https://github.com/calblueprint/dccentralkitchen-node)
  - Runs a scheduled job to port data from Google Sheets to Airtable (production base)
  - Written in Node.js using an Express server. Deployed with Heroku to <https://healthycorners-rewards-node.herokuapp.com/.>
- [Documentation site](https://healthycorners-rewards.netlify.app/)
  - This website! See the [homepage](/) for details.
- [(Outdated) backend server](https://github.com/calblueprint/dccentralkitchen-backend)
  - CURRENTLY UNUSED. Contains outdated code to work with push notifications; if necessary, the code should be moved to the `dccentralkitchen-node` repo and refactored for updated usage.

## Navigating this site

Relevant documentation can be found in the individual subpages:

**[Customer](/customer)**

**[Clerk](/clerk)**

**[Backend](/node)**
