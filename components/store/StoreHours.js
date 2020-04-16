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
          {dictHours.map(day => (
            <StoreDetailText>{day}</StoreDetailText>
          ))}
        </View>
        <View>
          {dictHours.map(day => (
            <StoreDetailText>{dictHours[day]}</StoreDetailText>
          ))}
        </View>
      </View>
    );
  };

  const parseHours = () => {
    // hours = "Open 24/7"
    if (hours == 'Open 24/7') {
      return open247;
    }

    const hoursStrSplit = hours.split(' ');

    // hours are daily if there are only two strings
    // e.g. 8am-7pm Daily, 7am-Midnight Daily

    const hoursPerDayDict = {};

    if (hoursStrSplit.length == 2 && hoursStrSplit.includes('Daily')) {
      const time = hoursStrSplit[0];

      daysOfTheWeek.map(abbrev => {
        const day = daysOfTheWeek[abbrev];
        hoursPerDayDict[day] = time;
      });
    }

    // specific hours per day
    // e.g. 9am-8pm Tu-Sat, 9am-7pm Sun, Closed Mon
    else if (hoursStrSplit.length > 2) {
      // interval = 9am-8pm Tu-Sat
      const hoursCommaSplit = hours.split(', ');
      for (let interval in hoursCommaSplit) {
        const hourAndDays = interval.split(' ');
        const hour = hourAndDays[0];

        // e.g. ['Mon'] or ['Tu', 'Sat']
        const days = hourAndDays[1].split('-');
        // e.g. Sun or Mon
        for (let day in days) {
          hoursPerDayDict[day] = hour;
        }
      }
    }
    return hoursList(hoursPerDayDict);
  };
}
