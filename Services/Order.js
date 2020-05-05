import axios from 'axios';

import * as C from '../Constants';

export async function getTables() {
    
    try{
        let res = await axios.get(C.GET_TABLE);
        const {tables} = res.data;
        const tableData = JSON.parse(JSON.stringify(tables))
        return tableData;
    }catch (e) {
        throw handler(e);
        return null;
    }
}

export async function getTableDetail(id) {
    
    try{
        let res = await axios.get(C.TABLE_DETAIL(id));
        const tableDetail = JSON.parse(JSON.stringify(res.data))
        return tableDetail;
    }catch (e) {
        throw handler(e);
        return null;
    }
}

export async function getMenus() {
    
    try{
        let res = await axios.get(C.GET_MENUS);
        const {product_list} = res.data;
        const menusRes = JSON.parse(JSON.stringify(product_list));
        
        menusRes.forEach(function (element) {
            element.quantity = 0;
        });

        return menusRes;
    }catch (e) {
        throw handler(e);
        return null;
    }
}

export async function postOrders(table_id, orders) {
    try {
        let formdata = new FormData();

        for(let [i, product] of orders.entries()) {
            formdata.append(`product_list[${i}][id]`, product.id)
            formdata.append(`product_list[${i}][quantity]`, product.quantity)
            formdata.append(`product_list[${i}][note]`, product.note)
        }

        let res = await axios.post(C.POST_ORDER(table_id), formdata);
        const tableDetail = JSON.parse(JSON.stringify(res.data))
        return tableDetail;
    }catch (e) {
        throw handler(e);
        return null;
    }
}

export async function outTable(id) {
    
    try{
        let res = await axios.get(C.UNSELECTED_TABLE(id));
        const data = JSON.parse(JSON.stringify(res.data));
        return true;
    }catch (e) {
        throw handler(e);
        return false;
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}