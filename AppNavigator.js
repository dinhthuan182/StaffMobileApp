import React from 'react';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// login
import Login from './Screens/Auth/Login'
import Home from './Screens/Home/Home'
import Tables from './Screens/Order/Tables'
import TableDetail from './Screens/Order/TableDetail'
import Menu from './Screens/Order/Menu'
import Profile from './Screens/Profile/Profile' 

import { useAuth } from "./Providers/Auth";

const OrderStack = createStackNavigator();

const MainTab = createBottomTabNavigator() 

const AuthStack = createStackNavigator();

function setOrderStack(props) {
    // const {navigation} = props;

    return (
        <OrderStack.Navigator initialRouteName = "Tables"
            screenOptions={() => ({
                headerStyle: {
                    backgroundColor: 'rgb(134, 85, 252)'
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20
                },
            })} >

            <OrderStack.Screen name = "Tables" 
                component = {Tables}
                options = {() => ({
                    title: "Tables",
                })}
            />

            <OrderStack.Screen name = "TableDetail" 
                component = {TableDetail}
                options={({route}) => ({
                    title: route.params.titleHeader,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => route.params.submit()}
                            style = {styles.btnSubmit} >
                            <Text style = {styles.btnSubmitText} >Submit</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
            
            <OrderStack.Screen name = "Menu" 
                component = {Menu}
                options={({route}) => ({
                    title: route.params.titleHeader,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => route.params.addOrders()}
                            style = {styles.btnSubmit} >
                            <Text style = {styles.btnSubmitText} >Add</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
        </OrderStack.Navigator>
    );
}


function setMainTab(props) {
    return(
        <MainTab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                    } else if (route.name === 'Tables') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'rgb(134, 85, 252)',
                inactiveTintColor: 'gray',
            }}
        >
            <MainTab.Screen name = "Home" component = {Home} />
            <MainTab.Screen name = "Tables" component = {setOrderStack} />
            <MainTab.Screen name = "Profile" component = {Profile} />
        </MainTab.Navigator>
    );
}

export default function setAuthStack(props) {
    const {state} = useAuth();
    const isLoggedIn = state.isLoggedIn;
    return (
        <AuthStack.Navigator 
          screenOptions={{
            headerShown: false}} >
                {isLoggedIn ? ( 
                    <AuthStack.Screen name = "Main" component = {setMainTab} />
                    ): (
                    <AuthStack.Screen name = "Login" component = {Login} />
                    )
                } 
        </AuthStack.Navigator>
    );
}


const styles = StyleSheet.create({
    btnSubmit:{
        borderColor: 'white',
        marginRight: 20,
        borderRadius: 10,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnSubmitText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
})