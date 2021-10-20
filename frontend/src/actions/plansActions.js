import axios from "axios";
const { PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS, PLAN_LIST_FAIL, PLAN_SAVE_REQUEST, PLAN_SAVE_SUCCESS, PLAN_SAVE_FAIL, PLAN_DELETE_FAIL, PLAN_DELETE_REQUEST, PLAN_DELETE_SUCCESS } = require("constants/plansConstants");

const listPlans = () => async (dispatch) => {
    try {
        dispatch({ type: PLAN_LIST_REQUEST });
        const { data } = await axios.get("/api/plans");
        dispatch({ type: PLAN_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: PLAN_LIST_FAIL, payload: error.message });
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
    console.log("saving plan " + plan)
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

export { listPlans, savePlan, deletePlan };