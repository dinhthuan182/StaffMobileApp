import React, {Component} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Text, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import Icons from 'react-native-vector-icons/AntDesign'

import TimeSheetCell from '../Cells/TimeSheetCell'

const timeSheet = [
    {day: "Day", date: "Date", start: "Start", end: "End", total: "Total", header: true},
    {day: "Monday", date: "18/04/2020", start: "10:00", end: "15:00", total: 5},
    {day: "Tuesday", date: "19/04/2020", start: "07:00", end: "12:00", total: 5},
    {day: "Wednesday", date: "20/04/2020"},
    {day: "Thursday", date: "21/04/2020", start: "10:00", end: "15:00", total: 5},
    {day: "Friday", date: "22/04/2020"},
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
                <View style = {styles.headerProfile}>
                    <Text style = {styles.UsernameText}>Vu Dinh Thuan</Text>
                    <Text style = {styles.roleText}>Staff</Text>
                </View>
                <Text style = {styles.timeSheetTitle}>Schedule</Text>
                <View style = {styles.timeLineView}>
                    <TouchableWithoutFeedback>
                        <Icons name = {'caretleft'}
                            size = {20}
                            color = {'rgb(104, 104, 104)'} />
                    </TouchableWithoutFeedback>
                    <Text style = {styles.timeLineText}>18 - 24/04/2020</Text>
                    <TouchableWithoutFeedback>
                        <Icons name = {'caretright'}
                        size = {20}
                        color = {'rgb(104, 104, 104)'} />
                    </TouchableWithoutFeedback>
                    
                </View>
                <FlatList
                    data={timeSheet}
                    numColumns = {1}
                    renderItem={({ item }) => <TimeSheetCell sheetItem = {item}/> }
                    keyExtractor={item => item.id}
                    contentContainerStyle = {{marginHorizontal: 8, borderWidth: 1}}
                />
            </SafeAreaView>
        );
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center'
    },
    headerProfile: {
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    UsernameText: {
        fontSize: 30
    },
    roleText: {
        fontSize: 20,
        fontStyle: 'italic'
    },
    timeSheetTitle: {
        fontSize: 25,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    timeLineView: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
    timeLineText: {
        fontSize: 19,
        paddingHorizontal: 10
    }
})