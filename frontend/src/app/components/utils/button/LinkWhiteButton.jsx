import React from "react";
import LinkButton from "./LinkButton";

export default function LinkWhiteButton({ link, children }) {
  return (
    <LinkButton
      buttonClass="rounded-full bg-white mr-3 px-4 py-1 border-2 border-gradient-white text-lime-500 font-jakartaSans text-gradient"
      link={link}
      linkClass="text-lime-500 font-jakartaSans text-gradient"
    >
      {children}
    </LinkButton>
  );
}
