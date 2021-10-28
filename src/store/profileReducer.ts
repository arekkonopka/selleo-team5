import * as actionTypes from './actions';
import { Profile } from '../models/Profile';

export const initialState: { profile: Profile | null } = {
    profile: null,
};

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case actionTypes.UNSET_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
};

export default profileReducer;
