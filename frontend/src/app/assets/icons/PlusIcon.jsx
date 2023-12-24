import React from "react";

export const PlusIcon = (props) => {
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
        fill="#F1F1F1"
      />
      <path d="M9.375 15H20.625H9.375Z" fill="white" />
      <path
        d="M9.375 15H20.625"
        stroke="url(#paint0_linear_2006_336)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9.375V20.625"
        stroke="url(#paint1_linear_2006_336)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2006_336"
          x1="5.53516"
          y1="-6.3252"
          x2="25.8351"
          y2="-5.57471"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#87BB34" />
          <stop offset="1" stopColor="#00A0E0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2006_336"
          x1="14.6587"
          y1="-230.534"
          x2="16.4656"
          y2="-230.533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#87BB34" />
          <stop offset="1" stopColor="#00A0E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
