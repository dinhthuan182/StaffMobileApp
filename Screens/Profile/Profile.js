import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import { useAuth } from "../../Providers/Auth";

import * as api from '../../Services/Auth';
import * as profileApi from '../../Services/Profile';

import TimeSheetCell from '../Cells/TimeSheetCell'

export default function Profile(props) {
    const {state, handleLogout} = useAuth();
    const {isLoggedIn, user} = state;

    const [timeSheet, setTimeSheet] = useState([]);
    const [startDay, setStartDay] = useState('');
    const [EndDate, setEndDate] = useState(``);
    const [numsOfWeek, setNumsOfWeek] = useState(0)

    useEffect(() => { 
        props.navigation.setParams({ logout: logout});
        getSchedules();
    }, [numsOfWeek]);

    const logout = async () => {
        await api.logout();
        await handleLogout();
    }

    const getSchedules = async ()=> {
        if (numsOfWeek > 0) {
            const schedules = await profileApi.getSchedules(user.id, moment().subtract(numsOfWeek, 'weeks').startOf('isoWeek').format('DD-MM-YYYY'), moment().subtract(numsOfWeek, 'weeks').endOf('isoWeek').format('DD-MM-YYYY'));
            if (schedules != null) {
                setTimeSheet(schedules);
                setEndDate(`${moment().subtract(numsOfWeek, 'weeks').endOf('isoWeek').format('DD-MM-YYYY')}`);
                setStartDay(`${moment().subtract(numsOfWeek, 'weeks').startOf('isoWeek').format('DD-MM')}`);
            }
        }else if (numsOfWeek == -1){
            const schedules = await profileApi.getSchedules(user.id, moment().add(1, 'weeks').startOf('isoWeek').format('DD-MM-YYYY'), moment().add(1, 'weeks').endOf('isoWeek').format('DD-MM-YYYY'));
            if (schedules != null) {
                setTimeSheet(schedules);
                setEndDate(`${moment().add(1, 'weeks').endOf('isoWeek').format('DD-MM-YYYY')}`);
                setStartDay(`${moment().add(1, 'weeks').startOf('isoWeek').format('DD-MM')}`);
            }
        } else {
            const schedules = await profileApi.getSchedules(user.id, moment().startOf('isoWeek').format('DD-MM-YYYY'), moment().endOf('isoWeek').format('DD-MM-YYYY'));
            if (schedules != null) {
                setTimeSheet(schedules);
                setEndDate(`${moment().endOf('isoWeek').format('DD-MM-YYYY')}`);
                setStartDay(`${moment().startOf('isoWeek').format('DD-MM')}`);
            }
        }
    }

    const beforeWeek = () => {
        setNumsOfWeek(numsOfWeek+1);
    }

    const afterWeek = () => {
        if (numsOfWeek >= 1) {
            setNumsOfWeek(numsOfWeek-1);
        } else {
            setNumsOfWeek(-1);
        }
        
    }

    if (isLoggedIn) {
        return (
            <SafeAreaView style = { styles.container} >
                
                <View style = {styles.headerProfile}>
                    <Text style = {styles.UsernameText}>{user.name}</Text>
                    <Text style = {styles.roleText}>{user.role}</Text>
                </View>
                
                <Text style = {styles.timeSheetTitle}>Schedule</Text>
                <View style = {styles.timeLineView}>
                    <TouchableWithoutFeedback
                        onPress = {() => beforeWeek()}>
                        <Icons name = {'caretleft'}
                            size = {20}
                            color = {'rgb(104, 104, 104)'} />
                    </TouchableWithoutFeedback>

                    <Text style = {styles.timeLineText}>
                        <Text>{startDay} </Text>
                        <Icons name = {'arrowright'}
                            size = {18}
                            color = {'rgb(104, 104, 104)'} />
                        <Text> {EndDate}</Text>
                    </Text>
                    
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
                    contentContainerStyle = {{ borderWidth: 1}}
                />
            </SafeAreaView>
        ); 
    } else {
        return (
            <SafeAreaView style = { styles.container} >
            </SafeAreaView>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headerProfile: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    UsernameText: {
        fontSize: 28
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
})