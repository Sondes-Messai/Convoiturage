import React, { useRef, useState } from "react";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { EditIcon } from "../../assets/icons/EditIcon";

function FormTextInput(props) {
  const [isFocus, setFocus] = useState(false);
  const ref = useRef(null);

  return (
    <div
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="h-11 w-full py-2 pl-5 bg-grey-afpa-light rounded-3xl flex justify-between box-border focus-within:border-green-afpa focus-within:border-2"
    >
      <input
        disabled={props.disabled ? true : false}
        type="text"
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={props.className}
        ref={ref}
        autoComplete="off"
      />
      {props.disabled ? (
        !isFocus ? (
          <button
            type="button"
            className="mr-3"
            disabled={props.disabled ? true : false}
          ></button>
        ) : (
          <button
            type="button"
            className="mr-3"
            onClick={() => (ref.current.value = "")}
            disabled={props.disabled ? true : false}
          ></button>
        )
      ) : !isFocus ? (
        <button type="button" className="mr-3">
          <EditIcon width="20px" height="20px" className="fill-grey-afpa" />
        </button>
      ) : (
        <button
          type="button"
          className="mr-3"
          onClick={() => (ref.current.value = "")}
        >
          <DeleteIcon width="20px" height="20px" className="fill-grey-afpa" />
        </button>
      )}
    </div>
  );
}

export default FormTextInput;
