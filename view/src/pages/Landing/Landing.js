// React
import React, { useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { StoreContext } from "../../store/store";

// Components
import Card from "../../components/HigherOrder/Card";

const Landing = (props) => {
  const globalStateContext = useContext(StoreContext);
  const { state } = globalStateContext;

  useEffect(() => {
    // If authenticated, push the user to their account
    if (state.auth.isAuth) props.history.push("/account");
  }, [state.auth.isAuth]);

  return (
    <Card>
      <header className="ma-bt-xlg">
        <h1 className="heading-primary ma-bt-sm">
          KOHO Assignment Application
        </h1>
        <h2 className="heading-secondary">
          Create an account, make deposits, and withdrawals
        </h2>
      </header>
      <main>
        <h3 className="heading-secondary ma-bt-md">
          Login or register to get started
        </h3>
        <div className="landing__authenticate-links">
          <Link to="/authenticate/login" className="heading-tertiary">
            Login
          </Link>
          <Link to="/authenticate/register" className="heading-tertiary">
            Register
          </Link>
        </div>
      </main>
    </Card>
  );
};

export default withRouter(Landing);
