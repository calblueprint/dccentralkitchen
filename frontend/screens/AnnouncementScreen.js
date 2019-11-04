import Airtable from 'airtable';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Announcements from '../components/Announcements';
import { BASE } from '../lib/common';

const announceTable = BASE('Announcements').select({ view: 'Grid view' });
const first_announcements = [];
announceTable.eachPage(
  function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    // Grabs title, description, date, per record and stores it in list.
    records.forEach(function(record) {
      let this_date = new Date(record.get('Date'));
      let curr = {
        title: record.get('Title'),
        description: record.get('Description'),
        date: this_date,
        id: record.get('ID')
      };
      first_announcements.push(curr);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  },
  function done(err) {
    if (err) { console.error(err);  }
});

class AnnouncementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: first_announcements
    };
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
            <Text>Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
            <Text>Events</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.state.announcements.map(announce => (
            <Announcements
              key={announce.id}
              announcement={announce}
              navigation={this.props.navigation}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default AnnouncementScreen;
