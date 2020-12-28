# Application Overview

This application runs with Express and Node.js, and mainly uses the Twilio, Airtable, and Appian APIs.

For local development, the server will run on port 3000 by default at <localhost:3000>.

::: tip Quick Reference
To update products to Airtable locally, use the `POST '/updateMappings/prod'` route.

To send product delivery SMS alerts locally, use the `POST '/send_alert'` route.
:::

## `index.js`

The server logic is contained in this file, where we initialize the Express app and configure it. Next, the various endpoints are defined, which are mostly documented via inline comments. 

Everything related to Twilio Notifications is documented in [SMS Notifications with Twilio](twilio-notifications.md). 

Other functions related to updating store products and the Appian API are documented in [Updating Store Products](store-products.md).