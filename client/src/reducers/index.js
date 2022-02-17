import auth from './auth';
import alert from './alert';
import { combineReducers } from "redux";

export default combineReducers({
    alert,
    auth
})