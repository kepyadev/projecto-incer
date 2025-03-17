/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, SVGProps } from 'react';

const SvgBlog: FC<SVGProps<SVGSVGElement>> = props => {
  const { color } = props;
  return (
    <svg
      width="100%"
      height="100%"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 68.04"
      xmlSpace="preserve"
      {...props}
    >
      <g>
        <path d="M2.03,56.52c-2.66,2.58-2.72,6.83-0.13,9.49c2.58,2.66,6.83,2.72,9.49,0.13l27.65-26.98l23.12,22.31 c2.67,2.57,6.92,2.49,9.49-0.18l37.77-38.22v19.27c0,3.72,3.01,6.73,6.73,6.73s6.73-3.01,6.73-6.73V6.71h-0.02 c0-1.74-0.67-3.47-2-4.78c-1.41-1.39-3.29-2.03-5.13-1.91H82.4c-3.72,0-6.73,3.01-6.73,6.73c0,3.72,3.01,6.73,6.73,6.73h17.63 L66.7,47.2L43.67,24.97c-2.6-2.5-6.73-2.51-9.33,0.03L2.03,56.52L2.03,56.52z" />
      </g>
    </svg>
  );
};

export default SvgBlog;
