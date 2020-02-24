/* eslint no-restricted-imports: 0 */

/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import { Tables, Columns } from './schema';
import {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordsByAttribute,
  getRecordById,
  deleteRecord
} from './airtable';

/*
 ******* CREATE RECORDS *******
 */

export const createRecipes = async record => {
  return createRecord(Tables.Recipes, record);
};

export const createProducts = async record => {
  return createRecord(Tables.Products, record);
};

export const createReceipts = async record => {
  return createRecord(Tables.Receipts, record);
};

export const createCustomers = async record => {
  return createRecord(Tables.Customers, record);
};

export const createStores = async record => {
  return createRecord(Tables.Stores, record);
};

export const createNews = async record => {
  return createRecord(Tables.News, record);
};

export const createPushTokens = async record => {
  return createRecord(Tables.PushTokens, record);
};

export const createClerks = async record => {
  return createRecord(Tables.Clerks, record);
};

export const createLineItems = async record => {
  return createRecord(Tables.LineItems, record);
};

export const createTransactions = async record => {
  return createRecord(Tables.Transactions, record);
};

/*
 ******* READ RECORDS *******
 */

export const getRecipesById = async id => {
  return getRecordById(Tables.Recipes, id);
};

export const getAllRecipess = async () => {
  return getAllRecords(Tables.Recipes);
};

export const getProductsById = async id => {
  return getRecordById(Tables.Products, id);
};

export const getAllProductss = async () => {
  return getAllRecords(Tables.Products);
};

export const getReceiptsById = async id => {
  return getRecordById(Tables.Receipts, id);
};

export const getAllReceiptss = async () => {
  return getAllRecords(Tables.Receipts);
};

export const getCustomersById = async id => {
  return getRecordById(Tables.Customers, id);
};

export const getAllCustomerss = async () => {
  return getAllRecords(Tables.Customers);
};

export const getCustomerssByPhoneNumber = async value => {
  return getRecordsByAttribute(
    Tables.Customers,
    Columns[Tables.Customers].phoneNumber,
    value
  );
};

export const getStoresById = async id => {
  return getRecordById(Tables.Stores, id);
};

export const getAllStoress = async () => {
  return getAllRecords(Tables.Stores);
};

export const getNewsById = async id => {
  return getRecordById(Tables.News, id);
};

export const getAllNewss = async () => {
  return getAllRecords(Tables.News);
};

export const getPushTokensById = async id => {
  return getRecordById(Tables.PushTokens, id);
};

export const getAllPushTokenss = async () => {
  return getAllRecords(Tables.PushTokens);
};

export const getClerksById = async id => {
  return getRecordById(Tables.Clerks, id);
};

export const getAllClerkss = async () => {
  return getAllRecords(Tables.Clerks);
};

export const getLineItemsById = async id => {
  return getRecordById(Tables.LineItems, id);
};

export const getAllLineItemss = async () => {
  return getAllRecords(Tables.LineItems);
};

export const getTransactionsById = async id => {
  return getRecordById(Tables.Transactions, id);
};

export const getAllTransactionss = async () => {
  return getAllRecords(Tables.Transactions);
};

/*
 ******* UPDATE RECORDS *******
 */

export const updateRecipes = async (id, recordUpdates) => {
  return updateRecord(Tables.Recipes, id, recordUpdates);
};

export const updateProducts = async (id, recordUpdates) => {
  return updateRecord(Tables.Products, id, recordUpdates);
};

export const updateReceipts = async (id, recordUpdates) => {
  return updateRecord(Tables.Receipts, id, recordUpdates);
};

export const updateCustomers = async (id, recordUpdates) => {
  return updateRecord(Tables.Customers, id, recordUpdates);
};

export const updateStores = async (id, recordUpdates) => {
  return updateRecord(Tables.Stores, id, recordUpdates);
};

export const updateNews = async (id, recordUpdates) => {
  return updateRecord(Tables.News, id, recordUpdates);
};

export const updatePushTokens = async (id, recordUpdates) => {
  return updateRecord(Tables.PushTokens, id, recordUpdates);
};

export const updateClerks = async (id, recordUpdates) => {
  return updateRecord(Tables.Clerks, id, recordUpdates);
};

export const updateLineItems = async (id, recordUpdates) => {
  return updateRecord(Tables.LineItems, id, recordUpdates);
};

export const updateTransactions = async (id, recordUpdates) => {
  return updateRecord(Tables.Transactions, id, recordUpdates);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteRecipes = async id => {
  return deleteRecord(Tables.Recipes, id);
};
export const deleteProducts = async id => {
  return deleteRecord(Tables.Products, id);
};
export const deleteReceipts = async id => {
  return deleteRecord(Tables.Receipts, id);
};
export const deleteCustomers = async id => {
  return deleteRecord(Tables.Customers, id);
};
export const deleteStores = async id => {
  return deleteRecord(Tables.Stores, id);
};
export const deleteNews = async id => {
  return deleteRecord(Tables.News, id);
};
export const deletePushTokens = async id => {
  return deleteRecord(Tables.PushTokens, id);
};
export const deleteClerks = async id => {
  return deleteRecord(Tables.Clerks, id);
};
export const deleteLineItems = async id => {
  return deleteRecord(Tables.LineItems, id);
};
export const deleteTransactions = async id => {
  return deleteRecord(Tables.Transactions, id);
};
