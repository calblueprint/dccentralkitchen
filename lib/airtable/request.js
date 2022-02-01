/* eslint no-restricted-imports: 0 */
/* eslint-disable no-unused-vars */

/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import {
  createRecord,
  createRecords,
  deleteRecord,
  getAllRecords,
  getRecordById,
  getRecordsByAttribute,
  updateRecord,
  updateRecords,
} from './airtable';
import { Columns, Tables } from './schema';

/*
 ******* CREATE RECORDS *******
 */

export const createCustomer = async (record) => {
  return createRecord(Tables.Customers, record);
};

export const createManyCustomers = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Customers, subset));
  }
  return Promise.all(createPromises);
};

export const createClerk = async (record) => {
  return createRecord(Tables.Clerks, record);
};

export const createManyClerks = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Clerks, subset));
  }
  return Promise.all(createPromises);
};

export const createStore = async (record) => {
  return createRecord(Tables.Stores, record);
};

export const createManyStores = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Stores, subset));
  }
  return Promise.all(createPromises);
};

export const createProduct = async (record) => {
  return createRecord(Tables.Products, record);
};

export const createManyProducts = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Products, subset));
  }
  return Promise.all(createPromises);
};

export const createResource = async (record) => {
  return createRecord(Tables.Resources, record);
};

export const createManyResources = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Resources, subset));
  }
  return Promise.all(createPromises);
};

export const createTransaction = async (record) => {
  return createRecord(Tables.Transactions, record);
};

export const createManyTransactions = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Transactions, subset));
  }
  return Promise.all(createPromises);
};

export const createLineItem = async (record) => {
  return createRecord(Tables.LineItems, record);
};

export const createManyLineItems = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.LineItems, subset));
  }
  return Promise.all(createPromises);
};

export const createPushToken = async (record) => {
  return createRecord(Tables.PushTokens, record);
};

export const createManyPushTokens = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.PushTokens, subset));
  }
  return Promise.all(createPromises);
};

export const createNew = async (record) => {
  return createRecord(Tables.News, record);
};

export const createManyNews = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.News, subset));
  }
  return Promise.all(createPromises);
};

export const createRecipe = async (record) => {
  return createRecord(Tables.Recipes, record);
};

export const createManyRecipes = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Recipes, subset));
  }
  return Promise.all(createPromises);
};

/*
 ******* READ RECORDS *******
 */

export const getCustomerById = async (id) => {
  return getRecordById(Tables.Customers, id);
};

export const getCustomersByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Customers, formula, sort);
};

export const getAllCustomers = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Customers, filterByFormula, sort);
};

export const getCustomersByPhoneNumber = async (
  value,
  filterByFormula = '',
  sort = []
) => {
  return getRecordsByAttribute(
    Tables.Customers,
    Columns[Tables.Customers].phoneNumber.name,
    value,
    filterByFormula,
    sort
  );
};

export const getClerkById = async (id) => {
  return getRecordById(Tables.Clerks, id);
};

export const getClerksByIds = async (ids, filterByFormula = '', sort = []) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Clerks, formula, sort);
};

export const getAllClerks = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Clerks, filterByFormula, sort);
};

export const getStoreById = async (id) => {
  return getRecordById(Tables.Stores, id);
};

export const getStoresByIds = async (ids, filterByFormula = '', sort = []) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Stores, formula, sort);
};

export const getAllStores = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Stores, filterByFormula, sort);
};

export const getProductById = async (id) => {
  return getRecordById(Tables.Products, id);
};

export const getProductsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Products, formula, sort);
};

export const getAllProducts = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Products, filterByFormula, sort);
};

export const getResourceById = async (id) => {
  return getRecordById(Tables.Resources, id);
};

export const getResourcesByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Resources, formula, sort);
};

export const getAllResources = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Resources, filterByFormula, sort);
};

export const getTransactionById = async (id) => {
  return getRecordById(Tables.Transactions, id);
};

export const getTransactionsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Transactions, formula, sort);
};

export const getAllTransactions = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Transactions, filterByFormula, sort);
};

export const getLineItemById = async (id) => {
  return getRecordById(Tables.LineItems, id);
};

export const getLineItemsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.LineItems, formula, sort);
};

export const getAllLineItems = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.LineItems, filterByFormula, sort);
};

export const getPushTokenById = async (id) => {
  return getRecordById(Tables.PushTokens, id);
};

export const getPushTokensByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.PushTokens, formula, sort);
};

export const getAllPushTokens = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.PushTokens, filterByFormula, sort);
};

export const getNewById = async (id) => {
  return getRecordById(Tables.News, id);
};

export const getNewsByIds = async (ids, filterByFormula = '', sort = []) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.News, formula, sort);
};

export const getAllNews = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.News, filterByFormula, sort);
};

export const getRecipeById = async (id) => {
  return getRecordById(Tables.Recipes, id);
};

export const getRecipesByIds = async (ids, filterByFormula = '', sort = []) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Recipes, formula, sort);
};

export const getAllRecipes = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Recipes, filterByFormula, sort);
};

/*
 ******* UPDATE RECORDS *******
 */

export const updateCustomer = async (id, recordUpdates) => {
  return updateRecord(Tables.Customers, id, recordUpdates);
};

export const updateManyCustomers = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Customers, subset));
  }
  return Promise.all(updatePromises);
};

export const updateClerk = async (id, recordUpdates) => {
  return updateRecord(Tables.Clerks, id, recordUpdates);
};

export const updateManyClerks = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Clerks, subset));
  }
  return Promise.all(updatePromises);
};

export const updateStore = async (id, recordUpdates) => {
  return updateRecord(Tables.Stores, id, recordUpdates);
};

export const updateManyStores = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Stores, subset));
  }
  return Promise.all(updatePromises);
};

export const updateProduct = async (id, recordUpdates) => {
  return updateRecord(Tables.Products, id, recordUpdates);
};

export const updateManyProducts = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Products, subset));
  }
  return Promise.all(updatePromises);
};

export const updateResource = async (id, recordUpdates) => {
  return updateRecord(Tables.Resources, id, recordUpdates);
};

export const updateManyResources = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Resources, subset));
  }
  return Promise.all(updatePromises);
};

export const updateTransaction = async (id, recordUpdates) => {
  return updateRecord(Tables.Transactions, id, recordUpdates);
};

export const updateManyTransactions = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Transactions, subset));
  }
  return Promise.all(updatePromises);
};

export const updateLineItem = async (id, recordUpdates) => {
  return updateRecord(Tables.LineItems, id, recordUpdates);
};

export const updateManyLineItems = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.LineItems, subset));
  }
  return Promise.all(updatePromises);
};

export const updatePushToken = async (id, recordUpdates) => {
  return updateRecord(Tables.PushTokens, id, recordUpdates);
};

export const updateManyPushTokens = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.PushTokens, subset));
  }
  return Promise.all(updatePromises);
};

export const updateNew = async (id, recordUpdates) => {
  return updateRecord(Tables.News, id, recordUpdates);
};

export const updateManyNews = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.News, subset));
  }
  return Promise.all(updatePromises);
};

export const updateRecipe = async (id, recordUpdates) => {
  return updateRecord(Tables.Recipes, id, recordUpdates);
};

export const updateManyRecipes = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Recipes, subset));
  }
  return Promise.all(updatePromises);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteCustomer = async (id) => {
  return deleteRecord(Tables.Customers, id);
};
export const deleteClerk = async (id) => {
  return deleteRecord(Tables.Clerks, id);
};
export const deleteStore = async (id) => {
  return deleteRecord(Tables.Stores, id);
};
export const deleteProduct = async (id) => {
  return deleteRecord(Tables.Products, id);
};
export const deleteResource = async (id) => {
  return deleteRecord(Tables.Resources, id);
};
export const deleteTransaction = async (id) => {
  return deleteRecord(Tables.Transactions, id);
};
export const deleteLineItem = async (id) => {
  return deleteRecord(Tables.LineItems, id);
};
export const deletePushToken = async (id) => {
  return deleteRecord(Tables.PushTokens, id);
};
export const deleteNew = async (id) => {
  return deleteRecord(Tables.News, id);
};
export const deleteRecipe = async (id) => {
  return deleteRecord(Tables.Recipes, id);
};
