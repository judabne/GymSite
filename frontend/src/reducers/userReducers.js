import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_RELOAD_REQUEST, USER_RELOAD_FAIL, USER_RELOAD_SUCCESS } from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case USER_RELOAD_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case USER_RELOAD_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
        case USER_REGISTER_FAIL:
        case USER_RELOAD_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

export {
    userSigninReducer
}