<!-- Embedded with the <Content/> Vue component into Customer/Clerk sections -->

::: warning NOTE
This documentation is the same for both the customer and clerk applications.
:::

## Overview

There are a several constant values that are used throughout the Customer and Clerk Applications. In particular, the following constants identified are ones that you might find necessary to change. These constants, their current values, and their descriptions are as follows:

- **Customer and Clerk App – Reward Point Value**
  - This determines the number of points to **earn** each reward.
  - Change it if you want to increase or decrease the number of points needed to unlock an award.
  - Change needs to be done for **both** Customer App and Clerk App
- **Customer and Clerk App – Reward Dollar Value**
  - This determines the **value** of each reward.
  - Change this if you want each reward to be worth more or less.
  - Change needs to be done for **both** Customer App and Clerk App
- **Customer App – Default Store**
  - This is the store that a user will see when they launch the app, if they don't have location services enabled or is too far away from all the stores.
- **Customer App – Delivery Frequency**
  - This determines how often the Healthy Corners produce are replenished for all the stores

## How to change each constant

All of the constants are found in a folder named `/constants`.

### Customer and Clerk App – **Reward Point Value and Reward Dollar Value**

- For **both** applications, navigate to the file `/constants/Rewards.js`
- Change the values `rewardPointValue` and/or `rewardDollarValue`

::: warning NOTE
The values must be changed in both the Customer and Clerk App for rewards to be unlocked and redeemed properly!
:::

<<< @/constants/Rewards.js

### **Customer App – Default Store**

There are two steps to changing this value:

1. Retrieving the specific store id from Airtable
2. Updating the `defaultStoreId` value

#### 1. Retrieving the specific store id from Airtable

- Because there are two development modes (_Link to Airtable / Annie's doc about prod & dev)_, 2 separate store ids of the same store has to be retrieved
- For each of the Airtable bases ([Production](https://airtable.com/tblRfu3fBhQpUiUlV/viw68dujd3AsjEGHl?blocks=hide) / [Development](https://airtable.com/tblLftqlurO2eHeCN/viw08cRp6dy5D30Yd?blocks=hide)):
  - Click on the `Stores` table
  - Find the row of the new store that you want to set as the default store
  - Copy down the record id in the `id` column

#### 2. Updating the `defaultStoreId` value

- Navigate to `/constants/RecordIds.js`
- Replace the `RecordIds.defaultStoreId` values for both `'dev'`(Development) and `'prod'` (Production) Ids based on the retrieved values from Airtable

  - The values in `line 17` and `line 24` seen below are for development and production modes respectively.

<<< @/constants/RecordIds.js {17,24}

::: warning NOTE
See [below](#note-on-the-recordids-js-file) for a note on `/constants/RecordIds.js`
:::

### Note on the `RecordIds.js` file

- There are four different types of `RecordIds` specified in this file, that corresponds to specific users and stores.
- The description are as follows
  - **`testCustomerId`**: Id specifying a default customer for testing purposes. This customer will only be accessed during development, and not in production/live apps.
  - **`guestCustomerId`**: Id specifying a default customer for guest mode. This is required to determine some of the content in the drawer/hamburger menu
  - **`defaultStoreId`**: Id specifying a store that a user will see when they launch the app, if they don't have location services enabled or is too far away from all the stores.
- Apart from `defaultStoreId`, the other ids does not need to be changed.
