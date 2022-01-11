import { userSigninReducer } from 'reducers/userReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { plansListReducer, planActiveReducer, planDetailsReducer, planSaveReducer, planDeleteReducer } from 'reducers/plansReducers';
import { branchesListReducer, branchDetailsReducer, branchSaveReducer, branchDeleteReducer } from 'reducers/branchesReducers';

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userSignin: { userInfo } }; //so the username stays there after refresh.

const reducer = combineReducers({
    userSignin: userSigninReducer,
    plansList: plansListReducer,
    planActive: planActiveReducer,
    planDetails: planDetailsReducer,
    planSave: planSaveReducer,
    planDelete: planDeleteReducer,
    branchesList: branchesListReducer,
    branchDetails: branchDetailsReducer,
    branchSave: branchSaveReducer,
    branchDelete: branchDeleteReducer

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;