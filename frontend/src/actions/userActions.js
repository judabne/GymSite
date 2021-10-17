import axios from "axios";
import cookie from 'js-cookie';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/users/signin", { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        cookie.set('userInfo', JSON.stringify(data));
    } catch {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message })
    }
}

export { signin };