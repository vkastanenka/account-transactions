// Redux
import { combineReducers } from "redux";

// Reducers
import errReducer from "./errReducer";
import authReducer from "./authReducer";
import accountReducer from './accountReducer';

export default combineReducers({
  err: errReducer,
  auth: authReducer,
  acc: accountReducer
});
