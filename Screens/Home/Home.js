import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from "../../Providers/Auth";

export default function Home(props) {
    const {navigate} = props.navigation;
    const {state } = useAuth();

    
    return (
        <View style = {styles.container}>
            <Text style = {{fontSize: 40}}>{ state.isLoggedIn ? state.user.name : null}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});