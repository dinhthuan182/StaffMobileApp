import React from 'react';
import { exp } from 'react-native-reanimated';

//API URL
export const ROOT_URL = 'http://cafe-management-system.herokuapp.com';
export const API_URL = `${ROOT_URL}/api`;

//API End Points
// Authentication
export const LOGIN = `${API_URL}/login`;
export const LOGOUT = `${API_URL}/logout`;
// order
export const GET_TABLE = `${API_URL}/tables`;
export const TABLE_DETAIL = (id) => { return `${API_URL}/tables/${id}` };
export const GET_MENUS = `${API_URL}/products`;

// General
export const GET_IMAGE = (url) => { return `${ROOT_URL}/images/products/${url}` };