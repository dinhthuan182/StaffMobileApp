import axios from 'axios';

import * as C from '../Constants';

export async function login(username, password) {
    try{
        
        let res = await axios.post(C.LOGIN, {
            username: username,
            password: password
        });

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function logout() {
    try{  
        let res = await axios.post(C.LOGOUT);
    }catch (e) {
        throw handler(e);
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}