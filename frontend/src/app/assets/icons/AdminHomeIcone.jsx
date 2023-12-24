import React from "react";

export const AdminHomeIcone = ({width,height,className,isActive}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M26.5705 33.8647H14.5908C11.626 33.8647 9.21396 31.4527 9.21396 28.4879V21.5981C9.21396 21.2299 9.51243 20.9314 9.88063 20.9314C10.2488 20.9314 10.5473 21.2299 10.5473 21.5981V28.4879C10.5473 30.7175 12.3612 32.5314 14.5908 32.5314H26.5705C28.8001 32.5314 30.614 30.7175 30.614 28.4879V21.5314C30.614 21.1632 30.9125 20.8647 31.2807 20.8647C31.6489 20.8647 31.9473 21.1632 31.9473 21.5314V28.4879C31.9473 31.4527 29.5353 33.8647 26.5705 33.8647Z"
        fill={isActive ? "url(#paint0_linear_2572_6057)" : ""}
      />
      <path
        d="M34.5549 20.8374C34.3847 20.8374 34.2144 20.7726 34.0843 20.6429L20.5547 7.15466L7.0779 20.642C6.81767 20.9024 6.39557 20.9026 6.1351 20.6423C5.87467 20.3821 5.8745 19.96 6.13473 19.6995L19.8468 5.97669C20.2361 5.58706 20.8702 5.58649 21.2602 5.97532L35.0256 19.6986C35.2864 19.9586 35.287 20.3807 35.0271 20.6414C34.8968 20.772 34.7259 20.8374 34.5549 20.8374Z"
        fill={isActive ? "url(#paint1_linear_2572_6057)" : ""}
      />
      {isActive ? (
        <defs>
          <linearGradient
            id="paint0_linear_2572_6057"
            x1="1.45463"
            y1="-256.362"
            x2="42.5303"
            y2="-256.126"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#87BB34" />
            <stop offset="1" stopColor="#00A0E0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2572_6057"
            x1="-4.05481"
            y1="-317.464"
            x2="48.8527"
            y2="-317.128"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#87BB34" />
            <stop offset="1" stopColor="#00A0E0" />
          </linearGradient>
        </defs>
      ) : (
        <defs></defs>
      )}
    </svg>
  );
};
