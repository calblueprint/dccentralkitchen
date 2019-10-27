import React from 'react';
import Airtable from 'airtable';
import Announcements from '../components/Announcements'
import {
    ScrollView,
    View,TouchableOpacity,Text,
} from 'react-native';


//call Airtable
let base = new Airtable({apiKey: 'keynDN2jVflxnkEmY'}).base('app4fXK49bqcjDMEo');
const announceTable = base("Announcements").select({view: "Grid view"})
let first_announcements = [];
announceTable.eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    //Grabs title, description, date,
    records.forEach(function(record) {
        let this_date = new Date(record.get('Date'))
        let curr = {title: record.get('Title'), description: record.get('Description'), date: this_date, id: record.get('')}
        first_announcements.push(curr)
        console.log('Retrieved', typeof curr.date);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

class AnnouncementScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            announcements: first_announcements,
        }
    }

    async get() {
        await fetch('https://api.airtable.com/v0/app4fXK49bqcjDMEo/Announcements?api_key=keyVrxZxSOUYHkz2e')
            .then((resp) => resp.json())
            .then(data => {
                this.setState({ announcements:data.records });
            }).catch(err => {
        });
        console.log(this.state.announcements)
    }

    render() {
        return (
          <View>
              <View style={{flexDirection: 'row',}}>
                  <TouchableOpacity style={{flex: 1, alignItems: 'center',}} >
                      <Text>
                          Inbox
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, alignItems: 'center',}}>
                      <Text>
                          Events
                      </Text>
                  </TouchableOpacity>
              </View>
              <ScrollView >
              {this.state.announcements.map(announce => <Announcements announcement = {announce}
                                                                       navigation = {this.props.navigation}/> )}
              </ScrollView>
          </View>
        )
    }
}

export default AnnouncementScreen