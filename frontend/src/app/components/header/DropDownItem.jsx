import React from "react";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";

function DropDownItem({ onClick, children, text, link }) {
  return (
    <li
      className="h-14 w-full flex justify-between px-4 items-center hover:bg-grey-afpa-light cursor-pointer group/item"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className="flex items-center">
        {children}
        <Link to={link} className="justify-self-start font-jakartaSans">
          {text}
        </Link>
      </div>
      <ArrowIcon
        width="20px"
        height="20px"
        className={"group-hover/item:fill-rose-afpa"}
      />
    </li>
  );
}

export default DropDownItem;
