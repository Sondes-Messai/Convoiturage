import React from "react";

export const CalendarIcon = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g>
        <path
          d="M901.429,230.572h-55.727v-39.748c0-8.284-6.716-15-15-15s-15,6.716-15,15v39.748H602.714v-40.323c0-8.284-6.716-15-15-15
				s-15,6.716-15,15v40.323H360.568v-40.323c0-8.284-6.716-15-15-15s-15,6.716-15,15v40.323H270c-57.897,0-105,47.103-105,105v567.143
				c0,57.897,47.103,105,105,105h631.429c57.897,0,105-47.103,105-105V335.572C1006.429,277.675,959.326,230.572,901.429,230.572z
				M270,260.572h60.568v39.171c0,8.284,6.716,15,15,15s15-6.716,15-15v-39.171h212.146v39.171c0,8.284,6.716,15,15,15s15-6.716,15-15
				v-39.171h212.988v39.747c0,8.284,6.716,15,15,15s15-6.716,15-15v-39.747h55.727c41.355,0,75,33.645,75,75v109.286H195V335.572
				C195,294.217,228.645,260.572,270,260.572z M901.429,977.714H270c-41.355,0-75-33.645-75-75V474.857h781.429v427.857
				C976.429,944.07,942.784,977.714,901.429,977.714z"
        />
        <circle cx="375" cy="630.857" r="51.429" />
        <circle cx="375" cy="803.857" r="51.429" />
        <ellipse
          transform="matrix(0.9665 -0.2567 0.2567 0.9665 -142.2321 171.9813)"
          cx="587.714"
          cy="630.857"
          rx="51.429"
          ry="51.429"
        />
        <ellipse
          transform="matrix(0.9436 -0.331 0.331 0.9436 -232.8416 239.8337)"
          cx="587.714"
          cy="803.524"
          rx="51.429"
          ry="51.429"
        />
        <circle cx="800.429" cy="630.857" r="51.429" />
        <circle cx="800.429" cy="803.857" r="51.429" />
      </g>
    </svg>
  );
};
