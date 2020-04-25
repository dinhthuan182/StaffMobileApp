import React, {useEffect} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import ProductCell from '../Cells/ProductCell'

import * as api from '../../Services/Order'

export default function TableDetail(props) {
    const {navigation, route} = props;
    const {table, detail, newOrder} = route.params
    const {current_sale_total, product_list, created_at, created_by_name} = detail
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hours =String(today.getHours()).padStart(2, '0');
    var min =String(today.getMinutes()).padStart(2, '0'); 

    today = hours +':'+ min +' '+ mm +'-'+ dd +'-'+ yyyy;

    useEffect(() => {
        navigation.setParams({ submit: submitOrders });

        fetchData()
    }, [])

    const submitOrders = () => {
        console.log('submitOrders')
    }

    const fetchData = async () => {
        console.log("see data:" + newOrder);
        // setLoading(true)
        // let allTable = await api.getTableDetail(table.id);
        // setLoading(false)
    }

    return (
        <SafeAreaView style = { styles.container} >
            <View style = {styles.headerMenu}>
                <View>
                <Text style = {styles.totalBillText}>Total: $ {current_sale_total == null ? 0: current_sale_total} <Text style = {styles.smallBillText}>VND</Text></Text>
                    <Text>Create at: {created_at == null ? today : created_at}</Text>
                </View>
                <TouchableOpacity 
                    onPress = {() => navigation.navigate('Menu', {titleHeader: `Table ${table.name}`})}
                    activeOpacity = {0.7}
                    style = {styles.btnMenu} >
                    <Text style = {styles.btnMenuText}>Open Menu</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={product_list}
                numColumns = {1}
                renderItem={({ item }) =>
                    <View style = {styles.cell}>
                        <ProductCell product = {item} />
                    </View>}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle = {{marginHorizontal: 8}}
                />
        </SafeAreaView>
    );
    
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
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        marginHorizontal: 16
    },
    totalBillText: {
        fontSize: 20
    },
    smallBillText: {
        fontSize: 15,
    },
    btnMenu: {
        borderRadius: 5,
        backgroundColor: 'rgb(134, 85, 252)',
        height: 40,
        justifyContent: 'center',
       
    },
    btnMenuText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: 'italic',
        paddingHorizontal: 10
    },
})