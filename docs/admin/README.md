# Admin Guide

This guide is for members of the Healthy Corners team, to understand how to perform administrative tasks necessary to manage the Healthy Corners Rewards project. For an introduction to the project and the rewards program, please refer to the [homepage](/#introduction).

Reading through the [Airtable introduction](#airtable) to familiarize yourself with Airtable, which stores all the data for the rewards program, is **essential**.

Developers should read through the [developer documentation](../shared/overview.md).

## Navigating this site

We'll briefly introduce the other pages.

::: warning
Due to the nature of the project, there are some constraints on how data must be formatted when creating a new "record", or database row, in Airtable.

Failing to meet these data format expectations will result in data being displayed incorrectly on the application(s), or in the worst case could cause the application(s) to crash.
:::
The **Airtable Guidelines** section:

- [Adding to Airtable](./forms.md): Links to password-protected Airtable forms. Use these to add _new_ data to Airtable - they'll ensure all required fields are populated and have instructions on formatting.
- [Create a clerk account](./newclerk.md): Instructions to create a new clerk account.
- [Editing existing store data](./stores.md): This details the expected format of each field of a Store record. Make sure not to violate any of these rules when updating store data!
- [Formatting store hours](./storehours.md): Specifically, the `Store Hours` field is very finicky. Detailed examples of accepted/unaccepted format can be found in this page.
- [Processing product images](./productimages.md): Image sizes are constrained. This guide walks through how to compress and upload images.

[Scheduled Updates](./scheduled-update.md): Explains how we keep the products displayed in the app in-sync with deliveries, and what needs to be maintained through Google Sheets.  
[Marketing assets](./marketingassets.md): Links to various marketing assets for the applications.  
[Important links](./links.md): Shortlinks used for convenience.  
[Future development](./future.md): Please take a look at this page when considering changes, new features, etc.

[Design Prototypes](../design.md) (linked in the navbar): introduction to Figma, which is where our application designs live; embedded prototypes.

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

Airtable does a better job of introducing its product than we ever could. We'd recommend going through their ["Getting started with Airtable" guides](https://support.airtable.com/hc/en-us/sections/360003922433) - they're short but extremely helpful!

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

  Clerk PINs are exposed because they are simple 4-digit numbers, and set by admins - admins may modify these PINs in rare cases. New clerks should be created via [Airtable form](forms.md) - in general, it's best not to directly add new records in case some required fields are missed by accident. Clerk PINs may be edited via the `Clerks` table "Admin View".

  Transactions represent an individual customer's transaction at checkout at a single store.

- **Public information**: `Stores`, `Products`, `Resources`, `News`

  Information in all of these tables is public-facing; we display almost all of this information to customers in the application, so there isn't as much of a need to restrict access (it's also why all screenshots in this guide are from the `Stores` table).

  Stores, products, and resources should be added using Airtable forms - in these forms, we detailed some contraints on what the data must look like for the application to display data properly. We've linked them [all here](forms.md).

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
