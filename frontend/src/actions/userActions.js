import axios from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_RELOAD_REQUEST, USER_RELOAD_SUCCESS, USER_RELOAD_FAIL } from "constants/userConstants";
import Cookie from 'js-cookie';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/users/signin", { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error.response.data.msg)
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.msg });
    }
}

const register = (firstname, lastname, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { firstname, lastname, email, password } });
    try {
        const { data } = await axios.post("/api/users/register", { firstname, lastname, email, password });
        console.log("data " + data);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.msg });
    }
}

const reloadUser = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: USER_RELOAD_REQUEST });
        const { data } = await axios.get("/api/users/reload", {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_RELOAD_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
        console.log(Cookie.getJSON("userInfo"))
    } catch (error) {
        dispatch({ type: USER_RELOAD_FAIL, payload: error.message });
    }
}

export { signin, register, reloadUser };