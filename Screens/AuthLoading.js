import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import { useAuth } from "../Providers/Auth";

export default function AuthLoading(props) {
    const {navigate} = props.navigation;
    const { getAuthState } = useAuth();

    useEffect(() => {
        initialize()
    }, []);

    async function initialize() {
        try {
            const {user} = await getAuthState();

            if (user) {
                //check if username exist
                let username = !!(user.username);

                if (username) navigate('Main');
                else navigate('Login')

            } else navigate('Login');
        } catch (e) {
            navigate('Login');
        }
    }

    return (
        <View style={{backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color='rgb(134, 85, 252)' />
        </View>
    );
};