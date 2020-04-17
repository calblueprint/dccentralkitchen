import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { StoreDetailText } from '../../styled/store';

/**
 * @prop
 * */

export default function StoreHours(hours) {
  // e.g. hours = "8:30am-8:30pm Mon-Sat"

  const daysOfTheWeek = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tu: 'Tuesday',
    Wed: 'Wednesday',
    Thurs: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
  };

  const open247 = (
    <StoreDetailText color={Colors.primaryGreen}>Open 24/7</StoreDetailText>
  );

  const hoursList = dictHours => {
    return (
      <View style={{ display: 'flex' }}>
        {/* Days of the week */}
        <View>
          {daysOfTheWeek.values().map(day => (
            <StoreDetailText>{day}</StoreDetailText>
          ))}
        </View>
        <View>
          {daysOfTheWeek.values().map(day => (
            <StoreDetailText>{dictHours[day]}</StoreDetailText>
          ))}
        </View>
      </View>
    );
  };

  const parseHours = () => {
    // Case: hours = "Open 24/7"
    if (hours == 'Open 24/7') {
      return open247;
    }

    const hoursStrSplit = hours.split(' ');

    // Case: Hours are daily if there are only two strings
    // e.g. 8am-7pm Daily, 7am-Midnight Daily

    // We expect hoursPerDayDict to look like {'Sunday': '9am-9pm', 'Monday: '7am-12am', ...}
    const hoursPerDayDict = {};

    if (hoursStrSplit.length == 2 && hoursStrSplit.includes('Daily')) {
      const time = hoursStrSplit[0];

      daysOfTheWeek.map(abbrev => {
        const day = daysOfTheWeek[abbrev];
        hoursPerDayDict[day] = time;
      });
    }

    // Case: There exist different hours on certain days
    // e.g. 9am-8pm Tu-Sat, 9am-7pm Sun, Closed Mon
    else if (hoursStrSplit.length > 2) {
      // e.g. timeAndDayPairs = ['9am-8pm Tu-Sat', '9am-7pm Sun', ...]
      const timeAndDayPairs = hours.split(', ');

      timeAndDayPairs.map(timeAndDayPair => {
        // e.g. timeAndDaySplit = ['9am-8pm', 'Tu-Sat']
        const timeAndDaySplit = timeAndDayPair.split(' ');
        // e.g. 9am-8pm
        const time = timeAndDaySplit[0];
        // e.g. [Tu, Sat] or [Mon]
        const days = timeAndDaySplit[1].split('-');

        // Case: Time corresponds to one day
        if (days.length == 1) {
          hoursPerDayDict[days[0]] = time;
        } else if (days.length == 2) {
          const firstDay = days[0];
          const lastDay = days[1];

          // ['Sun', 'Mon', 'Tues', ...]
          const daysOfTheWeekAbbrev = Object.keys(daysOfTheWeek);
          const daysOfTheWeekNames = Object.values(daysOfTheWeek);
          const indexFirstDay = daysOfTheWeekAbbrev.indexOf(firstDay);
          const indexLastDay = daysOfTheWeekAbbrev.indexOf(lastDay);

          const numDaysInInterval = indexLastDay - indexFirstDay;
          // Case: Interval is Sun-Thurs, 0-4
          // Case: Interval is Thurs-Sun, 4-0
          [...Array(numDaysInInterval).keys()].map(i => {
            const dayIndex = (indexFirstDay + i) % 7;
            hoursPerDayDict[daysOfTheWeekNames[dayIndex]] = time;
          });
        } else {
          // Shouldn't ever have a case with more than two days in an interval.
          console.error(
            '[StoreHours] parseHours: Incorrect store hours formatting in Airtable.'
          );
        }
      });
      return hoursList(hoursPerDayDict);
    }
  };

  return parseHours();
}
