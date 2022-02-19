import auth from './auth';
import alert from './alert';
import { combineReducers } from "redux";
import post from './post';

export default combineReducers({
    alert,
    auth,
    post
})