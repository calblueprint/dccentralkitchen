# Future Development

When considering design changes, pivots, and/or new features, this page may be useful. Also, as a reference, the motivation behind the original design is covered in the [Fall 2019 presentation](https://docs.google.com/presentation/d/1Q5_InElKnsrxvVdGdSQnlQo9-2z041UiefY3XZN8qhc/edit?usp=sharing).

These are the takeaways and a user-suggested wishlist from **user testing** conducted after our initial launch.

::: warning NOTE
These insights were collected from interviews with **five DC Central Kitchen staff members**, and this is not an exhaustive list of features that Healthy Corners customers may need/want. We recommend conducting additional user testing with Healthy Corners shoppers after handoff.
:::

## Takeaways

User testing conducted in the final few weeks of development helped to develop a better understanding of what works and what doesn't. The following are a few takeaways that aren't quite evident from just looking at the app:

### Shopping habits

- Most user testers said they consistently shop at the same 2 or 3 stores.
- Usually, shoppers will go to whatever is closest to home/work — wherever they are when they go shopping.
- Customers may be willing to shop at a Healthy Corners Rewards participating store if it is a reasonable distance away.
  - This distance depends on what transportation is available. For those with cards, a distance of a few blocks felt reasonable.
  - As a result, it would be helpful to launch this program ward by ward, so there is a participating store within x-mile radius of any given residence.

### Be explicit and clear

- The target user base likely consists of many seniors and people not used to using apps.
- Adding explicit text explanations, like "check back for updates" in a blank state, is crucial to improving usability.
- Writing copy on loading screens that previews/explains what is being loaded is also helpful.
- Some icons — such as centering location, store information, and X's vs back arrows — may be unintuitive to new users.

## Wishlist

Additionally, users shared features that they hoped to see implemented in the future. The following is a feature wishlist based on user testing takeaways from Spring 2020:

### Recipes and nutrition information

Currently, the product detail page shows price and point value. Recipe links and nutrition information would help make these pages more useful; they would further promote healthy eating.

### Profile

Users expressed that they would like a more detailed profile where they can save information and personalize their experience. They expressed interested in the following features:

- Adding items to a 'shopping list' saved within the app so everything exists in one place
- Favoriting recipes/products for future reference without having to navigate through a store to get a product's details
- Favoriting stores to receive information about them, thus implementing a personalized news/announcements function

### Push notifications

Users suggested a few different cases for push notifications that would help boost app usage and sort of 'game-ify' the rewards system:

- When a user is x points/dollars away from their next reward
- When a favorite store has changing hours
- When a sale/promotion starts at a favorite store or across all stores

::: warning Developer note
During the Fall 2019 semester, we made a first attempt at implementing push notifications (in the context of adding a "News" feature). We ran into some issues and stopped work on the feature. Thus, the `Push Tokens` and `News` tables in Airtable are currently unused, but not deleted.

You can inspect [PR #36](https://github.com/calblueprint/dccentralkitchen/pull/36/files)'s `LoginScreen.js` and `SignUpScreen.js` files for the since-deprecated and removed code (at TOW the `registerForPushNotificationsAsync` has not been removed, but it is unused).

Similarly, [PR #48](https://github.com/calblueprint/dccentralkitchen/pull/48) when we first integrated the Airtable schema generator has the refactored Airtable code (untested since push notifications were not enabled at the time).
:::

### Store stock information

Users expressed interest in seeing exact shipment dates of items. This is particularly important during times of crisis to get a better idea if an item is still in stock. However, we discussed with the Healthy Corners team about whether this would be more helpful or hurtful:

- Pros: build customer trust and loyalty, increase transparency, more reliable and explicit
- Cons: customers may not want to purchase older stock, difficult/impossible to get information this detailed

This also felt particular to the COVID-19 pandemic — it is more important now than ever to know what is available at stores before leaving the house. As a result, this feature could be less important in the future.

## Final thoughts

There is still a lot of potential for this app! Not every need or stretch feature could be addressed, and only minimal testing was conducted due to remote constraints. Having more varied user testing with more diverse users would shed light onto what future features would be useful for the Healthy Corners Rewards app.

Ultimately, we hope this app is able to grow to serve more users' needs and wants.
