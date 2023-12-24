import React from "react";

export const AccueilWave = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 1440 424"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M0 423V0H1440V224.966C1440 224.966 1383.05 395.152 965.453 242.128C547.853 89.1036 61.3828 7.50649 0 300Z"
        fill="url(#gradient)"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1="-491.499"
          y1="-9020.56"
          x2="2110.12"
          y2="-8991.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#87BB34" />
          <stop offset="1" stopColor="#00A0E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
