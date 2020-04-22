import React, {useMemo, useReducer, useContext} from 'react';
import {AsyncStorage} from "react-native";
import axios from "axios";

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, {initialState, LOGGED_IN, LOGGED_OUT} from "../Reducer";

// CONFIG KEYS [Storage Keys]
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT
const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    // Get Auth state
    const getAuthState = async () => {
        try {
           
            //GET TOKEN && USER
            let access_token = await AsyncStorage.getItem(TOKEN_KEY);
            let user = await AsyncStorage.getItem(USER_KEY);
            user = JSON.parse(user);
            if (access_token !== null && user!== null) await handleLogin({access_token, user});
            else await handleLogout();

            return {access_token, user};
        } catch (error) {
            throw new Error(error)
        }
    };

    // Handle Login
    const handleLogin = async (data) => {
        try{
            //STORE DATA
            let { user, access_token, expires_in} = data;
            let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, access_token]];
            await AsyncStorage.multiSet(data_);

            //AXIOS AUTHORIZATION HEADER
            axios.defaults.headers.common["Authorization"] = `${data.access_token}`;
            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_IN, user:data.user});
        }catch (error) {
            throw new Error(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try{

            //REMOVE DATA
            await AsyncStorage.multiRemove(keys);

            //AXIOS AUTHORIZATION HEADER
            delete axios.defaults.headers.common["Authorization"];

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_OUT});
        }catch (error) {
            throw new Error(error);
        }
    };

    const value = useMemo(() => {
        return {state, getAuthState, handleLogin, handleLogout};
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;