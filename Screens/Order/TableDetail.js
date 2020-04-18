import React, {Component} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';

import ProductCell from '../Cells/ProductCell'

const productList = [
    {id: 0, name: "product 0", urlImage: "", price: 10000, salePrice: 0, quantity: 1, type: "Food"},
    {id: 1, name: "product 1", urlImage: "", price: 11000, salePrice: 9000, quantity: 1, type: "Food"},
    {id: 2, name: "product 2", urlImage: "", price: 12000, salePrice: 0, quantity: 6, type: "Food"},
    {id: 3, name: "product 3", urlImage: "", price: 13000, salePrice: 0, quantity: 1, type: "Food"},
    {id: 4, name: "product 4", urlImage: "", price: 14000, salePrice: 11500, quantity: 2, type: "Food"},
    {id: 5, name: "product 5", urlImage: "", price: 15000, salePrice: 0, quantity: 1, type: "Food"},
    {id: 6, name: "product 6", urlImage: "", price: 16000, salePrice: 14999, quantity: 1, type: "Food"},
    {id: 7, name: "product 7", urlImage: "", price: 17000, salePrice: 0, quantity: 1, type: "Food"},
    {id: 8, name: "product 8", urlImage: "", price: 18000, salePrice: 0, quantity: 1, type: "Food"},
    {id: 9, name: "product 9", urlImage: "", price: 19000, salePrice: 0, quantity: 1, type: "Food"},
    {id: 10, name: "product 10", urlImage: "", price: 20000, salePrice: 0, quantity: 1, type: "Food"},
]

export default class TableDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            table: props
        }
    }

    render() {
        return (
            <SafeAreaView style = { styles.container} >
                <View style = {styles.headerMenu}>
                    <View>
                        <Text style = {styles.totalBillText}>Total: 500000 vnd</Text>
                        <Text>Create at: 10:00 AM</Text>
                    </View>
                    <TouchableOpacity 
                        activeOpacity = {0.7}
                        style = {styles.btnMenu} >
                        <Text style = {styles.btnMenuText}>Open Menu</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={productList}
                    numColumns = {1}
                    renderItem={({ item }) =>
                        <View style = {styles.cell}>
                            <ProductCell product = {item} />
                        </View>}
                    keyExtractor={item => item.id}
                    contentContainerStyle = {{marginHorizontal: 8}}
                    />
            </SafeAreaView>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
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
    btnMenu: {
        borderRadius: 5,
        backgroundColor: 'rgb(134, 85, 252)',
        height: 45,
        justifyContent: 'center',
       
    },
    btnMenuText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: 'italic',
        paddingHorizontal: 20
    },
})