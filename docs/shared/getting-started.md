<!-- Embedded with the <Content/> Vue component into Customer/Clerk sections -->

::: warning NOTE
This documentation is the same for both the customer and clerk applications.
:::
[[toc]]

You'll need access to our Airtable workspace in order to access the bases. Please request access from a member of the Healthy Corners team.

## Setup

1. Requirements

   Install `yarn` and `Node` using your favorite package manager (we recommend [Homebrew](https://brew.sh/) for macOS users). We use `yarn` instead of `npm` because that's what Expo uses under the hood to manage its dependencies.

   Install Expo. You can learn more about it on [Expo's website](https://docs.expo.io/guides/) - we develop under the **managed workflow**.

   - Install `expo-cli`.

   ```bash
   yarn global add expo-cli
   ```

   - Install Expo's mobile app on the mobile device(s) that you will use to test when developing.
   - If developing on a MacBook, install Xcode if you don't already have it so that you can run the application on an iOS simulator.
   - If you have space on your laptop, first install [Android Studio](https://developer.android.com/studio) as well and install the emulator ([detailed instructions here](https://developer.android.com/studio/run/emulator)).

2. Clone the repo and install dependencies

   - Clone this repo using `git clone`

   ```bash
   git clone https://github.com/calblueprint/dccentralkitchen.git
   ```

   - Run `yarn install` in the downloaded repo. This will install all dependencies that are listed in `package.json`.

   ```bash
   yarn install
   ```

3. Add environment files

   - We use `environment.js` as our config file for secrets and API keys. Duplicate `environment.example`, name it `environment.js`, and fill in your Airtable API key.
   - We use `.env.generator` as the config file for the `airtable-schema-generator` package. See the [Airtable section](#working-with-airtable) for more. Duplicate `.env.generator.example`, name it `.env.generator`, and fill in the missing variables.

   ::: danger
   As with most secrets, please do not **ever** commit API keys! You will need to reset your key(s) if that ever happens, since the security of the application is compromised.
   :::

4. VS Code Setup (`ESLint` and `Prettier`)

   We develop with [Visual Studio Code](https://code.visualstudio.com/) as our editor. It has a packed marketplace of extensions that you can install; the useful ones in our case are a code linter and formatter - `eslint` (search `Extensions` for `dbaeumer.vscode-eslint`) and `prettier` (search `Extensions` for `esbenp.prettier-vscode`), respectively.

   These are dependent on certain `devDependencies` found in `package.json`: `eslint-plugin-react`, `eslint-config-prettier`, etc but should all be installed already via `yarn`.
   The rules for the linter and formatter are in `.eslintrc.js` and `prettier.config.js`. The configuration for VS Code is shared and enforced across developers for this project; it's found in `.vscode/settings.json`.

   ::: warning NOTE
   We noticed that because VS Code and Prettier (the extension) sometimes conflict with their formatters, formatting can be slightly inconsistent even with the `formatOnSave` option in VS Code's `settings.json`. See this for more: <https://github.com/prettier/prettier-vscode/issues/716>. Thus, we run `prettier` in a [pre-commit hook](#git-hooks-packagejson-scripts).
   :::

## Contributing

### Development Lifecycle

These code quality and lifecycle improvements were originally added to the customer repo in [PR #23](https://github.com/calblueprint/dccentralkitchen/pull/23), and to the clerk repo in [PR #6](https://github.com/calblueprint/dccentralkitchen-clerks/pull/6).

#### Creating pull requests (PRs)

- The template can be found in `.github/pull_request_template.md`. This template is pre-loaded through GitHub when anyone clicks "Create a Pull Request".
- PR descriptions are written in [GitHub Flavored Markdown (GFM)](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax). One tip is that you can copy/paste or drag-and-drop images directly into the PR description, and GitHub will upload and link those for you.
- Install [Loom](https://www.loom.com/) as a Chrome extension or desktop application for easy screen recordings.

#### Git hooks & `package.json` scripts

- **Pre-commit hook**: lint & format

  - [husky](https://www.npmjs.com/package/husky) enables easy usage of Git hooks, while [lint-staged](https://github.com/okonet/lint-staged) runs a series of scripts on only staged files.

- **Post-checkout/merge/write hook**: yarn package management

  - We use [yarnhook](https://github.com/frontsideair/yarnhook) to watch `package.json` and `yarn.lock` for changes; it'll automatically trigger a `yarn install` to make sure your packages are up-to-date.

- **`package.json` scripts**

  - These are listed in `package.json` under `scripts`. They are mostly shorthand for convenient terminal commands. Run these with `yarn run script-name`, e.g

  ```bash
  yarn run lint-all
  ```

  Most of these do not require arguments, with the exception of `pretty`, which requires a target - either a pattern or a filename.

  ```bash
  yarn run pretty components/*.js
  ```

### Working with Airtable

TODO

#### Schema Generator

One of the amazing developers in Blueprint created the [`airtable-schema-generator` package](https://github.com/aivantg/airtable-schema-generator) that generates helper functions for working with the Airtable API. Take a look at its README for details of how it works. In our code, we only ever call functions in `request.js`; see `lib/<feature>Utils.js` for example usage.

::: tip
See [PR #48](https://github.com/calblueprint/dccentralkitchen/pull/48) (customer) and [PR #10](https://github.com/calblueprint/dccentralkitchen-clerks/pull/10) (clerk) for when we first refactored the existing code to use the wrapper API.
:::

## Deploying to the App Store(s)

Please see the **Deploying & Managing Apps** section - [here's the app store update doc](../shared/appstoreupdate.md).

## References

<https://github.com/Airtable/airtable.js/blob/master/CHANGELOG.md>

Development lifecycle:

- <https://git-scm.com/docs/githooks>
- <https://codeburst.io/continuous-integration-lint-staged-husky-pre-commit-hook-test-setup-47f8172924fc>
- <https://medium.com/@bartwijnants/using-prettier-and-husky-to-make-your-commits-save-2960f55cd351>
