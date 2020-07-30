import React, { useContext, useEffect } from "react";
import "./assets/css/style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Global State
import { StoreContext } from "./store/store";

// Actions
import * as actionTypes from "./store/actions/actionTypes";

// Pages
import Account from "./pages/Account/Account";
import Landing from "./pages/Landing/Landing";
import Authenticate from "./pages/Authenticate/Authenticate";

// Utilities
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

function App() {
  const globalStateContext = useContext(StoreContext);
  const { dispatch } = globalStateContext;

  useEffect(() => {
    // Check for jwt
    if (localStorage.jwtToken) {
      // Set authorization headers and user from jwt
      setAuthToken(localStorage.jwtToken);
      const decoded = jwtDecode(localStorage.jwtToken);

      // Check for token expiration and logout if expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch({ type: actionTypes.SET_CURRENT_USER, payload: {} });
        window.location.href = "/";
      } else {
        dispatch({ type: actionTypes.SET_CURRENT_USER, payload: decoded });
      }
    }
  }, []);

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/authenticate/:type" component={Authenticate} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
