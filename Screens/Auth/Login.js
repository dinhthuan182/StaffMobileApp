import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'

import * as api from "../../Services/Auth";
import { useAuth } from "../../Providers/Auth";

const { width: WIDTH } = Dimensions.get('window')

export default function Login(props) {

    const {navigation} = props;
    const {navigate} = navigation;

    const [loading, setLoading] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { handleLogin } = useAuth();

    showPassHandle = () => {
        setHidePass(!hidePass);
    }

    onLoginSubmit = async () => {
        if (username == "" || password == "") {
            setError("Please enter your account and password");
            return
        }
        setLoading(true);

        try {
            let response = await api.login(username, password);
            await handleLogin(response);
            setLoading(false);

            //check if username is null
            let user = (response.user.username !== null);
            if (user) navigate('Main');
        } catch (error) {
            setLoading(false)
            setError("Username and password are incorrect")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style = {styles.appTitle}>Cafe Staff App</Text>
            
                <View style = {styles.inputContainer} >
                    <Icons name = {'ios-person'} 
                        size = {28} 
                        color= {'rgba(255, 255, 255, 0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        onChangeText = {(text) => {
                            setUsername(text)
                            setError("")
                        }}
                        style = {styles.input}
                        placeholder = {"Username"}
                        placeholderTextColor = {'rgba(255, 255, 255, 0.7)'}/>
                </View>
            
                <View style = {styles.inputContainer} >
                    <Icons name = {'ios-lock'} 
                        size = {28} 
                        color= {'rgba(255, 255, 255, 0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        onChangeText = {(text) => {
                            setPassword(text)
                            setError("")
                        }}
                        style = {styles.input}
                        placeholder = {"Password"}
                        secureTextEntry = {hidePass}
                        placeholderTextColor = {'rgba(255, 255, 255, 0.7)'} />
            
                    <TouchableOpacity style = {styles.btnEye}
                        onPress = { showPassHandle.bind(this) } >
                        <Icons name = { hidePass == true ? 'ios-eye': 'ios-eye-off'}
                        size = {26}
                        color = {'rgba(255, 255, 255, 0.7)'}/>
                    </TouchableOpacity>
                </View>
                { (error != "") ? 
                    <Text style = {styles.error}>{error}</Text>: <View/>
                }
                
                
                <TouchableOpacity 
                    style = {styles.btnLogin}
                    onPress = {() => onLoginSubmit() } >
                    <Text style={styles.btnLoginText}>Login</Text>
                </TouchableOpacity>
            </View>
            
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(134, 85, 252)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        fontSize: 30,
        color: 'white',
        fontWeight: '900',
        marginBottom: 50
    },
    inputContainer: {
        marginTop: 10,
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(104, 104, 104, 0.5)',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 18,
        paddingLeft: 45,
        backgroundColor: 'transparent',
        color:  'rgb(255, 255, 255)',
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 15,
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 15,
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgb(255, 255, 255)',
        justifyContent: 'center',
        marginTop: 20
    },
    btnLoginText: {
        color: 'rgb(134, 85, 252)',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600'
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginTop: 5
    }
});