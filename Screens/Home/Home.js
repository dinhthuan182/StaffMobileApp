import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from "../../Providers/Auth";

export default function Home(props) {
    const {navigate} = props.navigation;
    const {state} = useAuth();


    useEffect(() => {
        console.log(state)
      }, [])

    
    return (
        <View style = {styles.container}>
            <Text style = {{fontSize: 40}}>{state.user.name}</Text>
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