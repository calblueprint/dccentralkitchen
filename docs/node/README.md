---
prev: ../clerk/
next: ./app-overview
---

# Backend Application (Node.js)

This backend application built with Express and Node integrates the Airtable and Google Sheets APIs to run a scheduled daily job to update the products delivered in the customer app.

## Server

This application is live at <https://healthycorners-rewards-node.herokuapp.com/>.

## Setup

1. Requirements

   Install `yarn` and `Node` using your favorite package manager (we recommend [Homebrew](https://brew.sh/) for macOS users). We use `yarn` instead of `npm` because that's what the other two apps use, and we want to be consistent.

2. Clone the repo and install dependencies

   - Clone this repo using `git clone`
   - Run `yarn install` in the downloaded repo. This will install all dependencies that are listed in `package.json`.

3. Add `.env`

   We use `.env` as our config file for secrets and API keys. Duplicate `.env.example`, name it `.env`, and fill in all missing fields.

   ::: tip
   Some of these are specifically for using the `airtable-schema-generator` package.
   :::

4. VS Code Setup (`ESLint` and `Prettier`)

   We develop with [Visual Studio Code](https://code.visualstudio.com/) as our editor. It has a packed marketplace of extensions that you can install; the useful ones in our case are a code linter and formatter - `eslint` (search `Extensions` for `dbaeumer.vscode-eslint`) and `prettier` (search `Extensions` for `esbenp.prettier-vscode`), respectively. These are dependent on certain `devDependencies` found in `package.json`: `eslint-plugin-react`, `eslint-config-prettier`, etc but should all be installed already via `yarn`.
   The rules for the linter and formatter are in `.eslintrc.js` and `prettier.config.js`. The configuration for VS Code is shared and enforced across developers for this project; it's found in `.vscode/settings.json`.

   ::: tip
   We noticed that because VS Code and Prettier (the extension) sometimes conflict with their formatters, formatting can be slightly inconsistent even with the `formatOnSave` option in VS Code's `settings.json`. See this for more: <https://github.com/prettier/prettier-vscode/issues/716>. Thus, we run `prettier` in a pre-commit hook using `husky` and `lint-staged`.
   :::

## Contributing

More details on how the application works in [Application Overview]('./app-overview.md')

### Google API

Authentication and usage: <https://github.com/googleapis/google-api-nodejs-client#google-apis-nodejs-client>
<https://developers.google.com/sheets/api/guides/concepts>
Tokens! (Specifically, needing to keep the refreshToken around) <https://github.com/googleapis/google-api-nodejs-client/issues/750#issuecomment-304521450>

When testing auth, to remove access, go here: <https://myaccount.google.com/permissions>

To change the Google application name: <https://console.cloud.google.com/apis/credentials/consent?pli=1>

Google Project console (only viewable to authorized users for the project): <https://console.cloud.google.com/apis/credentials/consent?project=quickstart-1587887313757>

Add a user to the project: <https://console.cloud.google.com/iam-admin/iam?authuser=1&orgonly=true&project=quickstart-1587887313757&supportedpurview=organizationId>

### Working with Dates

The easiest thing to do is use [moment.js](https://momentjs.com/docs/). Don't waste time (^:

### Heroku

You must have been added to the Heroku project as a collaborator.

Follow [the instructions here](https://devcenter.heroku.com/articles/collab#deploy-the-app) to get set up as a collaborator.

#### Deploying

Then, to push new changes and deploy, you just need to run

```bash
git push heroku master
```

::: danger
Be sure to push your changes to the canonical repository (typically with `git push origin master`) as well as to the Heroku remote.
:::

#### Heroku Scheduler

Scheduler is a free add-on for running jobs on your app at scheduled time intervals, much like cron in a traditional server environment.

::: rightlink
From [Heroku Documentation](https://devcenter.heroku.com/articles/scheduler)
:::

It's perfect for our particular use case, and is why we deployed with Heroku (recall that this documentation site is hosted on and auto-deploys with Netlify).

## References

- <https://devcenter.heroku.com/articles/deploying-nodejs>
- <https://devcenter.heroku.com/articles/config-vars>
- <https://erickar.be/blog/running-a-cron-job-with-node-js-and-heroku>
- <http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial>
