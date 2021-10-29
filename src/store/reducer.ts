import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import profileReducer from './profileReducer';

const reducer = combineReducers({
    customization: customizationReducer,
    profile: profileReducer,
});

export default reducer;
