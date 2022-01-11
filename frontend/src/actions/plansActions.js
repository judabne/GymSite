import axios from "axios";
const { PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS, PLAN_LIST_FAIL, PLAN_ACTIVE_FAIL, PLAN_ACTIVE_REQUEST, PLAN_ACTIVE_SUCCESS,PLAN_DETAILS_REQUEST, PLAN_DETAILS_SUCCESS, PLAN_DETAILS_FAIL, PLAN_SAVE_FAIL, PLAN_SAVE_REQUEST, PLAN_SAVE_SUCCESS, PLAN_DELETE_SUCCESS, PLAN_DELETE_REQUEST, PLAN_DELETE_FAIL } = require("constants/plansConstants");

const listPlans = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: PLAN_LIST_REQUEST });
        const { data } = await axios.get("/api/plans", {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: PLAN_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: PLAN_LIST_FAIL, payload: error.message });
    }
}

const detailsPlan = (planId) => async (dispatch) => {
    try {
        dispatch({ type: PLAN_DETAILS_REQUEST, payload: planId });
        const { data } = await axios.get("/api/plans/" + planId);
        dispatch({ type: PLAN_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PLAN_DETAILS_FAIL, payload: error.message })
    }
}

const activePlans = () => async (dispatch) => {
    try {
        dispatch({ type: PLAN_ACTIVE_REQUEST });
        const { data } = await axios.get("/api/plans/active", );
        dispatch({ type: PLAN_ACTIVE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: PLAN_ACTIVE_FAIL, payload: error.message });
    }
}

const deletePlan = (planId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: PLAN_DELETE_REQUEST, payload: planId });
        const { data } = await axios.delete("/api/plans/" + planId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: PLAN_DELETE_SUCCESS, payload: data, success: true })
    } catch (error) {
        dispatch({ type: PLAN_DELETE_FAIL, payload: error.message })
    }
}

const savePlan = (plan) => async (dispatch, getState) => {
    try {
        dispatch({ type: PLAN_SAVE_REQUEST, playload: plan });
        const { userSignin: { userInfo } } = getState();
        if (!plan._id) {
            const { data } = await axios.post('/api/plans', plan, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: PLAN_SAVE_SUCCESS, payload: data });
        } else {
            const { data } = await axios.put('/api/plans/' + plan._id, plan, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: PLAN_SAVE_SUCCESS, payload: data });
        }

    } catch {
        dispatch({ type: PLAN_SAVE_FAIL, payload: error.message });
    }
}

export { listPlans, savePlan, detailsPlan, deletePlan, activePlans };