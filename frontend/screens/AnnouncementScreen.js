import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Airtable from 'airtable';
import Announcements from '../components/Announcements'
import { Platform, StatusBar, StyleSheet, View } from 'react-native';


let base = new Airtable({apiKey: 'keyVrxZxSOUYHkz2e'}).base('app4fXK49bqcjDMEo');
const announceTable = base("Announcements").select({view: "Grid view"})
let first_announcements = [];
announceTable.eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        let curr = {title: record.get('Title'), description: record.get('Description'), date: record.get('Date')}
        first_announcements.push(curr)
        console.log('Retrieved', first_announcements[first_announcements.length - 1]);
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
            // Error :(
        });
        console.log(this.state.announcements)
    }

    render() {
        return (
          <View>
              {this.state.announcements.map(announce => <Announcements title = {announce.title} description = {announce.description} date = {announce.date} /> )}
          </View>
        )
    }
}

export default AnnouncementScreen