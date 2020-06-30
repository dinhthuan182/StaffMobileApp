import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

import table_active from '../../assets/table_active.png'
import table_unactive from '../../assets/table_unactive.png'
import table_ordering from '../../assets/table_ordering.png'

export default function Table(props) {
    const { table, moveToDetail } = props;

    const move = () => {
        if (table.user_id == null) {
            moveToDetail(table.id)
        } else {
            Alert.alert(
                "Notification",
                "The table is being accessed by other users.",
                [
                    { text: "Ok"}
                ],
                { cancelable: false }
            );
        }
    }
    
    return (
        <TouchableOpacity 
            activeOpacity = {0.7}
            onPress = {()=> move()} >
            <View style = { styles.container} >
                <Text style = { styles.tableText } >{table.name}</Text>
                
                <Image source = {table.user_id != null ? 
                                table_ordering : table.status == "Using" ? 
                                table_active: table_unactive } />
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
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15
    },
})