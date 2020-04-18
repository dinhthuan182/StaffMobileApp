import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import table_active from '../../assets/table_active.png'
import table_unactive from '../../assets/table_unactive.png'

export default function Table(props) {
    const { table } = props;
    return (
        <TouchableOpacity activeOpacity = {0.7}>
            <View style = { styles.container} >
                <Text style = { styles.tableText } >{table.id}</Text>
                <Image source = {table.avaliable ? table_unactive : table_active}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgb(100, 100, 100)',
        borderWidth: 2,
        paddingVertical: 10
    },
    tableText: {
        position: 'absolute',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 5
    },
})