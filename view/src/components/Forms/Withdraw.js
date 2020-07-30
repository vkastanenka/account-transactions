// React
import React, { useReducer, useContext, useEffect } from "react";
import { StoreContext } from "../../store/store";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";

// Actions
import { withdrawLoad } from "../../store/actions/accountActions";

// Action Types
import * as actionTypes from "../../store/actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  withdraw: "",
  submitted: false,
  submitting: false,
  submitSuccess: false,
  disableSubmitButton: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setWithdrawal":
      return updateObject(state, { withdraw: action.payload });
    case "isSubmitting":
      return updateObject(state, {
        submitted: false,
        submitting: true,
        submitSuccess: false,
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
        withdraw: "",
        submitSuccess: true,
      });
    default:
      return state;
  }
};

// Make a post request for withdraw transaction
const onWithdrawSubmit = async (
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

  const date = new Date();

  // Withdraw data to post
  const transaction = {
    time: date.toISOString(),
    amount: Number(state.withdraw),
  };

  // POST request
  await withdrawLoad(transaction, globalDispatch);

  dispatch({ type: "submitted" });
};

const Withdraw = (props) => {
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
    <>
      {Object.values(globalState.acc).length ? (
        <Alert
          type="success"
          entries={Object.values(globalState.acc)}
          close={() =>
            globalDispatch({ type: actionTypes.CLEAR_TRANS_DETAILS })
          }
        />
      ) : null}
      {Object.values(globalState.err).length ? (
        <Alert
          type="error"
          entries={Object.values(globalState.err)}
          close={() => globalDispatch({ type: actionTypes.CLEAR_ERRORS })}
        />
      ) : null}
      <a className="heading-tertiary ma-bt-md" onClick={props.redirect}>
        Back to account options
      </a>
      <form
        className="form"
        onSubmit={(e) =>
          onWithdrawSubmit(e, state, globalState, dispatch, globalDispatch)
        }
      >
        <h2 className="heading-secondary ma-bt-sm">
          Choose an amount to withdraw
        </h2>
        <InputGroup
          type="number"
          name="withdraw"
          id="withdraw"
          placeholder="Withdraw amount"
          label="Withdraw amount"
          value={state.withdraw}
          required={true}
          onChange={(e) =>
            dispatch({ type: "setWithdrawal", payload: e.target.value })
          }
          htmlFor="withdraw"
          err={globalState.err.amount}
        />
        <div className="form__group">
          <button
            type="submit"
            className="btn btn--primary"
            disabled={state.disableSubmitButton}
          >
            {!state.submitting
              ? "Submit withdrawal"
              : "Submitting withdrawal..."}
          </button>
        </div>
      </form>
    </>
  );
};

export default Withdraw;
