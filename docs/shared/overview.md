---
next: '../customer/'
---

# Project Overview

See [the homepage](/#introduction) for an introduction to the project.

## Applications

- [Customer-facing application](https://github.com/calblueprint/dccentralkitchen)
  - Designed for mobile use (iOS/Android)
- [Clerk-facing application](https://github.com/calblueprint/dccentralkitchen-clerks)
  - Designed for Android tablet usage
- [Backend server](https://github.com/calblueprint/dccentralkitchen-node)
  - Runs a scheduled job to port data from Google Sheets to Airtable (production base)
  - Written in Node.js using an Express server. Deployed with Heroku to <https://healthycorners-rewards-node.herokuapp.com/.>
- [Documentation site](https://healthycorners-rewards.netlify.app/)
  - This website! See the [homepage](/#editing-this-site) for details.
- [(Outdated) backend server](https://github.com/calblueprint/dccentralkitchen-backend)
  - CURRENTLY UNUSED. Contains outdated code to work with push notifications; if necessary, the code should be moved to the `dccentralkitchen-node` repo and refactored for updated usage.

## Known Issues

We use GitHub's built-in issue tracker to track issues we are aware of (e.g [the customer repo](https://github.com/calblueprint/dccentralkitchen/issues)). Looking at open issues may be helpful when attempting to triage or fix bugs.

Additionally, we've done our best to document our work/thought process throughout development via the PR descriptions. We also used "Squash and merge" for almost all PRs, so running `git blame` from `master` and then inspecting the source PR(s) from a particular commit may be helpful as well.

## Navigating this site

Relevant documentation, including instructions for onboarding and setting up local environments, development lifecycle, etc can be found in the individual subpages:

- **[Customer](/customer)**

- **[Clerk](/clerk)**

- **[Backend](/node)**

The **Managing & Deploying Apps** section contains documentation that is shared between two or more of our repos.

Finally, for convenience the `PROD` base, `DEV` base, and Airtable workspace are linked in the nav bar; so are all three of the active GitHub repos.
