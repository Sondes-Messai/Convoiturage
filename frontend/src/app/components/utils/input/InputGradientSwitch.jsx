import React from "react";

function InputGradientSwitch(props) {
  return (
    <button
      className={
        props.isActive
          ? " px-1 py-1 border-gradient-full flex items-center justify-center rounded-3xl w-28 h-11 m-6 "
          : " rounded-3xl w-28 h-11 px-1 py-1 border-gradient-button flex items-center justify-center m-6  "
      }
      onClick={props.onClick}
    >
      <span className={props.isActive ? "text-white" : "text-gradient"}>
        {props.children}
      </span>
    </button>
  );
}

export default InputGradientSwitch;
