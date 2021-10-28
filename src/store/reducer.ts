import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import managementReducer from './managementReducer';
import profileReducer from './profileReducer';

const reducer = combineReducers({
    customization: customizationReducer,
    management: managementReducer,
    profile: profileReducer,
});

export default reducer;
