import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useAuth } from "../../Providers/Auth";

import MenuCell from '../Cells/MenuCell'
import Splash from '../Splash'

import * as api from '../../Services/Order'

export default function Menu(props) {
    const {navigation, route} = props
    const {state } = useAuth();

    const [loading, setLoading] = useState(false);
    const [menus, setMenus] = useState([]);
    const [filterIndex, setFilterIndex] = useState(0);
    const [menusFilter, setMenusFilter] = useState([]);

    useEffect(() => {
        navigation.setParams({ addOrders: addOrders });

        if (menus.length == 0) {
            fetchData();  
        }
    }, [menus]);

    // filter order item to submit
    const addOrders = () => {
        const products = menus.filter(item => {
            return item.quantity > 0
        })
        navigation.navigate('TableDetail', {
            newOrder: products
        })
    }

    const fetchData = async () => {
        setLoading(true)
        const menusData = await api.getMenus();
        setMenus(menusData)
        setMenusFilter(menusData)
        setLoading(false)
    }

    const handleIndexChange = (index) => {
        var filterList = []
        if ( index == 1) {
            filterList = menus.filter(item => {
                return item.type == "Drink"
            });

        } else if ( index == 2) {
            filterList = menus.filter(item => {
                return item.type == "Food"
            });

        } else {
            filterList = menus
        }
        
        setFilterIndex(index)
        setMenusFilter(filterList)
    };

    // update quantyti for menus
    const onOrdersChange = (id, quantity) => {
        const updateMenus = menus.map(item => {
            if (item.id == id) {
                item.quantity = quantity
            }
            return item
        });
        setMenus(updateMenus);
    }
    if (state.isLoggedIn) {
        return (
            <SafeAreaView style = { styles.container} >
                {loading ? <Splash/>: null }
                <View style = {styles.headerMenu}>
                    <SegmentedControlTab
                        values = {['All', 'Drink', 'Food']}
                        selectedIndex = {filterIndex}
                        onTabPress = {handleIndexChange}
                        tabsContainerStyle={styles.tabsContainerStyle}
                        tabStyle={styles.tabStyle}
                        activeTabStyle={styles.activeTabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabTextStyle={styles.activeTabTextStyle}
                    />
                </View>
                <FlatList
                    data={menusFilter}
                    numColumns = {1}
                    renderItem={({ item }) =>
                        <View style = {styles.cell}>
                            <MenuCell product = {item} onOrdersChange = {onOrdersChange} isPromotion = {false} />
                        </View>}
                    keyExtractor={item => `${item.id}`}
                    contentContainerStyle = {{marginHorizontal: 8}}
                />
            </SafeAreaView>
        );  
    }else {
        return (
            <View style = {styles.container} ></View>            
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
    },
})