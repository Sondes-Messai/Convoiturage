import React from "react";

function CurrentPageBar({text}) {
  return (
    <div className="gradient h-14 w-full flex justify-center items-center">
      <span className="font-jakartaSans text-2xl font-bold text-white">
        {text}
      </span>
    </div>
  );
}
export default CurrentPageBar;
