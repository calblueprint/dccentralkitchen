import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';
import * as Analytics from 'expo-firebase-analytics';
import convertDistance from 'geolib/es/convertDistance';
import getDistance from 'geolib/es/getDistance';
import { Alert } from 'react-native';
import { showLocation } from 'react-native-map-link';
import {
  daysOfTheWeek,
  daysOfTheWeekAbbrev,
  daysOfTheWeekFull,
  today,
} from '../constants/DaysOfTheWeek';
import { googlePlaceId } from '../constants/Map';
import RecordIds from '../constants/RecordIds';
import {
  getAllStores,
  getCustomerById,
  getProductsByIds,
  updateCustomer,
} from './airtable/request';
import { completeLogout, formatPhoneNumber } from './authUtils';
import { logErrorToSentry } from './logUtils';

// Takes in a string input hours and outputs a dictionary mapping
// each day of the week to the store hours for that day.
// e.g. hours = '7am-12am Daily' or '7am-12am Thurs-Sun, Closed Mon-Wed'
export function constructHoursDict(hours) {
  if (!hours) {
    return null;
  }

  const formattedHours = hours.replace('- ', '-').replace(' -', '-');

  const hoursStrSplit = formattedHours.split(' ');

  // Case: Hours are daily if there are only two strings
  // e.g. 8am-7pm Daily, 7am-12am Daily

  // We expect hoursPerDayDict to look like {'Sunday': '9am-9pm', 'Monday': '7am-12am', ...}
  const hoursPerDayDict = {};

  if (hoursStrSplit.length === 2 && hoursStrSplit.includes('Daily')) {
    const time = hoursStrSplit[0];

    daysOfTheWeekFull.forEach((day, _) => {
      hoursPerDayDict[day] = time;
    });
  }

  // Case: There exist different hours on certain days
  // e.g. 9am-8pm Tu-Sat, 9am-7pm Sun, Closed Mon
  else if (hoursStrSplit.length > 2) {
    // e.g. timeAndDayPairs = ['9am-8pm Tu-Sat', '9am-7pm Sun', ...]
    const timeAndDayPairs = formattedHours.split(', ');

    timeAndDayPairs.forEach((timeAndDayPair, _) => {
      // e.g. timeAndDaySplit = ['9am-8pm', 'Tu-Sat']
      const timeAndDaySplit = timeAndDayPair.split(' ');
      // e.g. 9am-8pm
      const time = timeAndDaySplit[0];
      // e.g. [Tu, Sat] or [Mon]
      const days = timeAndDaySplit[1].split('-');

      // Case: Time corresponds to one day
      if (days.length === 1) {
        hoursPerDayDict[daysOfTheWeek[days[0]]] = time;
      } else if (days.length === 2) {
        const firstDay = days[0].charAt(0).toUpperCase() + days[0].slice(1);
        const lastDay = days[1].charAt(0).toUpperCase() + days[1].slice(1);

        // ['Sun', 'Mon', 'Tues', ...]
        const indexFirstDay = daysOfTheWeekAbbrev.indexOf(firstDay);
        const indexLastDay = daysOfTheWeekAbbrev.indexOf(lastDay);

        let numDaysInInterval;

        if (indexLastDay > indexFirstDay) {
          // Case: Interval is Sun-Thurs, 0-4
          numDaysInInterval = indexLastDay - indexFirstDay + 1;
        } else {
          // Case: Interval is Thurs-Sun, 4-0
          numDaysInInterval = indexLastDay - indexFirstDay + 8;
        }

        [...Array(numDaysInInterval).keys()].forEach((i, _unused) => {
          const dayIndex = (indexFirstDay + i) % 7;
          hoursPerDayDict[daysOfTheWeekFull[dayIndex]] = time;
        });
      } else {
        // Shouldn't ever have a case with more than two days in an interval.
        console.log(
          '[mapUtils] constructHoursDict: Incorrect store hours formatting in Airtable.'
        );
      }
    });
  }
  // If the hours for that day are not available, set it as 'Closed'.
  daysOfTheWeekFull.forEach((day) => {
    if (!Object.keys(hoursPerDayDict).includes(day)) {
      hoursPerDayDict[day] = 'Closed';
    }
  });
  return hoursPerDayDict;
}

// Takes in the index representing today's day of the week
// and a dictionary mapping days to store hours. Returns a string
// indicating when the store will next be open.
function computeNextOpenDay(todaysDayIndex, hoursPerDayDict) {
  // The store is closed, so we need the next day and its opening time
  let nextDayIndex = (todaysDayIndex + 1) % 7;
  let nextDay = daysOfTheWeekFull[nextDayIndex];
  let nextDayStoreHours = hoursPerDayDict[nextDay];
  // Loop until next open day is found.
  // Case: All days are closed. We should limit to 7 loops.
  for (let i = 0; i < 7; i += 1) {
    if (nextDayStoreHours !== 'Closed') {
      const nextDayHoursSplit = nextDayStoreHours.split('-');
      const nextOpeningTime = nextDayHoursSplit[0]; // e.g. "8:30am"

      return `Closed until ${nextDay} ${nextOpeningTime}`.replace(
        '12am',
        'Midnight'
      );
    }
    nextDayIndex = (nextDayIndex + 1) % 7;
    nextDay = daysOfTheWeekFull[nextDayIndex];
    nextDayStoreHours = hoursPerDayDict[nextDay];
  }
  console.log(
    '[mapUtils] computeNextOpenDay: There was an issue getting the next open day'
  );
  return 'Store hours unavailable';
}

// Takes in a store's hours and returns a string indicating whether the
// store is currently open or when it will next open.
function computeStoreOpen(hours) {
  try {
    if (hours === 'Open 24/7' || hours === 'Store hours unavailable') {
      return hours;
    }

    // Case: Airtable doesn't contain hours for this store / cell is empty.
    if (!hours) {
      return 'Store hours unavailable';
    }

    // currentTime is minutes since 12am
    const currentTime = today.getHours() * 60 + today.getMinutes();

    const todaysDayIndex = today.getDay();
    const todaysDay = daysOfTheWeekFull[todaysDayIndex];

    const hoursPerDayDict = constructHoursDict(hours);

    // e.g. "8am-8pm"
    // e.g. "8:30am-8:30pm"
    // e.g. "Closed"
    const todaysStoreHours = hoursPerDayDict[todaysDay];
    // Valid store hours
    if (todaysStoreHours === 'Closed') {
      return computeNextOpenDay(todaysDayIndex, hoursPerDayDict);
    }
    const hoursSplit = todaysStoreHours.split('-');
    const openingTime = hoursSplit[0]; // e.g. "8:30am"
    const closingTime = hoursSplit[1]; // e.g. "8:30pm"

    const openingSuffix = openingTime.slice(-2).toLowerCase();
    const openingHourMin = openingTime.slice(0, -2);
    const openingHourMinSplit = openingHourMin.split(':');
    let openingHour = parseInt(openingHourMinSplit[0], 10);
    const openingMin =
      openingHourMinSplit.length > 1 ? parseInt(openingHourMinSplit[1], 10) : 0;

    const closingSuffix = closingTime.slice(-2).toLowerCase();
    const closingHourMin = closingTime.slice(0, -2);
    const closingHourMinSplit = closingHourMin.split(':'); // e.g. ["8", "30"]
    let closingHour = parseInt(closingHourMinSplit[0], 10);
    const closingMin =
      closingHourMinSplit.length > 1 ? parseInt(closingHourMinSplit[1], 10) : 0;

    // Edge case: 11pm-5am Daily (pm before am)
    // Also consider: Current time is before opening time but same day
    if (openingHour === 12 && openingSuffix === 'am') {
      openingHour -= 12;
    }

    // Convert to 24 hour time
    // e.g. 11pm = 23
    if (openingSuffix === 'pm') {
      openingHour += 12;
    }

    if (
      closingSuffix === 'pm' ||
      (closingHour === 12 && closingSuffix === 'am')
    ) {
      closingHour += 12;
    } else if (closingSuffix === 'am') {
      // e.g. 9am-3am Daily (closes the following day)
      closingHour += 24;
    }

    const convertedOpeningTime = openingHour * 60 + openingMin;
    const convertedClosingTime = closingHour * 60 + closingMin;

    // The store is still open today
    if (
      convertedOpeningTime <= currentTime &&
      currentTime <= convertedClosingTime
    ) {
      return `Open until ${closingTime}`.replace('12am', 'Midnight');
    }

    // Store is opening later
    if (currentTime < convertedOpeningTime) {
      return `Closed until today ${openingTime}`;
    }

    // The store is closed at this time, so we need the next day and its opening time
    return computeNextOpenDay(todaysDayIndex, hoursPerDayDict);
  } catch (err) {
    console.log('[mapUtils] computeStoreOpen: ', err);
    logErrorToSentry({
      action: 'computeNextOpenDay',
      error: err,
    });
    return 'Store hours unavailable';
  }
}
// Adds fields 'distance', 'storeOpenStatus' to store
// Adds necessary fields for filtering
function updateStoreData(record) {
  return {
    ...record,
    distance: null,
    zip: null,
    phoneNumber:
      'phoneNumber' in record ? formatPhoneNumber(record.phoneNumber) : '',
    // Gracefully handle stores without products
    productIds: 'productIds' in record ? record.productIds : [],
    // Pre-processing to add these properties to make filtering easier
    storeOpenStatus: computeStoreOpen(record.storeHours),
    productsInStock: 'productIds' in record,
    snapOrEbtAccepted: 'snapOrEbtAccepted' in record,
    wic: 'wic' in record,
    rewardsAccepted: 'rewardsAccepted' in record,
  };
}

// Adds field 'imageUrl' to products
function updateProductData(record) {
  return { ...record, imageUrl: record.image ? record.image[0].url : null };
}

// Gets all records in Airtable from the Stores table
// Returns a promise that resolves to an array of Store objects
export async function getStoreData(filterByFormula = '') {
  const records = await getAllStores(filterByFormula);
  // Filter out stores marked as Do Not Display
  const stores = records
    .filter((record) => record.id && !record.doNotDisplay)
    .map(updateStoreData);
  return stores;
}

// Gets all products for this store using linked records in Store table from Products table
export async function getProductData(store) {
  const records = await getProductsByIds(store.productIds);
  const storeProducts = records.map(updateProductData);
  return storeProducts;
}

// Necessary to take into account different screen sizes
// 32px: Width of left and right margins
// 12px: Extra space for padding between items
// 30px: Width of info button + padding
export const getMaxWidth = function sync(screenWidth) {
  return screenWidth - 32 - 12 - 30;
};

export function writeToClipboard(string) {
  Analytics.logEvent('write_to_clipboard', {
    content: string,
    purpose: 'Copy phone nubmer or address to clipboard',
  });
  Clipboard.setString(string);
  Alert.alert('Copied to Clipboard!', string);
}

export function openDirections(latitude, longitude, storeName) {
  Analytics.logEvent('click_directions', {
    store_name: storeName,
  });
  showLocation({
    latitude,
    longitude,
    title: storeName,
    googleForceLatLon: true,
    googlePlaceId,
    alwaysIncludeGoogle: true,
  });
}

// Find the distance between 2 points
export function findDistance(pointA, pointB) {
  const distanceMeters = getDistance(pointA, pointB);
  // Convert distance to 'x.xx' form, in miles units
  const distance = convertDistance(distanceMeters, 'mi').toFixed(2);
  return distance;
}

// TODO: @wangannie clean up
export async function toggleFavoriteStore(navigation, storeId) {
  const customerId = await AsyncStorage.getItem('customerId');
  const guest = customerId === RecordIds.guestCustomerId;
  let success = false;
  if (guest) {
    Alert.alert(
      'Account Required',
      'Log in or create an account to favorite stores and get alerts about new deliveries',
      [
        {
          text: 'Log in or create an account',
          onPress: async () => completeLogout(navigation, true),
        },
        { text: 'Not now', onPress: async () => null },
      ]
    );
  } else {
    const cust = await getCustomerById(customerId);
    let favoriteStores = cust.favoriteStoreIds || [];

    if (favoriteStores.includes(storeId)) {
      // Un-favorite a store
      favoriteStores = favoriteStores.filter((store) => store !== storeId);
    } else {
      // Favorite a store
      favoriteStores.push(storeId);
      if (!cust.notifications) {
        Alert.alert(
          'Get updates on your favorite stores',
          'Enable notifications to be alerted when your favorite stores receive deliveries!',
          [
            { text: 'Not now', style: 'cancel', onPress: async () => null },
            {
              text: 'Enable notifications',
              style: 'default',
              onPress: async () => navigation.navigate('Settings'), // TODO: link to specific page in settings
            },
          ]
        );
      }
    }
    await updateCustomer(customerId, {
      favoriteStoreIds: favoriteStores,
    });
    success = true;
  }
  return success;
}

// Checks if a store is one of the customer's favorites
// TODO @wangannie rename
export async function isFavoritefromCustomer(storeId) {
  const customerId = await AsyncStorage.getItem('customerId');
  const cust = await getCustomerById(customerId);
  const favoriteStores = cust.favoriteStoreIds || [];
  return favoriteStores.includes(storeId);
}
