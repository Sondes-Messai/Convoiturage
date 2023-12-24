import React from "react";
import LinkButton from "./LinkButton";

export default function LinkGradientButton({ link, children,cas}) {
    function appliquerClasseCSS(cas) {
        switch (cas) {
          case "404":
            return "p-3 border-gradient-full text-white rounded-3xl";
      
      
          default:
            return "rounded-3xl px-4 py-1 border-gradient-full";
        }
      }
      
  return (
    <LinkButton
      buttonClass={`${appliquerClasseCSS(cas)}`}
      link={link}
      linkClass="text-white font-jakartaSans"
    >
      {children}
    </LinkButton>
  );
}