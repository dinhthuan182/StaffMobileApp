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
export const POST_ORDER = (id) => { return `${API_URL}/tables/${id}/updateProducts` };

export const UNSELECTED_TABLE = (id) => { return `${API_URL}/tables/${id}/unstate` };
// General
export const GET_IMAGE = (url) => { return `${ROOT_URL}/images/products/${url}` };