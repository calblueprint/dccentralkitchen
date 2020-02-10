/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  Recipes: 'Recipes',
  Products: 'Products',
  Receipts: 'Receipts',
  Customers: 'Customers',
  Stores: 'Stores',
  News: 'News',
  PushTokens: 'Push Tokens',
  Clerks: 'Clerks',
  LineItems: 'Line Items',
  Transactions: 'Transactions'
};

export const Columns = {
  Recipes: {
    title: `Title`,
    servings: `Servings`,
    prepTimeminutes: `Prep Time (minutes)`,
    cookTimeminutes: `Cook Time (minutes)`,
    ingredients: `Ingredients`,
    instructions: `Instructions`
  },
  Products: {
    product_id: `product_id`,
    category: `Category`,
    customerCost: `Customer Cost`,
    points: `Points`,
    transactions: `Transactions`,
    multiplier: `Multiplier`,
    id: `id`,
    lineItemIds: `Line Items`,
    stores: `Stores`,
    name: `Name`,
    storesCopy: `Stores copy`,
    stores2Id: `Stores 2`,
    testing: `Testing`
  },
  Receipts: {
    name: `Name`,
    transactionId: `Transaction`,
    attachments: `Attachments`,
    time: `Time`,
    customerId: `Customer`
  },
  Customers: {
    customer_id: `customer_id`,
    firstName: `First Name`,
    lastName: `Last Name`,
    zipcode: `Zipcode`,
    phoneNumber: `Phone Number`,
    password: `Password`,
    points: `Points`,
    unlockedRewards: `Unlocked Rewards`,
    transactionIds: `Transactions`,
    receiptIds: `Receipts`,
    pushTokenIds: `Push Tokens`,
    token_names: `token_names`,
    name: `Name`,
    redeemedRewards: `Redeemed Rewards`
  },
  Stores: {
    storeName: `Store Name`,
    ward: `Ward`,
    address: `Address`,
    storeHours: `Store Hours`,
    snapOrEbtAccepted: `SNAP or EBT Accepted`,
    couponProgramPartner: `Coupon Program Partner`,
    transactionIds: `Transactions`,
    email: `Email`,
    password: `Password`,
    latitude: `Latitude`,
    longitude: `Longitude`,
    id: `id`,
    clerkIds: `Clerks`,
    productsCopy: `Products copy`,
    productIds: `Products`,
    testing: `testing`
  },
  News: {
    title: `Title`,
    created: `Created`,
    description: `Description`,
    id: `ID`,
    postDate: `Post Date`
  },
  'Push Tokens': {
    token_id: `token_id`,
    createdDate: `Created Date`,
    customerId: `Customer`,
    customerName: `Customer Name`,
    token: `Token`
  },
  Clerks: {
    clerkName: `Clerk Name`,
    firstName: `First Name`,
    lastName: `Last Name`,
    password: `Password`,
    transactionIds: `Transactions`,
    storeId: `Store`
  },
  'Line Items': {
    line_item_id: `line_item_id`,
    productId: `Product`,
    quantity: `Quantity`,
    totalPrice: `Total price`,
    productPrice: `Product price`,
    transactionId: `Transaction`,
    productName: `Product Name`,
    productsCopy: `Products copy`
  },
  Transactions: {
    transaction_id: `transaction_id`,
    customerPhoneNumber: `Customer Phone Number`,
    storeId: `Store`,
    productsPurchasedId: `Products Purchased`,
    customerId: `Customer`,
    receiptIds: `Receipts`,
    date: `Date`,
    pointsRewarded: `Points Rewarded`,
    clerkId: `Clerk`,
    customerName: `Customer Name`,
    lineItems: `Line Items`,
    storeName: `Store Name`
  }
};
