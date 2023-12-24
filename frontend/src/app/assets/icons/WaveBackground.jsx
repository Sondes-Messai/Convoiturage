import React from "react";

export const WaveBackground = (props) => {
  return (
    <svg
      preserveAspectRatio="none"
      width={props.width}
      height={props.height}
      className={props.className}
      viewBox="0 0 1440 465"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1324.91 464.076C1364.28 464.076 1402.75 460.29 1440 453.062V0H740.393H0V302.356C509.864 -294.736 898.721 464.076 1324.91 464.076Z"
        fill="url(#paint0_linear_104_692)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_104_692"
          x1="-491.499"
          y1="-9896.52"
          x2="2110.17"
          y2="-9869.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#87BB34" />
          <stop offset="1" stopColor="#00A0E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
