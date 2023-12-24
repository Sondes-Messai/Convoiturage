import React from "react";

export const NavIcon = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 42 42"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g filter="url(#filter0_i_249_786)">
        <path d="M20.4429 3.98999C12.4141 3.98999 5.88202 10.4538 5.95024 18.4144C6.01814 24.8104 11.8015 30.9339 16.0201 34.608C18.5376 36.7173 20.4429 38.01 20.4429 38.01C20.4429 38.01 22.4839 36.7855 25.0014 34.608C29.016 31.206 34.3229 25.4227 34.9355 18.4826C35.5477 10.4538 28.4034 3.98999 20.4429 3.98999ZM20.461 21.6695C17.9649 21.6695 15.9414 19.6461 15.9414 17.15C15.9414 14.6539 17.9649 12.6304 20.461 12.6304C22.9571 12.6304 24.9805 14.6539 24.9805 17.15C24.9805 19.646 22.957 21.6695 20.461 21.6695Z" />
      </g>
      <defs>
        <filter
          id="filter0_i_249_786"
          x="0"
          y="0"
          width="42"
          height="46"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_249_786"
          />
        </filter>
      </defs>
    </svg>
  );
};
