// React
import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { StoreContext } from "../../store/store";

// Actions
import { logout } from "../../store/actions/authActions";

const Card = (props) => {
  const globalStoreContext = useContext(StoreContext);
  const { dispatch } = globalStoreContext;

  let logoutLink;
  if (props.history.location.pathname === "/account") {
    logoutLink = (
      <h2
        to="/"
        onClick={() => logout(dispatch)}
        className="card__link heading-secondary heading-active"
      >
        Logout
      </h2>
    );
  }
  return (
    <div className="card ta-center">
      {logoutLink}
      {props.children}
    </div>
  );
};

export default withRouter(Card);
