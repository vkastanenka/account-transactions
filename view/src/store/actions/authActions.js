// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import decodeToken from "../../utils/decodeToken";
import setAuthToken from "../../utils/setAuthToken";

/////////////////
// Public Routes

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
export const register = async (userData, dispatch) => {
  try {
    await axios.post("/api/v1/users/register", userData);
  } catch (err) {
    dispatch({ type: actionTypes.GET_ERRORS, payload: err.response.data });
  }
};

// @route   POST api/v1/users/login
// @desc    Login User / JWT Response => Sets LS and auth headers
// @access  Public
export const login = async (userData, dispatch) => {
  try {
    const res = await axios.post(
      "/api/v1/users/login",
      userData
    );
    const decoded = decodeToken(res.data.token);
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: decoded });
  } catch (err) {
    dispatch({ type: actionTypes.GET_ERRORS, payload: err.response.data });
  }
};

// Logout user => Removes JWT from LS and auth headers
export const logout = (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({ type: actionTypes.SET_CURRENT_USER, payload: {} });
};
