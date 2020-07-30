// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import decodeToken from "../../utils/decodeToken";

////////////////////
// Protected Routes

// @route   Post api/v1/transactions/deposit
// @desc    Deposits a requested amount
// @access  Private
export const depositLoad = async (depositData, dispatch) => {
  try {
    const res = await axios.post(
      "/api/v1/transactions/deposit",
      depositData
    );
    const decoded = decodeToken(res.data.token);
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: decoded });
    dispatch({ type: actionTypes.SET_TRANS_DETAILS, payload: res.data.transDetails });
  } catch (err) {
    dispatch({ type: actionTypes.GET_ERRORS, payload: err.response.data });
  }
};

// @route   Post api/v1/transactions/withdraw
// @desc    Withdraws a requested amount
// @access  Private
export const withdrawLoad = async (depositData, dispatch) => {
  try {
    const res = await axios.post(
      "/api/v1/transactions/withdraw",
      depositData
    );
    const decoded = decodeToken(res.data.token);
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: decoded });
    dispatch({ type: actionTypes.SET_TRANS_DETAILS, payload: res.data.transDetails });
  } catch (err) {
    dispatch({ type: actionTypes.GET_ERRORS, payload: err.response.data });
  }
};