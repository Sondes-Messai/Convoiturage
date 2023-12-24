import React from "react";
import { useState, useRef } from "react";
import { DeleteIcon } from "../../../assets/icons/Icons";

function InputClear(props) {
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleValueChange = (event) => {
    props.passValue(event.target.id, event.target.value);
    setInputValue(event.target.value)
  };

  const resetValue = () => {
    setInputValue("");
    props.passValue(props.name, "");
  }

  return (
    <div className="input-container relative my-2">
      <label
        className="text-grey-afpa ml-3 text-xs"
        htmlFor={props.name}>
        {props.label}
        <input onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 230)}
          value={inputValue}
          name={props.name}
          id={props.name}
          onChange={handleValueChange}
          className="input-preference"
        />
      </label>
      {isFocus ?
        <button type="button" className="mr-3 absolute float-right top-9 right-0" onClick={() => resetValue()}>
          <DeleteIcon width="30px" height="30px" className="fill-grey-afpa" />
        </button>
        : null}
    </div>
  )

}
export default InputClear