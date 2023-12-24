import React from "react";

export const JourneyLandscapeIcon = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 98 30"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <circle cx="15" cy="15" r="5" fill="#87BB34" />
      <circle cx="83" cy="15" r="5" fill="#87BB34" />
      <line
        x1="15"
        y1="15"
        x2="83"
        y2="15"
        stroke="#87BB34"
        strokeWidth="1.3"
      />
    </svg>
  );
};
