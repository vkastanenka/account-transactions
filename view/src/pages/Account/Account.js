// React
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { StoreContext } from "../../store/store";

// Utils
import { numToCurrency } from "../../utils/currency";

// Components
import Card from "../../components/HigherOrder/Card";
import Deposit from "../../components/Forms/Deposit";
import Withdraw from "../../components/Forms/Withdraw";

const Account = (props) => {
  const [accAction, setAccAction] = useState("");
  const globalStateContext = useContext(StoreContext);
  const { isAuth, user } = globalStateContext.state.auth;

  let content;
  let accountTotal;
  if (user && isAuth) accountTotal = numToCurrency(user.account.total);

  useEffect(() => {
    // If not authenticated, push the user to their account
    if (!isAuth) props.history.push("/");
  }, [isAuth]);

  if (!accAction) {
    content = (
      <ul className="account__links">
        <li className="account__link text-primary heading-active fw-medium" onClick={() => setAccAction("deposit")}>
          Make a deposit
        </li>
        <li className="account__link text-primary heading-active fw-medium" onClick={() => setAccAction("withdraw")}>
          Make a withdrawal
        </li>
      </ul>
    );
  } else if (accAction === "deposit") {
    content = <Deposit redirect={() => setAccAction("")} />;
  } else if (accAction === "withdraw") {
    content = <Withdraw redirect={() => setAccAction("")} />;
  }

  return (
    <Card>
      <header className="ma-bt-xlg">
        <h1 className="heading-primary heading-primary--spans">
          <span>Account Total</span>
          <span>{accountTotal}</span>
        </h1>
      </header>
      <ul className="account__content">{content}</ul>
    </Card>
  );
};

export default withRouter(Account);
