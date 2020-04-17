import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { StoreDetailText } from '../../styled/store';

/**
 * @prop
 * */

export default function StoreHours({ hours }) {
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

  const daysOfTheWeekAbbrev = Object.keys(daysOfTheWeek);
  const daysOfTheWeekFull = Object.values(daysOfTheWeek);

  const hoursList = dictHours => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Days of the week */}
        <View style={{ width: '50%' }}>
          {daysOfTheWeekFull.map((day, _) => (
            <StoreDetailText>{day}</StoreDetailText>
          ))}
        </View>
        <View style={{ width: '50%' }}>
          {daysOfTheWeekFull.map((day, _) => (
            <StoreDetailText>{dictHours[day]}</StoreDetailText>
          ))}
        </View>
      </View>
    );
  };

  const parseHours = () => {
    // Case: hours = "Open 24/7"
    if (hours === 'Open 24/7') {
      return (
        <StoreDetailText color={Colors.primaryGreen}>{hours}</StoreDetailText>
      );
    }

    if (hours === 'Store hours unavailable') {
      return <StoreDetailText>{hours}</StoreDetailText>;
    }

    const hoursStrSplit = hours.split(' ');

    // Case: Hours are daily if there are only two strings
    // e.g. 8am-7pm Daily, 7am-Midnight Daily

    // We expect hoursPerDayDict to look like {'Sunday': '9am-9pm', 'Monday: '7am-12am', ...}
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
      const timeAndDayPairs = hours.split(', ');

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
          const firstDay = days[0];
          const lastDay = days[1];

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
          console.error(
            '[StoreHours] parseHours: Incorrect store hours formatting in Airtable.'
          );
        }
      });
    }

    // TODO: Should we console log an unforeseen error parsing but not completely
    // error out the app, or should we just console.error

    if (Object.keys(hoursPerDayDict).length > 0) {
      return hoursList(hoursPerDayDict);
    }
    console.log(
      '[Storehours] parseHours: Issue parsing store hours. Hours were: ',
      hours
    );
    return <StoreDetailText>Store hours unavailable</StoreDetailText>;
  };

  return parseHours();
}

StoreHours.propTypes = {
  hours: PropTypes.string,
};
