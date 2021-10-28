import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import managementReducer from './managementReducer';

const reducer = combineReducers({
    customization: customizationReducer,
    management: managementReducer
});

export default reducer;
