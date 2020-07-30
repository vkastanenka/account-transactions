// React
import React from "react";
import PropTypes from "prop-types";

// Alert that appears at the type of the page
const Alert = (props) => {
  let content, close;
  if (props.entries) {
    const entries = props.entries.map((entry, i) => <li key={i}>{entry}</li>);
    content = <ul>{entries}</ul>;
  }

  if (props.close) {
    close = <a className='alert__close' onClick={props.close}>Dismiss</a>;
  }

  return (
    <div className={`alert alert--${props.type}`}>
      {props.entries ? content : props.children}
      {close}
    </div>
  );
};

Alert.propTypes = {
  entries: PropTypes.array,
  type: PropTypes.string.isRequired,
};

export default Alert;
