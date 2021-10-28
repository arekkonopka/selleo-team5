import * as actionTypes from './actions';

export const initialState = {
    selectedBundle: null,
};

const managementReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_MANAGEMENT_BUNDLE:
            return {
                ...state,
                selectedBundle: action.bundle
            };
        case actionTypes.UNSET_SELECTED_MANAGEMENT_BUNDLE:
            return {
                ...state,
                selectedBundle: null
            };
        default:
            return state;
    }
};

export default managementReducer;
