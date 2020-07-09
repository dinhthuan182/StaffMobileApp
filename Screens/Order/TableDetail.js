import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';

import ProductCell from '../Cells/ProductCell';
import Splash from '../Splash';

import * as api from '../../Services/Order';

import { useAuth } from "../../Providers/Auth";

function PostProduct(id, quantity, note) {
    this.id = id;
    this.quantity = quantity;
    this.note = note;
}

export default function TableDetail(props) {
    const {state} = useAuth();
    const {isLoggedIn, user} = state;

    const {navigation, route} = props;
    const {table, detail, newOrder} = route.params
    let {current_sale_total, product_list, created_at, created_by_name} = detail
    
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(current_sale_total == null ? 0 : current_sale_total)
    const [orderList, setOrderList] = useState(product_list);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hours =String(today.getHours()).padStart(2, '0');
    var min =String(today.getMinutes()).padStart(2, '0'); 

    today = hours +':'+ min +' '+ mm +'-'+ dd +'-'+ yyyy;

    useEffect(() => {
        navigation.setParams({ submit: submitOrders, outTable: onOutTable });
    }, [orderList])

    useEffect(() => {
        updateOrder()
    }, [newOrder])

    const submitOrders = async () => {
        setLoading(true)
        var postList = []
        var submitFlag = false

        orderList.forEach(item => {
            
            if (item.isUpdate == true || item.isNew == true) {
                submitFlag = true
            }
            
           let p = new PostProduct(item.id, item.quantity, (typeof item.note === 'undefined' || item.note == null) ? "Note": item.note);
           postList.push(p);
        });
        
        if (orderList.length != product_list.length && submitFlag == false) {
            submitFlag = true
        }

        if (submitFlag == true) {
            const res = await api.postOrders(table.id, postList);
            if (res != null) {
                setTotal(res.current_sale_total)
                setOrderList(res.product_list)
            } else {
                Alert.alert('Notification', `Table ${table.name} can not update product list`)
            }
            
        } else { 
            Alert.alert('Notification', `Table ${table.name} can not update product list`)
        }
        
        setLoading(false)
    }

    const onOutTable = async () => {
        setLoading(true)
        const result = await api.outTable(table.id)
        if (result == true) {
            navigation.goBack()
        } else {
            Alert.alert('Notification', `Table ${table.name} can not back to table list`)
        }
        setLoading(false)
    }

    const updateOrder = () => {
        if (typeof newOrder !== 'undefined') {
            var updatedOrders = orderList;
            var flag = false;
            newOrder.forEach(element => {
                flag = false;

                updatedOrders.forEach(item => {
                    if (item.id == element.id) {
                        flag = true
                        if ( typeof item.isNew === 'undefined') {
                            item.oldQuantity = item.quantity;
                            item.isUpdate = true;
                        }
                        item.quantity += element.quantity
                        
                    }
                });

                if (flag == false) {
                    element.isNew = true;
                    updatedOrders.push(element);
                }
            });
            setOrderList(updatedOrders);
        }
    }

    // state: 0: delete, 1: new, 2 update
    const onUpdateOrder = (id, quantity, note, state) => {
        switch (parseInt(state)) {
            // delete
            case 0:
                const deletedList = orderList.filter(item => {
                    return item.id != id
                });
                setOrderList(deletedList);
                break;
            // new
            case 1:
                const newOrders = orderList.map(item => {
                    if (item.id == id) {
                        item.quantity = quantity
                    }
                    return item
                });
                setOrderList(newOrders);
                break;
            // update
            case 2: 
                const updateOrders = orderList.map(item => {
                    if (item.id == id) {
                        
                        if ( typeof item.isUpdate === 'undefined') {
                            item.isUpdate = true
                            item.oldQuantity = item.quantity
                        }

                        if (quantity == item.oldQuantity) {
                            delete item.isUpdate
                            delete item.oldQuantity
                        }
                        
                        item.quantity = quantity
                    }
                    return item
                });
                setOrderList(updateOrders);
                break;  
            // add note
            case 3:
                var noteOrders = orderList
                noteOrders.forEach(item => {
                    if (item.id == id) {
                        item.note = note
                    }
                });
                setOrderList(noteOrders);
                break;
            default:
                break;
        }
    }

    if (isLoggedIn) {
        return (
            <SafeAreaView style = { styles.container} >
                {loading ? <Splash/>: null }
                <View style = {styles.headerMenu}>
                    <View>
                        <Text style = {styles.totalBillText}>Total: {total} <Text style = {styles.smallBillText}>VND</Text></Text>
                        <Text>Create at: {created_at == null ? today : created_at}</Text>
                        <Text>Create by: {created_by_name == null ? "" : created_by_name}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress = {() => navigation.navigate('Menu', {titleHeader: `Table ${table.name}`})}
                        activeOpacity = {0.7}
                        style = {styles.btnMenu} >
                        <Text style = {styles.btnMenuText}>Open Menu</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={orderList}
                    numColumns = {1}
                    renderItem={({ item }) =>
                        <View style = {styles.cell}>
                            <ProductCell product = {item} onUpdateOrder = {onUpdateOrder} />
                        </View>}
                    keyExtractor={item => `${item.id}`}
                    contentContainerStyle = {{marginHorizontal: 8}}
                    />
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style = { styles.container} ></SafeAreaView>
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
        fontStyle: 'italic'
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