import React from "react";

export const JourneyIcon = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 30 98"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <circle
        cx="15"
        cy="15"
        r="14.35"
        stroke="#87BB34"
        fill="none"
        strokeWidth="1.3"
      />
      <circle
        cx="15"
        cy="83"
        r="14.35"
        stroke="#87BB34"
        fill="none"
        strokeWidth="1.3"
      />
      <circle cx="15" cy="15" r="5" fill="#87BB34" />
      <circle cx="15" cy="83" r="5" fill="#87BB34" />
      <line
        x1="14.65"
        y1="30"
        x2="14.65"
        y2="68"
        stroke="#87BB34"
        strokeWidth="1.3"
      />
    </svg>
  );
};
