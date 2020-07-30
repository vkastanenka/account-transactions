// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

// Any errors caught will be in state
const getErrors = (state, action) => {
  return updateObject(state, action.payload);
};

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return getErrors(state, action);
    case actionTypes.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
