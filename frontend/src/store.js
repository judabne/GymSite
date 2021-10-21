import { userSigninReducer , userRegisterReducer} from 'reducers/userReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { plansListReducer, planActiveReducer, planSaveReducer, planDeleteReducer } from 'reducers/plansReducers';

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {userSignin : {userInfo}}; //so the username stays there after refresh.
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    plansList: plansListReducer,
    planActive: planActiveReducer,
    planSave: planSaveReducer,
    planDelete: planDeleteReducer
})
const composeEnhancer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;