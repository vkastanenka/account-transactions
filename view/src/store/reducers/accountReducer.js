// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const setTransactionDetails = (state, action) => {
  return updateObject(state, action.payload);
};

// Create the reducer
export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_TRANS_DETAILS:
      return setTransactionDetails(state, action);
    case actionTypes.CLEAR_TRANS_DETAILS:
      return {};
    default:
      return state;
  }
}
