# Introduction

This section is meant to help members of the Healthy Corners team familiarize themselves with Airtable and how to update data that appears in the customer and/or clerk applications.

Developers should read through the [developer documentation](../shared/overview.md).

## Airtable

[Airtable](https://airtable.com/) is where all the application data is stored. Its tagline is "part spreadsheet, part database, and entirely flexible" and it is exactly what it sounds like - a database that looks like a spreadsheet. As a bonus, it also has beautiful design.

All admins need access to our [Airtable workspace](https://airtable.com/invite/l?inviteId=invFPVCCPnoHZ0htX&inviteToken=8c4d57af33a94c6b1527d75df1f13c7ecb9a98b38ae3eb432700445e1fb2bc6d).

![Airtable workspace](./assets/intro/airtable-workspace.png)

There are multiple bases: `PROD` stands for "Production", meaning that base is where the live applications are pulling data from. `DEV` stands for "Development", and that base is used only when developers are working on or testing the app on their computers.

Admins will probably only need to access `[PROD] DC Central Kitchen - Healthy Corners` and `App Feedback` regularly.

::: warning
You'll notice that this workspace is currently on the `Pro trial` - we're using one of our 2-year student Pro trials, which will expire in March 2022.
:::

---

### Usage

Airtable does a better job of introducing its product than we ever could. We'd recommend going through their ["Getting started with Airtable" guides](airtable.com) - they're short but extremely helpful!

Once you're comfortable with Airtable, you might also want to take a look at the ["Power user's guide"](https://support.airtable.com/hc/en-us/articles/360021500274-The-Airtable-power-user-s-guide)

#### Must-read

- Starting with the base-ics <https://support.airtable.com/hc/en-us/articles/360021518753>
- Tables, records, and fields <https://support.airtable.com/hc/en-us/articles/360021333094>
- Making new tables and linking records <https://support.airtable.com/hc/en-us/articles/360021502354>

#### Views

Views are one of Airtable's most powerful features; they allow for a myriad of ways to inspect data. We didn't take much advantage of them, but would guess that for administrative usage they are really great - reading through these is very encouraged!

- Customizing your first view <https://support.airtable.com/hc/en-us/articles/360021501754>
- View types <https://support.airtable.com/hc/en-us/articles/360021502314>

---

### Tables

Now, we'll briefly describe how the `[PROD]` base is set up.

![Airtable PROD](./assets/intro/airtable-prod.png)

As you can see, we currently have **nine** tables - the admin-facing tables also should all have an "Admin View" already created. These can roughly be split into **three categories**:

- **Sensitive information**: `Customers`, `Clerks`, `Transactions`

  Even read-only links to these tables should **never** be shared with anyone outside of the Healthy Corners team. Ideally, admins will never need to edit records in `Customer` or `Transactions`. It is the developer(s)' responsibility to ensure records are created and updated correctly from the application.

  Customer passwords are encrypted, but phone number and preferred name are exposed.

  Clerk pins are exposed because they are simple 4-digit numbers, and set by admins - admins may modify these pins in rare cases. New clerks should be created via [Airtable form](./forms.md) - in general, it's best not to directly add new records in case some required fields are missed by accident. Clerk pins may be edited via the `Clerks` table "Admin View".

  Transactions represent an individual customer's transaction at checkout at a single store.

- **Public information**: `Stores`, `Products`, `Resources`, `News`

  Information in all of these tables is public-facing; we display almost all of this information to customers in the application, so there isn't as much of a need to restrict access (it's also why all screenshots in this guide are from the `Stores` table).

  Stores, products, and resources should be added using Airtable forms - in these forms, we detailed some contraints on what the data must look like for the application to display data properly. We've linked them [all here](./forms.md).

  In particular, the `Store Hours` input is very finicky. Please read [formatting guidelines](./storehours.md) we've detailed.

  ::: tip
  Products' point values for rewards can be adjusted by modifying the `Multiplier` field for that particular product record. Do not modify anything else - the `Points` field will update automatically because it is a formula-type field.
  :::

- **Developer-only**: `Line Items`, `Push Tokens`

  Admins will never need to directly interact with these records.

  Line items are an abstraction used to correctly display the products purchased by a customer during a single transaction. They are unique to both the customer and the transaction.

  Push tokens are used to send notifications to users. Currently, this table is unused.

::: warning Note
Of these tables, currently `Push Tokens` and `News` are unused. Neither of the applications are interacting with these tables, but because we have some outdated code that works with both tables, we elected to keep these tables in case a developer wants to work on adding those features back to the app.
:::

#### Primary Keys

The leftmost field of every table is used as the **primary key**. For technical reasons, this field **must** be unique for every record inthe table. Thus, we use a combination of the rest of the records' fields to make it as human-readable as possible while also guaranteeing uniqueness (usually by mixing in the records' underlying database ID).

Please **do not modify** the primary key field and replace it with something else. But feel free to look at the formulas and tweak them (as long as you keep the `RECORD_ID()` part and/or otherwise enforce uniqueness).

## Google Sheets

We run a daily job to automatically update a store's current products in Airtable from the most recent deliveries. Currently, the Google sheet that is being used to update Airtable is called `Blueprint - Store Products` on the "FY20 Sales Data and Trends" Google Sheet. It pulls data from the 'Auto Import' sheet, so it relies on the columns being as expected.

![Google Sheets - Blueprint sheet](./assets/intro/google-sheet.png)

::: danger
When the Google Sheet for deliveries is changed, the code for the automatic update **must be updated** to link to the new Google Sheet. We recommend that a developer helps do this - though it's not many steps, it does need some technical knowledge. On the admin side, the current `Blueprint - Store Products` sheet must be replicated **exactly** in the new Google Sheet, including which columns correspond to what. The formulas must be updated so that data is accurately transferred to the `Blueprint - Store Products` sheet.
:::

We'll explain the various formulas and constraints on the cells in this sheet.

---

### Header row

Most of the important cells have notes added to explain what they do as indicated by the black triangle in the upper-right corner of the cell - hover over them to view the notes.

For example, the "'Auto Import' Row LOWER Limit cell" is purely informative and doesn't affect anything else on the sheet.

![Auto Import cell](./assets/intro/auto-import.png)

The "Date Range Start" and "Date Range End" cells are used in the formulas (more on that later) and are updated during the scheduled job to be `Today` and `Today - <Date Range Length>`. Modifying these will **not** affect future scheduled updates, since the code will simply overwrite these values.

Notably, the "Date Range Length" cell is the **only cell that is used as input** by the scheduled product update code. This number indicates how many days of deliveries to check for products!

::: tip
For example, if you want to show the past 10 days of delivered products, you should update this value to **10**. The next time the scheduled job runs, it will use "10" to update the "Date Range Start" and "Date Range End" cell values.

Please note that this will only affect **future** jobs - you may need to wait up to 24 hours for this change to be reflected in the app. If you'd like it to be done faster, please have a developer run the job manually ([documentation for this app](../node)).
:::

### Formula cells

All of the yellow-highlighted cells other than "Date Range Start" and "Date Range End" are **formula cells**.

For example, the first cell in the "Store Name" is actually a formula that does a lookup to get all the names of all stores that had deliveries during the date range specified.

In general, these **do not need to be modified**.
![Formula from Google Sheet](./assets/intro/formula.png)

However, for every store that has deliveries, its corresponding cells in columns **B** ("Last Delivery") and **C** ("Products") are also formula cells. This means that the formula must be manually copied in. Currently, we assume a limit of **100 stores**. That means the formulas are pre-populated up to the 101th cell.
::: danger
If there are ever > 100 stores delivered to within "Date Range Length", unless the formulas are manually copied to the 101th+ row, **some products will not be updated in Airtable.**
:::

Some additional notes about the formula cells:

- "Last Delivery" displays the latest delivery date to a store within the specified date range. However, that doesn't mean **all updated products** were delivered on that day (i.e consider the case store had multiple deliveries within the specified date range).
- All formulas use a lower bound of 21000 as the first row to start getting data from in 'Auto Import'. Theoretically, updating this lower bound in all the formulas would make the formula lookup faster, but speed shouldn't be a big problem.
- All formulas will automatically use the last row of the spreadsheet as the upper bound. This is due to A1 notation: `$A$21000:A` means start at the 21000th row and go til the end.

Example of an updated Airtable Store record
![Example Airtable record](./assets/intro/airtable-record.png)

Note that Airtable keeps a record of revision history, so you can see that the latest delivery to "Dollar Plus Super Market (Howard Road)" must have been two days ago (at time of writing).

::: warning Note
Even though the scheduled update will happen daily, Airtable will only apply new updates to a store record.
:::

If you scroll down, you can see the linked Product records and can add/remove to this list as usual if you need to.
![Record details](./assets/intro/record-detail.png)

Finally, as a reminder, these are some of the affected views in the customer application. We're looking at the same example store here, so you can see that the changes are reflected directly in the application.
| Map view | Individual store's product list |
| :------------------------------------------------: | :------------------------------------------------------------------: |
| ![Customer App: map view](./assets/intro/map-view.png) | ![Customer App: a store's product list](./assets/intro/product-list.png) |
