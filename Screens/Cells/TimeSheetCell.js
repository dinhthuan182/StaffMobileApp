import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function TimeSheetCell(props) {
    const {sheetItem} = props

    return (
        <View style = {styles.container}>
            <Text style = {styles.dayText} >{sheetItem.day}</Text>
            <Text style = {styles.dateText} >{sheetItem.date}</Text>
            <Text style = {styles.timeText} >{sheetItem.start} - {sheetItem.end}</Text>
            <Text style = {styles.totalText} >{sheetItem.total}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1
    },
    dayText: {
        width: '30%'
    },
    dateText: {
        width: '30%'
    },
    timeText: {
        width: '30%'
    },
    totalText: {
        width: '10%',
        textAlign: 'center'
    }
})