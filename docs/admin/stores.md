# Editing existing store data

Use this guide to edit store information in Airtable. Column names are indicated below with brief explanations and examples.

[[toc]]

::: tip NOTE
To **add a new store**, use the form linked [here](forms.md).
:::

::: warning NOTE
Currently, there is no way to temporarily hide a store. To permanently delete a store, right click anywhere on the row and select the "Delete" option in the drop down menu.
:::

### `Primary Key`

:x: **Do not edit anything in this column**

### `Store Name`

This name must match the name on the Auto Import product data sheet for product delivery updates to transfer correctly.

### `Ward`

Only enter the number.

:white_check_mark: `7`

:x: `Ward 7`

### `Address`

Only include the Street Number and Street Name, **not the entire address with city, state and zip code.**

:white_check_mark: `4748 Sheriff Road Northeast`

:x: `4748 Sheriff Rd NE Washington, DC 20019`

### `Latitude` & `Longitude`

Enter the store's full address [here](https://www.latlong.net/)to find the Latitude and Longitude. Copy and paste the full numbers here.

The numbers should look similar to this example:

- Latitude: `38.903049`
- Longitude: `-76.934087`

### `Store Hours`

This input **MUST** follow the correct format outlined in the [store hours formatting guide](./storehours.md)

:white_check_mark: Correct examples:

- `9am-7pm Sun, 9am-8pm Tu-Sat, Closed Mon`
- `8:30am-8pm Mon-Sat, 8:10am-5pm Sun`
- `Open 24/7`
- `8am-11pm Daily`
- If the store hours are unavailable, enter `Store hours unavailable`

### `Phone Number`

Enter 10 digits only — this will format automatically.

If a phone number is not available, leave this field blank. DO NOT enter anything other than a phone number such as an email address, website link etc.

:white_check_mark: `1231231234`

:x: `123.123.1234` Do not add any special characters.

### Accepted programs checkboxes

For the following columns, check the box if the program is accepted at the store. Otherwise, leave the column blank. For reference, this is how the Airtable column names display in the app.
| Airtable column name | Tag label |
| ---------------------- | --------------- |
| SNAP or EBT Accepted | EBT |
| Coupon Program Partner | SNAP Match |
| Rewards Accepted | Healthy Rewards |
| WIC | WIC |
