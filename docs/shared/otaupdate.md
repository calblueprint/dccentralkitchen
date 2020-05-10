# Expo OTA Updates
Over-the-air (OTA) updates allow you to publish a new version of your app JavaScript and assets without building a new version of your standalone app and re-submitting to app stores.
::: rightlink
From [Expo Docs: Configuring OTA Updates](https://docs.expo.io/guides/configuring-ota-updates/)
:::

## Updating OTA vs new build
Not all updates can be submitted OTA. There are several limitations with OTA updates, including many changes in `app.json`. You can read more about the [limitations of OTA updates here](https://docs.expo.io/workflow/publishing/#limitations).

Additionally, adoption of OTA updates can be unreliable. Err on the side of caution when deciding whether to make an OTA update or submit a new build.

### When to update OTA
- **Backwards compatible bug fixes**: features where the app would remain usable for those with or without the latest update
  - ex. front-end additions with store details and store hours in [v1.1_tag_updates](https://github.com/calblueprint/dccentralkitchen/releases/tag/v1.1_tag_updates)
- **Minor time-sensitive changes**
  - ex. Healthy Corners requested adding 500 bonus points for signing up to help the Nam's Market launch in [v1.2.0_signup_bonus](https://github.com/calblueprint/dccentralkitchen/releases/tag/v1.2.0_signup_bonus), which also includes several visual bug fixes
- **Airtable schema updates**: breaking if not updated immediately **TODO: LINK TO MORE ON SCHEMA UPDATES**
  
### When to submit a new build
- **Backwards incompatible breaking changes**
  - ex. all passwords had to be changed in Airtable for [#130 Implement basic encryption for passwords](https://github.com/calblueprint/dccentralkitchen/pull/130). If users had not recieved the OTA update, they would not be able to access their accounts
- **Modifications in `expo.ios` or `expo.android` in `app.json`**
  - Learn more about specific limitations in the [Expo Docs](https://docs.expo.io/workflow/publishing/#limitations)
  - ex. adding Firebase configuration in [#88 Firebase integration + Analytics](https://github.com/calblueprint/dccentralkitchen/pull/88)
  
If you need to submit a new build to the app store, follow the instructions on [Updating the app](appstoreupdate.md)

## Publish with Expo
::: warning
As of 5/9/2020, we have been having issues publishing using `expo publish` with expo-cli, as it results in icons and custom fonts not working. Thus, you must [publish through Expo Dev Tools](#how-to-publish-ota-updates) to get custom fonts and icons to display.

Since Expo Dev Tools does not allow for release branches, we have to use the `default` release branch, as the native binaries currently live in the App Store and Play Store are under `@wangannie/healthy-corners-rewards`.
:::

### How to publish OTA updates
1. Run `expo start` in your release branch
2. In Expo Dev Tools, select **Publish or republish project** from the left sidebar
    ![Publishing through Expo Dev Tools](./assets/publish-dev-tools.png)
3. Do not modify the name or url slug, or else the update will not match the binary in the app store.
4. Select **Publish project**
5. Once the update finishes processing, the latest updates should appear within the app. If changes do not appear immediately, close and reopen the app.

#### Helpful links
- [Expo Docs: Configuring OTA Updates](https://docs.expo.io/guides/configuring-ota-updates/)
- [Expo Docs: How to Publish](https://docs.expo.io/workflow/publishing/#how-to-publish)
