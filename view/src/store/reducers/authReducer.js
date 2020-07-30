// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import isEmpty from "../../utils/isEmpty";
import updateObject from "../../utils/updateObject";

// Shows if user is authenticated and assigns data from JWT
const setCurrentUser = (state, action) => {
  return updateObject(state.auth, {
    isAuth: !isEmpty(action.payload),
    user: action.payload,
  });
};

// Create the reducer
export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return setCurrentUser(state, action);
    default:
      return state;
  }
}
