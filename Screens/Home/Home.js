import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'

export default class Home extends Component {

    render() {
        return (
            <View style = {styles.container}>
                <Text style = {{fontSize: 40}}> Home</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});