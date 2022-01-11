import axios from "axios";
const { BRANCH_LIST_REQUEST, BRANCH_LIST_SUCCESS, BRANCH_LIST_FAIL, BRANCH_DETAILS_REQUEST, BRANCH_DETAILS_SUCCESS, BRANCH_DETAILS_FAIL, BRANCH_SAVE_FAIL, BRANCH_SAVE_REQUEST, BRANCH_SAVE_SUCCESS, BRANCH_DELETE_SUCCESS, BRANCH_DELETE_REQUEST, BRANCH_DELETE_FAIL } = require("constants/branchesConstants");

const listBranches = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: BRANCH_LIST_REQUEST });
        const { data } = await axios.get("/api/branches", {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: BRANCH_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: BRANCH_LIST_FAIL, payload: error.message });
    }
}

const detailsBranch = (planId) => async (dispatch) => {
    try {
        dispatch({ type: BRANCH_DETAILS_REQUEST, payload: planId });
        const { data } = await axios.get("/api/branches/" + planId);
        dispatch({ type: BRANCH_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: BRANCH_DETAILS_FAIL, payload: error.message })
    }
}

const deleteBranch = (planId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: BRANCH_DELETE_REQUEST, payload: planId });
        const { data } = await axios.delete("/api/branches/" + planId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: BRANCH_DELETE_SUCCESS, payload: data, success: true })
    } catch (error) {
        dispatch({ type: BRANCH_DELETE_FAIL, payload: error.message })
    }
}

const saveBranch = (plan) => async (dispatch, getState) => {
    console.log("saving plan " + plan.availability)
    try {
        dispatch({ type: BRANCH_SAVE_REQUEST, playload: plan });
        const { userSignin: { userInfo } } = getState();
        if (!plan._id) {
            const { data } = await axios.post('/api/branches', plan, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: BRANCH_SAVE_SUCCESS, payload: data });
        } else {
            const { data } = await axios.put('/api/branches/' + plan._id, plan, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: BRANCH_SAVE_SUCCESS, payload: data });
        }

    } catch {
        dispatch({ type: BRANCH_SAVE_FAIL, payload: error.message });
    }
}

export { listBranches, saveBranch, detailsBranch, deleteBranch };