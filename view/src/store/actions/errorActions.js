// React
import { useContext } from "react";
import { StoreContext } from "../../store/store";

// Action Types
import * as actionTypes from "./actionTypes";

// Dispatch
const globalState = useContext(StoreContext);
const { dispatch } = globalState;

// Clear errors
export const clearErrors = () => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};
