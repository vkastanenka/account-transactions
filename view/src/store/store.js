// React
import React, { createContext, useReducer } from "react";

// Reducers
import rootReducer from "./reducers";

// State
const initialState = {
  acc: {},
  err: {},
  auth: {
    user: null,
    isAuth: false,
  },
};

// Create the context
const StoreContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StateProvider };
