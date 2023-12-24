import React from "react";
import Button from "./Button";

export default function ModalButton({
  children,
  onClick,
  type,
  cas
}) {
    function appliquerClasseCSS(cas) {
        switch (cas) {
          case "success":
            return "mr-2 px-4 py-2 text-red-500 bg-white rounded hover:font-bold";
          default:
            return "px-4 py-2 text-grey-afpa-dark bg-white rounded hover:font-bold";
        }
      }
    
  return (
    <Button
      type={type}
      onClick={onClick}
      buttonClass={`${appliquerClasseCSS(cas)}`}
    >
      {children}
    </Button>
  );
}
