import React from "react";

export default function Button({ buttonClass, children,onClick,type }) {
  return (
    <button className={buttonClass} onClick={onClick} type={type}>
        {children}
    </button>
  );
}
