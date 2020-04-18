import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends Component {
    state = {
        showPass: true,
        username: "",
        password: ""
    }

    showPass = () => {
        if (this.state.showPass == false) {
            this.setState({ showPass: true})
        } else {
            this.setState({ showPass: false})
        }
    }

    render() {
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
                        onChangeText = {(text) => {this.setState({username: text})}}
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
                            onChangeText = {(text) => {this.setState({password: text})}}
                            style = {styles.input}
                            placeholder = {"Password"}
                            secureTextEntry = {this.state.showPass}
                            placeholderTextColor = {'rgba(255, 255, 255, 0.7)'} />
                
                        <TouchableOpacity style = {styles.btnEye}
                            onPress = { this.showPass.bind(this) } >
                            <Icons name = { this.state.showPass == true ? 'ios-eye': 'ios-eye-off'}
                            size = {26}
                            color = {'rgba(255, 255, 255, 0.7)'}/>
                        </TouchableOpacity>
                    </View>
                
                    <TouchableOpacity style = {styles.btnLogin}>
                        <Text style={styles.btnLoginText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
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
});