import React from "react";
import { Link } from "react-router-dom";

export default function LinkButton({ buttonClass, link, linkClass, children }) {
  return (
    <button className={buttonClass}>
      <Link to={link} className={linkClass}>
        {children}
      </Link>
    </button>
  );
}
