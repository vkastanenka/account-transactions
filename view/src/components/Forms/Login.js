// React
import React, { useReducer, useContext, useEffect } from "react";
import { StoreContext } from "../../store/store";

// Components
import InputGroup from "../Inputs/InputGroup";

// Actions
import { login } from "../../store/actions/authActions";

// Action Types
import * as actionTypes from "../../store/actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  loginEmail: "",
  loginPassword: "",
  submitting: false,
  submitted: false,
  disableSubmitButton: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return updateObject(state, { loginEmail: action.payload });
    case "setPassword":
      return updateObject(state, { loginPassword: action.payload });
    case "isSubmitting":
      return updateObject(state, {
        submitting: true,
        disableSubmitButton: true,
      });
    case "submitted":
      return updateObject(state, {
        submitting: false,
        disableSubmitButton: false,
      });
    default:
      return state;
  }
};

// Make a post request to login a user
const onLoginSubmit = async (
  e,
  state,
  globalState,
  dispatch,
  globalDispatch
) => {
  e.preventDefault();
  dispatch({ type: "isSubmitting" });
  if (Object.keys(globalState.err).length) {
    globalDispatch({ type: actionTypes.CLEAR_ERRORS });
  }

  // User data to post
  const newUser = {
    loginEmail: state.loginEmail,
    loginPassword: state.loginPassword,
  };

  // Login user and get JWT
  await login(newUser, globalDispatch);
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalStateContext = useContext(StoreContext);
  const globalState = globalStateContext.state;
  const globalDispatch = globalStateContext.dispatch;

  // Revert submitting if there are errors
  useEffect(() => {
    if (state.submitting && Object.keys(globalState.err).length) {
      dispatch({ type: "submitted" });
    }
  }, [state.submitting, globalState.err]);

  return (
    <form
      className="form"
      onSubmit={(e) =>
        onLoginSubmit(e, state, globalState, dispatch, globalDispatch)
      }
    >
      <h2 className="heading-primary ma-bt-sm">Login</h2>
      <InputGroup
        type="email"
        name="loginEmail"
        id="email"
        placeholder="Email address"
        value={state.loginEmail}
        required={true}
        onChange={(e) =>
          dispatch({ type: "setEmail", payload: e.target.value })
        }
        htmlFor="loginEmail"
        label="Email address"
        err={globalState.err.loginEmail}
      />
      <InputGroup
        type="password"
        name="loginPassword"
        id="loginPassword"
        placeholder="Password"
        value={state.loginPassword}
        required={true}
        onChange={(e) =>
          dispatch({ type: "setPassword", payload: e.target.value })
        }
        htmlFor="loginPassword"
        label="Password"
        err={globalState.err.loginPassword}
      />
      <div className="form__group ma-bt-md">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={state.disableSubmitButton}
        >
          {!state.submitting ? "Login" : "Logging In..."}
        </button>
      </div>
    </form>
  );
};

export default Login;
