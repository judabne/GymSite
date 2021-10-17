import { userSigninReducer } from 'reducers/userReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { userRegisterReducer } from 'reducers/userReducers';

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {};
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
})
const composeEnhancer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;