import React, {Component} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import MenuCell from '../Cells/MenuCell'

const menus = [
    {id: 0, name: "Food 0", urlImage: "", price: 10000, salePrice: 0, quantity: 0, type: "Food"},
    {id: 1, name: "Food 1", urlImage: "", price: 11000, salePrice: 9000, quantity: 0, type: "Food"},
    {id: 2, name: "Food 2", urlImage: "", price: 12000, salePrice: 0, quantity: 0, type: "Food"},
    {id: 3, name: "Food 3", urlImage: "", price: 13000, salePrice: 0, quantity: 0, type: "Food"},
    {id: 4, name: "Food 4", urlImage: "", price: 14000, salePrice: 11500, quantity: 0, type: "Food"},
    {id: 5, name: "Food 5", urlImage: "", price: 15000, salePrice: 0, quantity: 0, type: "Drink"},
    {id: 6, name: "Drink 6", urlImage: "", price: 16000, salePrice: 14999, quantity: 0, type: "Drink"},
    {id: 7, name: "Drink 7", urlImage: "", price: 17000, salePrice: 0, quantity: 0, type: "Drink"},
    {id: 8, name: "Drink 8", urlImage: "", price: 18000, salePrice: 0, quantity: 0, type: "Drink"},
    {id: 9, name: "Drink 9", urlImage: "", price: 19000, salePrice: 0, quantity: 0, type: "Drink"},
    {id: 10, name: "Drink 10", urlImage: "", price: 20000, salePrice: 0, quantity: 0, type: "Drink"},
]

export default class Menu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            table: props,
            filterIndex: 0,
            productList: menus
        }
    }

    handleIndexChange = (index) => {
        var filterMenus = []
        if ( index == 1) {
            filterMenus = menus.filter(item => {
                return item.type == "Food"
            });
        } else if ( index == 2) {
            filterMenus = menus.filter(item => {
                return item.type == "Drink"
            });
        } else{
            filterMenus = menus
        }

        this.setState({
            filterIndex: index,
            productList: filterMenus
        });
      };

    render() {
        return (
            <SafeAreaView style = { styles.container} >
                <View style = {styles.headerMenu}>
                    <SegmentedControlTab
                        values = {['All', 'Drink', "Food"]}
                        selectedIndex = {this.state.filterIndex}
                        onTabPress = {this.handleIndexChange}
                        tabsContainerStyle={styles.tabsContainerStyle}
                        tabStyle={styles.tabStyle}
                        activeTabStyle={styles.activeTabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabTextStyle={styles.activeTabTextStyle}
                    />
                </View>
                <FlatList
                    data={this.state.productList}
                    numColumns = {1}
                    renderItem={({ item }) =>
                        <View style = {styles.cell}>
                            <MenuCell product = {item} />
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
        marginVertical: 10,
        justifyContent: 'center',
        marginHorizontal: 16
    },
    tabsContainerStyle: { 
        height: 45, 
        backgroundColor: '#F2F2F2' 
    },
    tabStyle: {
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        borderColor: 'rgb(134, 85, 252)',
    },
    activeTabStyle: { 
        backgroundColor: 'rgb(134, 85, 252)'
    },
    tabTextStyle: { 
        color: '#444444', 
        fontWeight: 'bold', 
        fontSize: 18 
    },
    activeTabTextStyle: { 
        color: 'white' 
    }
})