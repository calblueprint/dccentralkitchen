import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { constructHoursDict } from '../../lib/mapUtils';
import { Body, TabSelected } from '../BaseComponents';

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

  const daysOfTheWeekFull = Object.values(daysOfTheWeek);

  const today = new Date();
  const todaysDayIndex = today.getDay();
  const todaysDay = daysOfTheWeekFull[todaysDayIndex];

  const hoursList = dictHours => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Days of the week */}
        <View style={{ width: '50%' }}>
          {daysOfTheWeekFull.map((day, _) => {
            if (day === todaysDay) {
              return <TabSelected>{day}</TabSelected>;
            }
            return <Body color={Colors.secondaryText}>{day}</Body>;
          })}
        </View>
        <View style={{ width: '50%' }}>
          {daysOfTheWeekFull.map((day, _) => {
            if (day == todaysDay) {
              return <TabSelected>{dictHours[day]}</TabSelected>;
            }
            return <Body color={Colors.secondaryText}>{dictHours[day]}</Body>;
          })}
        </View>
      </View>
    );
  };

  const parseHours = () => {
    // Case: hours = "Open 24/7"
    if (hours === 'Open 24/7') {
      return <Body color={Colors.primaryGreen}>{hours}</Body>;
    }

    if (hours === 'Store hours unavailable') {
      return <Body>{hours}</Body>;
    }

    const hoursPerDayDict = constructHoursDict(hours);

    if (Object.keys(hoursPerDayDict).length > 0) {
      return hoursList(hoursPerDayDict);
    }
    console.log(
      '[Storehours] parseHours: Issue parsing store hours. Hours were: ',
      hours
    );
    return <Body>Store hours unavailable</Body>;
  };

  return parseHours();
}

StoreHours.propTypes = {
  hours: PropTypes.string,
};
