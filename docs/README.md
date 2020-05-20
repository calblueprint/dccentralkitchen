---
home: true
heroText: Healthy Corners Rewards
heroImage: /hc_splash.png
footer: Learn more about Blueprint and what we do at calblueprint.org.
---

---

A guide to the customer and companion clerk applications developed with Expo, React Native, and Airtable built for DC Central Kitchen's "Healthy Corners" initiative. Developed by [UC Berkeley @calblueprint](https://calblueprint.org)'s team during the 2019-2020 school year.

## Editing this site

This site is powered by [VuePress](https://vuepress.vuejs.org/), using the default theme with some slight styling modifications. The Markdown sources live in our [main Github repo](https://github.com/calblueprint/dccentralkitchen) on the `docs` branch in the [`docs` folder](https://github.com/calblueprint/dccentralkitchen/tree/docs/docs).

Run `yarn docs:dev` to get the documentation site running locally. It'll default to `localhost:8080`; terminal output will tell you what port if not.

### VuePress modifications

[Reusable Markdown pseudo-components](https://github.com/vuejs/vuepress/issues/222)

- Non-ideal only in that the embedded markdown pages no longer render headers in the sidebar. Might have to create a new section in the sidebar after all.

## Deployment

We use Netlify for continuous deployment. It's configured to auto-build and deploy to <https://healthycorners-rewards.netlify.app/> whenever a commit is pushed to the `dccentralkitchen/docs` branch.
