import React from "react";
import Button from "./Button";

export default function WhiteWithGreenBorderButton({
  children,
  onClick,
  type,
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      buttonClass="btnKawaaGreenVide text-center shadow-lg shadow-green text-white font-bold py-2 px-4 mr-2"
    >
      {children}
    </Button>
  );
}
