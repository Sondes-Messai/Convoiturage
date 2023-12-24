import React from "react";

export const PlusIconInverted = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M15 28.125C22.2487 28.125 28.125 22.2487 28.125 15C28.125 7.75126 22.2487 1.875 15 1.875C7.75126 1.875 1.875 7.75126 1.875 15C1.875 22.2487 7.75126 28.125 15 28.125Z"
        fill="url(#paint0_linear_1076_2040)"
      />
      <path d="M9.375 15H20.625H9.375Z" fill="white" />
      <path
        d="M9.375 15H20.625"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9.375V20.625"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1076_2040"
          x1="-4.46322"
          y1="-564.733"
          x2="43.7806"
          y2="-564.574"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#87BB34" />
          <stop offset="1" stopColor="#00A0E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
