import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { daysOfTheWeekFull, today } from '../../constants/DaysOfTheWeek';
import { constructHoursDict } from '../../lib/mapUtils';
import { Body } from '../BaseComponents';

/**
 * @prop
 * */

export default function StoreHours({ hours }) {
  // e.g. hours = "8:30am-8:30pm Mon-Sat"

  const todaysDayIndex = today.getDay();
  const todaysDay = daysOfTheWeekFull[todaysDayIndex];

  const hoursList = (dictHours) => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Days of the week */}
        <View style={{ width: '40%' }}>
          {daysOfTheWeekFull.map((day, _) => {
            return (
              <Body
                bold={day === todaysDay}
                color={day !== todaysDay && Colors.secondaryText}
                key={day}>
                {day}
              </Body>
            );
          })}
        </View>
        <View style={{ width: '60%' }}>
          {daysOfTheWeekFull.map((day, _) => {
            return (
              <Body
                bold={day === todaysDay}
                color={day !== todaysDay && Colors.secondaryText}
                key={day}>
                {dictHours[day].replace('12am', 'Midnight')}
              </Body>
            );
          })}
        </View>
      </View>
    );
  };

  const parseHours = () => {
    // Case: hours = "Open 24/7"
    if (
      hours === 'Open 24/7' ||
      hours === 'Store hours unavailable' ||
      !hours
    ) {
      return null;
    }

    const hoursPerDayDict = constructHoursDict(hours);

    if (hoursPerDayDict && Object.keys(hoursPerDayDict).length > 0) {
      return hoursList(hoursPerDayDict);
    }
    return <Body>Store hours unavailable</Body>;
  };

  return parseHours();
}

StoreHours.propTypes = {
  hours: PropTypes.string,
};
