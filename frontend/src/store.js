import { useReducer } from 'react';
import { userSigninReducer } from 'reducers/userReducers';
import { createStore, combineReducers } from 'redux';


const initialState = {};
const reducer = combineReducers({
    userSignin: userSigninReducer,

})

const store = createStore(reducer, initialState);


export default store;