import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, ImageBackground } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'

import app_logo from '../../assets/app_logo.png'

import Splash from '../Splash'

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
    const {state, handleLogin } = useAuth();

    showPassHandle = () => {
        setHidePass(!hidePass);
    }

    onLoginSubmit = async () => {
        setLoading(true);
        if (username == "" || password == "") {
            setError("Please enter your account and password");
            setLoading(false);
            return
        }

        try {
            let response = await api.login(username, password);
            await handleLogin(response);

            //check if username is null
            let user = (response.user.username !== null);
            setLoading(false);
            if (user) navigate('Main');
            
        } catch (error) {
            setLoading(false)
            setPassword("")
            setError("Username and password are incorrect")
        }
        setLoading(false)
    }

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            const isLoggedIn = state.isLoggedIn;
            if (isLoggedIn == true) {
                navigate('Main')
            }
        };
    
        bootstrapAsync();
      }, []);
    

    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                {loading ? <Splash/>: null }
                <ImageBackground  source = { app_logo } style = {styles.imgLogo} >
                <Text style = {styles.appTitle}>Cafe Staff App</Text>
                </ImageBackground >
                
            
                <View style = {styles.inputContainer} >
                    <Icons name = {'ios-person'} 
                        size = {28} 
                        color= {'rgba(255, 255, 255, 0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        value = {username}
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
                        value = {password}
                        onChangeText = {(text) => {
                            setPassword(text)
                            setError("")
                        }}
                        style = {styles.input}
                        placeholder = {"Password"}
                        secureTextEntry = {hidePass}
                        placeholderTextColor = {'rgba(255, 255, 255, 0.7)'} />
            
                    <TouchableOpacity style = {styles.btnEye}
                        onPress = {() => showPassHandle() } >
                        <Icons name = { hidePass == true ? 'ios-eye': 'ios-eye-off'}
                        size = {26}
                        color = {'rgba(255, 255, 255, 0.7)'}/>
                    </TouchableOpacity>
                </View>
                { (error != "") ? 
                    <Text style = {styles.error}>{error}</Text>: <View/>
                }
                
                <TouchableOpacity 
                    activeOpacity = {0.5}
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
        justifyContent: 'flex-start',
    },
    imgLogo: {
        height: 250,
        width: 250,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 40,
        marginBottom: 20
    },
    appTitle: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        paddingBottom: 27   
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
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginTop: 5
    }
});