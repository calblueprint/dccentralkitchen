# Editing existing store data

Use this guide to edit store information in Airtable. Column names are indicated below with brief explanations and examples.

[[toc]]

::: tip NOTE
To **add a new store**, use the form linked [here](forms.md).
:::


### `Primary Key`

::: danger
**Do not edit anything in this column.**
:::

### `Store Name`

This name must **match the name on the Auto Import product data sheet** for product delivery updates to transfer correctly.

### `Ward`

Only enter the number.

| Do  | Don't    |
| --- | -------- |
| `7` | `Ward 7` |

### `Address`

Only include the Street Number and Street Name, **not the entire address with city, state and zip code.**

| Do                            | Don't                                     |
| ----------------------------- | ----------------------------------------- |
| `4748 Sheriff Road Northeast` | `4748 Sheriff Rd NE Washington, DC 20019` |

### `Latitude` & `Longitude`

Enter the store's full address [here](https://www.latlong.net/)to find the Latitude and Longitude. Copy and paste the full numbers here.

The numbers should look similar to this example:

- Latitude: `38.903049`
- Longitude: `-76.934087`

### `Store Hours`

This input **MUST** follow the correct format outlined in the [store hours formatting guide](./storehours.md)

### `Phone Number`

Enter 10 digits only — this will format automatically.

If a phone number is not available, leave this field blank. DO NOT enter anything other than a phone number such as an email address, website link etc.

| Do           | Don't                                                                |
| ------------ | -------------------------------------------------------------------- |
| `1231231234` | `123.123.1234` `+1(433) 343-9293` Do not add any special characters. |


### Accepted programs checkboxes

For the following columns, check the box if the program is accepted at the store. Otherwise, leave the column blank. For reference, this is how the Airtable column names display in the app.
| Airtable column name   | Tag label       |
| ---------------------- | --------------- |
| SNAP or EBT Accepted   | EBT             |
| Coupon Program Partner | SNAP Match      |
| Rewards Accepted       | Healthy Rewards |
| WIC                    | WIC             |

### `Do Not Display`

Check this box to hide a store from displaying to customers in the app.


### `Stocks Other Vendors`

Checking this box will display the following message with the store:
> This store regularly stocks additional produce from other vendors.