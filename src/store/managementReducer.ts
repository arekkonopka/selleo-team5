import * as actionTypes from './actions';

export const initialState = {
    managementSelectedBundle: null,
};

const managementReducer = (state = initialState, action: any) => {
    let id;
    switch (action.type) {
        case actionTypes.SET_SELECTED_MANAGEMENT_BUNDLE:
            return {
                ...state,
                managementSelectedBundle: action.bundle
            };
        case actionTypes.UNSET_SELECTED_MANAGEMENT_BUNDLE:
            return {
                ...state,
                managementSelectedBundle: null
            };
        default:
            return state;
    }
};

export default managementReducer;
