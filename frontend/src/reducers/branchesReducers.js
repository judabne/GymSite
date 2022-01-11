const { BRANCH_LIST_REQUEST, BRANCH_LIST_SUCCESS, BRANCH_LIST_FAIL, BRANCH_DETAILS_REQUEST, BRANCH_DETAILS_SUCCESS, BRANCH_DETAILS_FAIL, BRANCH_SAVE_FAIL, BRANCH_SAVE_REQUEST, BRANCH_SAVE_SUCCESS, BRANCH_DELETE_SUCCESS, BRANCH_DELETE_REQUEST, BRANCH_DELETE_FAIL } = require("constants/branchesConstants");

function branchesListReducer(state = { branches: [] }, action) {
    switch (action.type) {
        case BRANCH_LIST_REQUEST:
            return { loading: true, branches: [] };
        case BRANCH_LIST_SUCCESS:
            return { loading: false, branches: action.payload };
        case BRANCH_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function branchDetailsReducer(state = { branch: {} }, action) {
    switch (action.type) {
        case BRANCH_DETAILS_REQUEST:
            return { loading: true };
        case BRANCH_DETAILS_SUCCESS:
            return { loading: false, branch: action.payload };
        case BRANCH_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function branchSaveReducer(state = { branch: {} }, action) {
    switch (action.type) {
        case BRANCH_SAVE_REQUEST:
            return { loading: true };
        case BRANCH_SAVE_SUCCESS:
            return { loading: false, success: true, branch: action.payload };
        case BRANCH_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function branchDeleteReducer(state = { branch: {} }, action) {
    switch (action.type) {
        case BRANCH_DELETE_REQUEST:
            return { loading: true };
        case BRANCH_DELETE_SUCCESS:
            return { loading: false, success: true, branch: action.payload };
        case BRANCH_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
export { branchesListReducer, branchDetailsReducer, branchSaveReducer, branchDeleteReducer }