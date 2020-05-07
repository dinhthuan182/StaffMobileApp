import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, ScrollView, Text, Alert } from 'react-native';

import MenuCell from '../Cells/MenuCell'
import Splash from '../Splash';


import { useAuth } from "../../Providers/Auth";

export default function PromotionDetail(props) {
    const {state} = useAuth();
    const {isLoggedIn, user} = state;

    const {navigation, route} = props;
    const {detail} = route.params
    const {name, description, sale_percent, start_at, end_at, product_list} = detail
    if (isLoggedIn) {
        return (
            <SafeAreaView style = { styles.container} >
                <ScrollView>
                    <View style = {styles.headerMenu}>
                        <Text style = { styles.saleText } >Sale: {sale_percent*100}%</Text>
                        <Text style = { styles.desText } >{description}</Text>
                        <Text style = {styles.timeTitle}>Time: 
                            <Text style = { styles.timeText } > {start_at} - {end_at}</Text>
                        </Text>
                    </View>
                    <FlatList
                        data={product_list}
                        numColumns = {1}
                        renderItem={({ item }) =>
                            <View style = {styles.cell}>
                                <MenuCell product = {item} isPromotion = {true} />
                            </View>}
                        keyExtractor={item => `${item.id}`}
                        contentContainerStyle = {{marginHorizontal: 8}}
                        nestedScrollEnabled = {true}
                    />
                </ScrollView>
                
            </SafeAreaView>
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
    },
    cell: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 8
    },
    headerMenu: {
        marginVertical: 10,
        justifyContent: 'space-between',
        marginHorizontal: 16
    },
    saleText: {
        fontSize: 18,
        width: '100%'
    },
    desText: {
        fontSize: 16,
        width: '100%',
        marginTop: 5
    },
    timeText: {
        fontSize: 17,
        fontStyle: 'italic',
        width: '100%',
        marginTop: 5
    },
    timeTitle: {
        fontSize: 17,
        fontStyle: 'italic',
        width: '100%',
        marginTop: 10
    },
})