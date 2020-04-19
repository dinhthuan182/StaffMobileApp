import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function TimeSheetCell(props) {
    const {sheetItem} = props

    return (
        <View style = {[styles.container, (typeof(sheetItem.header) === "undefined") ? styles.normalSheetView : styles.headerSheetView ]}>
            <Text style = {[ styles.dayText, 
                (typeof(sheetItem.header) === "undefined") ? {} : styles.headerSheet]} >
                {sheetItem.day}
            </Text>
            <Text style = {[ styles.dateText, 
                (typeof(sheetItem.header) === "undefined") ? {} : styles.headerSheet]} >
                {sheetItem.date}
            </Text>
            <Text style = {[styles.timeText, 
                (typeof(sheetItem.header) === "undefined") ? {} : styles.headerSheet]} >
                 {(typeof(sheetItem.start) === "undefined")? 'off' : sheetItem.start + ' - ' + sheetItem.end}
            </Text>
            <Text style = {[styles.totalText, 
                (typeof(sheetItem.header) === "undefined") ? {} : styles.headerSheet]} >
                {(typeof(sheetItem.start) === "undefined")? 0 : sheetItem.total}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 0.5
    },
    headerSheetView: {
        backgroundColor: 'rgb(134, 85, 252)'
    },
    normalSheetView: {
        backgroundColor: 'rgba(104, 104, 104, 0.3)'
    },
    headerSheet: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dayText: {
        fontSize: 17,
        width: '27%',
        paddingVertical: 10,
        paddingLeft: 5,
        borderRightWidth: 1
    },
    dateText: {
        fontSize: 17,
        width: '30%',
        textAlign: 'center',
        paddingVertical: 10,
        borderRightWidth: 1
    },
    timeText: {
        fontSize: 17,
        width: '30%',
        textAlign: 'center',
        paddingVertical: 10,
        borderRightWidth: 1
    },
    totalText: {
        fontSize: 17,
        width: '13%',
        textAlign: 'center',
        paddingVertical: 10,
    }
})