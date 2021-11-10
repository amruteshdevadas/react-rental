import React from "react";

function Message(props) {
const {message,variant} = props;
  return (
      <div className={variant} role="alert">
        {message}
      </div>
  );
}

export default Message;
