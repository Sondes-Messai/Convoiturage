import React from "react";

export const ArchiveIcon = ({width,height,className,isActive}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1031.067,669.688c-8.159-13.795-22.6-22.054-38.627-22.091l-138.868-0.324v-57.624c0-26.912-16.185-50.659-41.231-60.498
		l-8.283-3.255c-7.712-3.029-16.417,0.765-19.447,8.475c-3.029,7.711,0.765,16.417,8.475,19.447l8.285,3.256
		c13.487,5.298,22.202,18.084,22.202,32.575v57.555l-49.024-0.114v-310.28c0-0.165-0.019-0.325-0.025-0.488
		c-0.009-0.276-0.018-0.551-0.042-0.826c-0.021-0.236-0.053-0.469-0.085-0.702c-0.034-0.25-0.068-0.499-0.114-0.748
		c-0.046-0.245-0.102-0.485-0.159-0.725c-0.056-0.234-0.112-0.466-0.179-0.698c-0.07-0.24-0.149-0.475-0.23-0.71
		c-0.079-0.228-0.158-0.454-0.248-0.679c-0.091-0.228-0.191-0.45-0.293-0.672c-0.102-0.223-0.206-0.444-0.319-0.663
		c-0.113-0.217-0.235-0.429-0.358-0.64c-0.122-0.209-0.245-0.418-0.378-0.623c-0.141-0.216-0.291-0.424-0.443-0.632
		c-0.135-0.186-0.269-0.372-0.414-0.553c-0.177-0.221-0.365-0.431-0.553-0.642c-0.106-0.118-0.199-0.243-0.309-0.359
		L666.328,217.437c-3.756-3.934-9.028-6.19-14.468-6.19H349.245c-35.937,0-65.174,29.237-65.174,65.174v550.056
		c0,8.284,6.716,15,15,15s15-6.716,15-15V276.42c0-19.395,15.779-35.174,35.174-35.174h298.337l96.966,101.573v304.199
		l-284.47-0.663c-24.058-0.041-46.111,13.106-57.472,34.351L233.868,996.285h-4.439c-19.299,0-35-15.701-35-35v-443
		c0-19.299,15.701-35,35-35H255c8.284,0,15-6.716,15-15s-6.716-15-15-15h-25.571c-35.841,0-65,29.159-65,65v443
		c0,35.841,29.159,65,65,65h13.119c0.1,0.002,0.197,0.003,0.297,0.003c0.099,0,0.197-0.001,0.296-0.003h579.541
		c23.776,0,45.632-12.961,57.036-33.824l152.104-278.282C1039.509,700.116,1039.227,683.483,1031.067,669.688z M1005.497,699.79
		L853.394,978.073c-6.141,11.234-17.909,18.213-30.712,18.213H267.888l161.174-301.433c6.104-11.416,17.924-18.497,30.864-18.497
		c0.026,0,0.056,0,0.082,0l378.561,0.883c0.001,0,0.003,0,0.004,0s0.002,0,0.003,0l153.794,0.359
		c7.701,0.018,11.57,5.155,12.876,7.363S1009.19,693.034,1005.497,699.79z"
        fill={isActive ? "url(#paint1_linear_2572_6057)" : ""}
      />
      <path
        d="M395,406.143h273c8.284,0,15-6.716,15-15s-6.716-15-15-15H395c-8.284,0-15,6.716-15,15S386.716,406.143,395,406.143z"
        fill={isActive ? "url(#paint1_linear_2572_6057)" : ""}
      />
      <path
        d="M395,498.143h273c8.284,0,15-6.716,15-15s-6.716-15-15-15H395c-8.284,0-15,6.716-15,15S386.716,498.143,395,498.143z"
        fill={isActive ? "url(#paint1_linear_2572_6057)" : ""}
      />
      <path
        d="M395,587.34h273c8.284,0,15-6.716,15-15s-6.716-15-15-15H395c-8.284,0-15,6.716-15,15S386.716,587.34,395,587.34z"
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