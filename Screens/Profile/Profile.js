import React, {Component} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Text } from 'react-native';
import Constants from 'expo-constants';

import TimeSheetCell from '../Cells/TimeSheetCell'

const timeSheet = [
    {day: "Day", date: "Date", start: "Start", end: "End", total: "Total"},
    {day: "Monday", date: "18/04/2020", start: "10:00", end: "15:00", total: 5},
    {day: "Tuesday", date: "19/04/2020", start: "07:00", end: "12:00", total: 5},
    {day: "Wednesday", date: "20/04/2020", start: "15:00", end: "21:00", total: 6},
    {day: "Thursday", date: "21/04/2020", start: "10:00", end: "15:00", total: 5},
    {day: "Friday", date: "22/04/2020", start: "17:00", end: "23:00", total: 6},
    {day: "Saturday", date: "23/04/2020", start: "10:00", end: "15:00", total: 5},
    {day: "Sunday", date: "24/04/2020", start: "07:00", end: "11:00", total: 4},
]

export default class Profile extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <SafeAreaView style = { styles.container} >
                <View style = {styles.headerMenu}>
                    <Text>Profile header </Text>
                    <Text>Schedule </Text>
                </View>
                <FlatList
                    data={timeSheet}
                    numColumns = {1}
                    renderItem={({ item }) => <TimeSheetCell sheetItem = {item}/> }
                    keyExtractor={item => item.id}
                    contentContainerStyle = {{marginHorizontal: 16, borderWidth: 1}}
                />
            </SafeAreaView>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    headerMenu: {
        marginVertical: 10,
        justifyContent: 'center',
        marginHorizontal: 16
    },
})