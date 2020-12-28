---
prev: ../clerk/
next: ./getting-started
---

# Backend Server (Node.js)

This backend server built with Express and Node integrates the Airtable API with:
1. the Appian API to update the products delivered in the customer app (see [Updating Store Products](store-products.md))
2. the Twilio API to alert customers of recent product deliveries (see [SMS Notifications with Twilio](twilio-notifications.md))

Both processes are executed once a day through a scheduled daily job via Heroku.

Here are some of the affected views in the customer application.
|                           Map view                           |                        Individual store's product list                         |
| :----------------------------------------------------------: | :----------------------------------------------------------------------------: |
| ![Customer App: map view](../assets/node/store-map-view.png) | ![Customer App: a store's product list](../assets/node/store-product-list.png) |

## Server

This application is live at <https://healthycorners-rewards-node.herokuapp.com/>.
