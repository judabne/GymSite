const { PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS, PLAN_LIST_FAIL, PLAN_ACTIVE_FAIL, PLAN_ACTIVE_REQUEST, PLAN_ACTIVE_SUCCESS,PLAN_DETAILS_REQUEST, PLAN_DETAILS_SUCCESS, PLAN_DETAILS_FAIL, PLAN_SAVE_FAIL, PLAN_SAVE_REQUEST, PLAN_SAVE_SUCCESS, PLAN_DELETE_SUCCESS, PLAN_DELETE_REQUEST, PLAN_DELETE_FAIL } = require("constants/plansConstants");

function plansListReducer(state = { plans: [] }, action) {
    switch (action.type) {
        case PLAN_LIST_REQUEST:
            return { loading: true, plans: [] };
        case PLAN_LIST_SUCCESS:
            return { loading: false, plans: action.payload };
        case PLAN_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function planDetailsReducer(state = { plan: {} }, action) {
    switch (action.type) {
        case PLAN_DETAILS_REQUEST:
            return { loading: true };
        case PLAN_DETAILS_SUCCESS:
            return { loading: false, plan: action.payload };
        case PLAN_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function planActiveReducer(state = { plans: [] }, action) {
    switch (action.type) {
        case PLAN_ACTIVE_REQUEST:
            return { loading: true, plans: [] };
        case PLAN_ACTIVE_SUCCESS:
            return { loading: false, plans: action.payload };
        case PLAN_ACTIVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function planSaveReducer(state = { plan: {} }, action) {
    switch (action.type) {
        case PLAN_SAVE_REQUEST:
            return { loading: true };
        case PLAN_SAVE_SUCCESS:
            return { loading: false, success: true, plan: action.payload };
        case PLAN_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function planDeleteReducer(state = { plan: {} }, action) {
    switch (action.type) {
        case PLAN_DELETE_REQUEST:
            return { loading: true };
        case PLAN_DELETE_SUCCESS:
            return { loading: false, success: true, plan: action.payload };
        case PLAN_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
export { plansListReducer, planActiveReducer,planDetailsReducer, planSaveReducer, planDeleteReducer }