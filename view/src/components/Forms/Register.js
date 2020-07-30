// React
import React, { useReducer, useContext, useEffect } from "react";
import { StoreContext } from "../../store/store";

// Components
import InputGroup from "../Inputs/InputGroup";

// Actions
import { register } from "../../store/actions/authActions";

// Action Types
import * as actionTypes from "../../store/actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  registerEmail: "",
  registerName: "",
  registerPassword: "",
  registerPasswordConfirm: "",
  submitted: false,
  submitting: false,
  disableSubmitButton: false,
  newRegister: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return updateObject(state, { registerEmail: action.payload });
    case "setName":
      return updateObject(state, { registerName: action.payload });
    case "setPassword":
      return updateObject(state, { registerPassword: action.payload });
    case "setPasswordConfirm":
      return updateObject(state, { registerPasswordConfirm: action.payload });
    case "isSubmitting":
      return updateObject(state, {
        submitted: false,
        submitting: true,
        disableSubmitButton: true,
      });
    case "submitted":
      return updateObject(state, {
        submitted: true,
        submitting: false,
        disableSubmitButton: false,
      });
    case "submitSuccess":
      return updateObject(state, {
        registerEmail: "",
        registerName: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        newRegister: true,
      });
    default:
      return state;
  }
};

// Make a post request to register a new user
const onRegisterSubmit = async (
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
    registerEmail: state.registerEmail,
    registerName: state.registerName,
    registerPassword: state.registerPassword,
    registerPasswordConfirm: state.registerPasswordConfirm,
  };

  // Register new user in DB
  await register(newUser, globalDispatch);

  dispatch({ type: "submitted" });
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalStateContext = useContext(StoreContext);
  const globalState = globalStateContext.state;
  const globalDispatch = globalStateContext.dispatch;

  // Alert user if registration was successful
  useEffect(() => {
    if (state.submitted && !Object.keys(globalState.err).length) {
      dispatch({ type: "submitSuccess" });
    }
  }, [state.submitted, globalState.err]);

  return (
    <form
      className="form"
      onSubmit={(e) =>
        onRegisterSubmit(e, state, globalState, dispatch, globalDispatch)
      }
    >
      <h2 className="heading-primary ma-bt-sm">
        {!state.newRegister ? "Register" : "Register Successful!"}
      </h2>
      <InputGroup
        type="email"
        name="registerEmail"
        id="registerEmail"
        placeholder="Email address"
        value={state.registerEmail}
        required={true}
        onChange={(e) =>
          dispatch({ type: "setEmail", payload: e.target.value })
        }
        htmlFor="registerEmail"
        label="Email address"
        err={globalState.err.registerEmail}
      />
      <InputGroup
        type="text"
        name="registerName"
        id="registerName"
        placeholder="Full name"
        value={state.registerName}
        required={true}
        onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
        htmlFor="registerName"
        label="Full name"
        err={globalState.err.registerName}
      />
      <InputGroup
        type="password"
        name="registerPassword"
        id="registerPassword"
        placeholder="Password"
        value={state.registerPassword}
        required={true}
        onChange={(e) =>
          dispatch({ type: "setPassword", payload: e.target.value })
        }
        htmlFor="registerPassword"
        label="Password"
        err={globalState.err.registerPassword}
      />
      <InputGroup
        type="password"
        name="registerPasswordConfirm"
        id="registerPasswordConfirm"
        placeholder="Confirm Password"
        value={state.registerPasswordConfirm}
        required={true}
        onChange={(e) =>
          dispatch({ type: "setPasswordConfirm", payload: e.target.value })
        }
        htmlFor="registerPasswordConfirm"
        label="Confirm Password"
        err={globalState.err.registerPasswordConfirm}
      />
      <div className="form__group ma-bt-md">
        {!state.newRegister ? (
          <button
            type="submit"
            className="btn btn--primary"
            disabled={state.disableSubmitButton}
          >
            {!state.submitting ? "Register" : "Registering..."}
          </button>
        ) : (
          <p className='heading-secondary'>Thanks for registering! Please log in to get started!</p>
        )}
      </div>
    </form>
  );
};

export default Register;
