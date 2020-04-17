import {
  daysOfTheWeek,
  daysOfTheWeekAbbrev,
  daysOfTheWeekFull,
} from '../constants/DaysOfTheWeek';
import { getAllStores, getProductsByIds } from './airtable/request';

// Adds field 'distance' to stores
function updateStoreData(record) {
  return { ...record, distance: null };
}

// Adds field 'imageUrl' to products
function updateProductData(record) {
  return { ...record, imageUrl: record.image ? record.image[0].url : null };
}

// Gets all records in Airtable from the Stores table
// Returns a promise that resolves to an array of Store objects
export async function getStoreData() {
  const records = await getAllStores();
  // Filter out the Clerk Training {PROD, DEV} store
  const stores = records
    .filter(
      record =>
        record.id !== 'recq6630DixVw63un' && record.id !== 'reck65q6wsvyQvnLf'
    )
    .map(updateStoreData);
  return stores;
}

// Gets all products for this store using linked records in Store table from Products table
export async function getProductData(store) {
  // Gracefully handle stores without products
  if (!('productIds' in store)) {
    return [];
  }
  const records = await getProductsByIds(store.productIds);
  const storeProducts = records.map(updateProductData);
  return storeProducts;
}

// Necessary to take into account different screen sizes
// 32px: Width of left and right margins
// 12px: Extra space for padding between items
// 130px: Size of 'See Products' button
// 48px: Size of EBTBar
export const getMaxWidth = function sync(screenWidth, ebt, seeProducts) {
  return screenWidth - 32 - 12 + (ebt ? -48 : 0) + (seeProducts ? -130 : 0);
};

// Takes in a string input hours and outputs a dictionary mapping
// each day of the week to the store hours for that day.
// e.g. hours = '7am-12am Daily' or '7am-12am Thurs-Sun, Closed Mon-Wed'
export function constructHoursDict(hours) {
  if (!hours) {
    return null;
  }

  const formattedHours = hours
    .replace('- ', '-')
    .replace(' -', '-')
    .replace('12am', 'Midnight');

  const hoursStrSplit = formattedHours.split(' ');

  // Case: Hours are daily if there are only two strings
  // e.g. 8am-7pm Daily, 7am-Midnight Daily

  // We expect hoursPerDayDict to look like {'Sunday': '9am-9pm', 'Monday': '7am-12am', ...}
  const hoursPerDayDict = {};

  if (hoursStrSplit.length === 2 && hoursStrSplit.includes('Daily')) {
    const time = hoursStrSplit[0];

    daysOfTheWeekFull.map((day, _) => {
      hoursPerDayDict[day] = time;
    });
  }

  // Case: There exist different hours on certain days
  // e.g. 9am-8pm Tu-Sat, 9am-7pm Sun, Closed Mon
  else if (hoursStrSplit.length > 2) {
    // e.g. timeAndDayPairs = ['9am-8pm Tu-Sat', '9am-7pm Sun', ...]
    const timeAndDayPairs = formattedHours.split(', ');

    timeAndDayPairs.map((timeAndDayPair, _) => {
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

        [...Array(numDaysInInterval).keys()].map((i, _) => {
          const dayIndex = (indexFirstDay + i) % 7;
          hoursPerDayDict[daysOfTheWeekFull[dayIndex]] = time;
        });
      } else {
        // Shouldn't ever have a case with more than two days in an interval.
        console.log(
          '[mapUtils] constructHoursDict: Incorrect store hours formatting in Airtable.'
        );
        return null;
      }
    });
  }
  // If the hours for that day are not available, set it as 'Closed'.
  daysOfTheWeekFull.map(day => {
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
  let tmrwDayIndex = (todaysDayIndex + 1) % 7;
  let tmrwDay = daysOfTheWeekFull[tmrwDayIndex];
  let tmrwStoreHours = hoursPerDayDict[tmrwDay];
  // Loop until next open day is found.
  while (tmrwStoreHours === 'Closed') {
    tmrwDayIndex = (tmrwDayIndex + 1) % 7;
    tmrwDay = daysOfTheWeekFull[tmrwDayIndex];
    tmrwStoreHours = hoursPerDayDict[tmrwDay];
  }
  const tmrwHoursSplit = tmrwStoreHours.split('-');
  const tmrwOpeningTime = tmrwHoursSplit[0]; // e.g. "8:30am"

  return 'Closed until '
    .concat(tmrwDay)
    .concat(' ')
    .concat(tmrwOpeningTime);
}

// Takes in a store's hours and returns a string indicating whether the
// store is currently open or when it will next open.
export function computeStoreOpen(hours) {
  if (hours === 'Open 24/7' || hours === 'Store hours unavailable') {
    return hours;
  }

  const today = new Date();
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

  const openingSuffix = openingTime.slice(-2);
  const openingHourMin = openingTime.slice(0, -2);
  const openingHourMinSplit = openingHourMin.split(':');
  let openingHour = parseInt(openingHourMinSplit[0], 10);
  const openingMin =
    openingHourMinSplit.length > 1 ? parseInt(openingHourMinSplit[1], 10) : 0;

  const closingSuffix = closingTime.slice(-2);
  const closingHourMin = closingTime.slice(0, -2);
  const closingHourMinSplit = closingHourMin.split(':'); // e.g. ["8", "30"]
  let closingHour = parseInt(closingHourMinSplit[0], 10);
  const closingMin =
    closingHourMinSplit.length > 1 ? parseInt(closingHourMinSplit[1], 10) : 0;

  // Convert to 24 hour time
  if (openingSuffix.toLowerCase() === 'pm') {
    openingHour += 12;
  }

  if (closingSuffix.toLowerCase() === 'pm') {
    closingHour += 12;
  }

  const convertedOpeningTime = openingHour * 60 + openingMin;
  const convertedClosingTime = closingHour * 60 + closingMin;

  // The store is still open today
  if (
    convertedOpeningTime <= currentTime &&
    currentTime <= convertedClosingTime
  ) {
    return 'Open now until '.concat(closingTime);
  }

  // The store is closed at this time, so we need the next day and its opening time
  return computeNextOpenDay(todaysDayIndex, hoursPerDayDict);
}
