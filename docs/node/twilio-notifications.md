# SMS Notifications with Twilio

The initial Twilio configuration was based this [SMS Notifications with Node.js and Express guide](https://www.twilio.com/docs/sms/tutorials/server-notifications-node-express) and [starter code repo](https://github.com/TwilioDevEd/server-notifications-node) from Twilio's documentation.

We use Twilio for SMS notifications. Notifications fall under the following main categories:
1. **Delivery alerts**: scheduled notifications sent at the same time every day (usually 5 or 6 PM Eastern) whenever any of a customer's "favorite stores" receive new product deliveries. This process is handled by the node server.
2. **'General' notifications**: messages to alert customers about general store information, product updates, or news from DC Central Kitchen. As of December 2020, this is not integrated with the **News** section in the Airtable base, but messages can be sent by Admins using the Airtable Twilio integration (learn more about how this works in the [Sending Notifications](../admin/sending-notifications.md) guide).
3. (STRETCH FEATURE) **Account notifications**: confirmation messages after successful checkout using the rewards program, updates on how many points have been earned/rewards available, etc. This is not supported as of December 2020, but could easily be integrated in the future using the existing Twilio SMS infrastructure from Delivery Alerts.

::: warning NOTE
Users also receive SMS messages to authorize phone numbers to log into their accounts, but that process relies on [Firebase phone auth](../customer/auth.md), which is completely separate from how we use Twilio.
:::

## Process overview
We've included plenty of inline comments in the relevant files, and the logic should be pretty self-explanatory. At a high level, here's how the process works:

1. `send-alert.js` is the scheduled script for SMS delivery alerts that is executed once a day through the Heroku scheduler. This simply calls `notifyCustomers` in `utils/twilioNotifications.js`.
2. In `notifyCustomers`, first we call `getCustomers` from `utils/customerUtils.js` which retrieves and returns a JavaScript array of relevant customer records from Airtable to alert.
   - The `getFavoriteStoreNames` helper function is essential to properly format the customer information. It selects only the customers who have favorite stores with deliveries today, and filters their favorite stores to only include the **names** (instead of IDs) of the stores to send alerts about. This makes it easy to format the message. For example, if customer Billy Bob had 10 different favorited stores (including Shipley and A & S), but only Shipley Super Market and A & S Grocery had deliveries today, this is what the cleaned customer record would look like:
        ``` js
        {
            name: 'Billy Bob',
            favoriteStores: [ 'Shipley Super Market', 'A & S Grocery'],
            phoneNumber: '(221) 123-1223'
        }
        ```
3. For each of the customer records returned, we construct a formatted message string using the `formatMessage` helper function, and call `sendSms` to send the message through the configured Twilio client (see `twilioConfig.js`).

## Modifying the message body
To modify the message sent to customers, go to the `formatMessage` function in `utils/twilioNotifications.js`. Here, you can modify the template string to change what customers receive. As of December 2020, the message template is:
```
Healthy Corners: Hi ${name}, your favorite store(s) (${storeString}) received fresh deliveries from Healthy Corners today! Visit the Healthy Corners app healthycorners.app.link/newdelivery to see which products were delivered. Reply STOP to unsubscribe.
```
which displays as:
> Healthy Corners: Hi Billy Bob, your favorite store(s) (Shipley Super Market) received fresh deliveries from Healthy Corners today! Visit the Healthy Corners app healthycorners.app.link/newdelivery to see which products were delivered. Reply STOP to unsubscribe.

Keep in mind that messages cost a little over $0.01 per message, and each message is **limited at 160 characters in length** (longer messages will be split into multiple).

See [other important things to note about SMS notifications](../admin/sending-notifications.html#important-things-to-note)

## Linking with Branch.io
Delivery alert messages include this link <https://healthycorners.app.link/newdelivery> to direct customers to open the app. This link was created using <http://branch.io/>, which is configured through Expo and `app.json` in the Customer app. Currently, the link included in the message is a simple link into the app (or to the app store page if the app is not installed), but Branch supports more features like deep linking which could be integrated in the future. More on [using Branch with Expo](https://docs.expo.io/versions/latest/sdk/branch/).