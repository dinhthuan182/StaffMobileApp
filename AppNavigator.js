import React from 'react';
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

const OrderStack = createStackNavigator();

const MainTab = createBottomTabNavigator() 

const AuthStack = createStackNavigator();

function setOrderStack() {
    return (
        <OrderStack.Navigator initialRouteName = "Tables" >
            <OrderStack.Screen name = "Tables" component = {Tables} />
            <OrderStack.Screen name = "TableDetail" component = {TableDetail} />
            <OrderStack.Screen name = "Menu" component = {Menu} />
        </OrderStack.Navigator>
    );
}


function setMainTab() {
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

export default function setAuthStack() {
    return (
        <AuthStack.Navigator 
          initialRouteName = "Login"
          screenOptions={{
            headerShown: false}} >
            <AuthStack.Screen name = "Login" component = {Login} />
            <AuthStack.Screen name = "Main" component = {setMainTab} />
        </AuthStack.Navigator>
    );
}