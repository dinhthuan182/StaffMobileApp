import axios from 'axios';

import * as C from '../Constants';

export async function getPromotions() {
    
    try{
        let res = await axios.get(C.GET_PROMOTION);
        const {promotion_list} = res.data;

        const data = JSON.parse(JSON.stringify(promotion_list))
        return data;
    }catch (e) {
        throw handler(e);
        return null;
    }
}

export async function promotionDetail(id) {
    
    try{
        let res = await axios.get(C.PROMOTION_DETAIL(id));
        const detail = JSON.parse(JSON.stringify(res.data))
        return detail;
    }catch (e) {
        throw handler(e);
        return null;
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}