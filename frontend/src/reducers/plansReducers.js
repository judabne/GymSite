const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } = require("constants/plansConstants");

function plansListReducer(state = { plans: [] }, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, plans: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, plans: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export { plansListReducer }