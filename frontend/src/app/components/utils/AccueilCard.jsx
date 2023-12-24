import React from "react";

function AccueilCard(props) {
  return (
    <div className="mb-4 pb-10 w-[300px] bg-white relative flex flex-col justify-between items-center">
      <div className="relative h-[90px] w-[90px] bg-white shadow-2xl rounded-full -top-10 flex justify-center items-center">
        {props.icon}
      </div>
      <div className="mt-4 flex flex-col px-6">{props.children}</div>
      <div className="gradient w-full"></div>
    </div>
  );
}

export default AccueilCard;
