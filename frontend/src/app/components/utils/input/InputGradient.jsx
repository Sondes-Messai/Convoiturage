import React from "react";

function InputGradient(props) {
  return (
    <button
      className="rounded-full px-1 py-1 border-gradient-full flex items-center justify-between mr-3"
      onMouseOver={props.onHover}
      onMouseLeave={props.onLeave}
    >
      {props.children}
    </button>
  );
}

export default InputGradient;
