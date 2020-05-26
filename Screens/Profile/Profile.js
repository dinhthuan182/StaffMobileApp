import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import { useAuth } from "../../Providers/Auth";
import Splash from '../Splash';

import * as api from '../../Services/Auth';
import * as profileApi from '../../Services/Profile';

import TimeSheetCell from '../Cells/TimeSheetCell'

export default function Profile(props) {
    const {state, handleLogout} = useAuth();
    const {isLoggedIn, user} = state;

    const [timeSheet, setTimeSheet] = useState([]);
    const [totalHour, setTotalHour] = useState(0)
    const [startDay, setStartDay] = useState('');
    const [EndDate, setEndDate] = useState(``);
    const [numsOfWeek, setNumsOfWeek] = useState(0)
    const [isLoading, setLoading] = useState(false);

    useEffect(() => { 
        props.navigation.setParams({ logout: logout});
        getSchedules();
    }, [numsOfWeek]);

    const logout = async () => {
        await api.logout();
        await handleLogout();
    }

    const getSchedules = async ()=> {
        setLoading(true)
        if (numsOfWeek > 0) {
            const schedules = await profileApi.getSchedules(user.id, moment().subtract(numsOfWeek, 'weeks').startOf('isoWeek').format('DD-MM-YYYY'), moment().subtract(numsOfWeek, 'weeks').endOf('isoWeek').format('DD-MM-YYYY'));
            if (schedules != null) {
                setTimeSheet(schedules[0]);
                setTotalHour(schedules[1])
                setEndDate(`${moment().subtract(numsOfWeek, 'weeks').endOf('isoWeek').format('DD/MM/YYYY')}`);
                setStartDay(`${moment().subtract(numsOfWeek, 'weeks').startOf('isoWeek').format('DD/MM')}`);
            }
        }else if (numsOfWeek == -1){
            const schedules = await profileApi.getSchedules(user.id, moment().add(1, 'weeks').startOf('isoWeek').format('DD-MM-YYYY'), moment().add(1, 'weeks').endOf('isoWeek').format('DD-MM-YYYY'));
            if (schedules != null) {
                setTimeSheet(schedules[0]);
                setTotalHour(schedules[1])
                setEndDate(`${moment().add(1, 'weeks').endOf('isoWeek').format('DD/MM/YYYY')}`);
                setStartDay(`${moment().add(1, 'weeks').startOf('isoWeek').format('DD/MM')}`);
            }
        } else {
            const schedules = await profileApi.getSchedules(user.id, moment().startOf('isoWeek').format('DD-MM-YYYY'), moment().endOf('isoWeek').format('DD-MM-YYYY'));
            if (schedules != null) {
                setTimeSheet(schedules[0]);
                setEndDate(`${moment().endOf('isoWeek').format('DD/MM/YYYY')}`);
                setStartDay(`${moment().startOf('isoWeek').format('DD/MM')}`);
                setTotalHour(schedules[1])
            }
        }
        setLoading(false) 
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
            <View style = { styles.container} >
                {isLoading ? <Splash/> : null}
                <ScrollView>
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
                    <View style = {styles.totalView}>
                        <Text style = { styles.totalText}>Total : {totalHour} hour</Text>
                    </View>
                </ScrollView>
                
               
            </View>
        ); 
    } else {
        return (
            <View style = { styles.container} >
            </View>
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
        width: '100%',
        textAlign: 'center',
    },
    timeLineView: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    timeLineText: {
        fontSize: 19,
        paddingHorizontal: 10
    },
    totalView: {
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 16
    },
    totalText: {
        fontSize: 18
    },
})