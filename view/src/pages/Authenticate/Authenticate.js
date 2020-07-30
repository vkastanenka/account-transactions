// React
import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { StoreContext } from "../../store/store";

// Components
import Card from "../../components/HigherOrder/Card";
import Login from "../../components/Forms/Login";
import Register from "../../components/Forms/Register";

const Authenticate = (props) => {
  const [page, setPage] = useState("");
  const globalStateContext = useContext(StoreContext);
  const { state } = globalStateContext;

  useEffect(() => {
    // If authenticated, push the user to their account
    if (state.auth.isAuth) props.history.push("/account");

    // Render the proper authentication form based on url params
    if (props.match.params.type === "login") setPage("login");
    else if (props.match.params.type === "register") setPage("register");
  }, [props.match.params.type, state.auth.isAuth]);

  return (
    <Card>
      <>
        {page === "login" ? (
          <Login />
        ) : (
          <Register setPage={() => setPage("login")} />
        )}
        {page === "login" ? (
          <>
            <h3 className="heading-tertiary ma-bt-sm">Need to register?</h3>
            <Link className="text-primary" to="/authenticate/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <h3 className="heading-tertiary ma-bt-sm">Already registered?</h3>
            <Link className="text-primary" to="/authenticate/login">
              Login
            </Link>
          </>
        )}
      </>
    </Card>
  );
};

export default withRouter(Authenticate);
