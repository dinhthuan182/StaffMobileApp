import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Icons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import { useAuth } from "../../Providers/Auth";

import * as api from '../../Services/Auth';
import * as profileApi from '../../Services/Profile';

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

export default function Profile(props) {
    const {state, handleLogout} = useAuth();
    const {isLoggedIn, user} = state;

    const [timeSpace, setTimeSpace] = useState(`${moment().startOf('isoWeek').format('DD')} - ${moment().endOf('isoWeek').format('DD/MM/YYYY')}`);
    const [numsOfWeek, setNumsOfWeek] = useState(0)

    useEffect(() => { 
        getSchedules();
    }, [numsOfWeek]);

    const getSchedules = ()=> {
        if (numsOfWeek > 0) {
            const schedules = profileApi.getSchedules(user.id, moment().subtract(numsOfWeek, 'weeks').startOf('isoWeek').format('DD-MM-YYYY'), moment().subtract(numsOfWeek, 'weeks').endOf('isoWeek').format('DD-MM-YYYY'));
            setTimeSpace(`${moment().subtract(numsOfWeek, 'weeks').startOf('isoWeek').format('DD')} - ${moment().subtract(numsOfWeek, 'weeks').endOf('isoWeek').format('DD/MM/YYYY')}`);
        } else {
            const schedules = profileApi.getSchedules(user.id, moment().startOf('isoWeek').format('DD-MM-YYYY'), moment().endOf('isoWeek').format('DD-MM-YYYY'));
            setTimeSpace(`${moment().startOf('isoWeek').format('DD')} - ${moment().endOf('isoWeek').format('DD/MM/YYYY')}`);
        }
    }

    const beforeWeek = () => {
        setNumsOfWeek(numsOfWeek+1);
    }

    const afterWeek = () => {
        if (numsOfWeek > 1) {
            setNumsOfWeek(numsOfWeek-1);
        } else {
            setNumsOfWeek(0);
        }
        
    }

    return (
        <SafeAreaView style = { styles.container} >
            
            {isLoggedIn ? ( 
                <View style = {styles.headerProfile}>
                    <Text style = {styles.UsernameText}>{user.name}</Text>
                    <Text style = {styles.roleText}>{user.role}</Text>
                </View>
                ) : (null)
            } 
            
            <Text style = {styles.timeSheetTitle}>Schedule</Text>
            <View style = {styles.timeLineView}>
                <TouchableWithoutFeedback
                    onPress = {() => beforeWeek()}>
                    <Icons name = {'caretleft'}
                        size = {20}
                        color = {'rgb(104, 104, 104)'} />
                </TouchableWithoutFeedback>
                <Text style = {styles.timeLineText}>{timeSpace}</Text>
                <TouchableWithoutFeedback
                    onPress = {() => afterWeek()}>
                    
                    <Icons name = {'caretright'}
                    size = {20}
                    color = {'rgb(104, 104, 104)'} />
                </TouchableWithoutFeedback>
                
            </View>
            <FlatList
                data={timeSheet}
                scrollEnabled = {false}
                numColumns = {1}
                renderItem={({ item }) => <TimeSheetCell sheetItem = {item}/> }
                keyExtractor={item => item.day}
                contentContainerStyle = {{marginHorizontal: 8, borderWidth: 1}}
            />

            <View style = {styles.footer}>
                <TouchableOpacity 
                    onPress={() => {
                        api.logout();
                        handleLogout();
                    }}
                    style = {styles.logoutView}>
                    <Icons name = {'logout'}
                    size = {20}
                    color = {'rgb(104, 104, 104)'} />
                    <Text style = {styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
    },
    headerProfile: {
        width: '100%',
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
    },
    logoutView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 18,
        color:'rgb(104, 104, 104)',
        marginLeft: 10
    },
    footer: {
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
})