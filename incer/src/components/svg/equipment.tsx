/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, SVGProps } from 'react';

const SvgEquipament: FC<SVGProps<SVGSVGElement>> = props => {
  const { color } = props;

  return (
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 109.77"
      fill={color}
      {...props}
    >
      <path
        className="cls-1"
        d="M26.13,8.81A17.18,17.18,0,0,0,13.24,4.72c14,11.42-2.58,26.17-11.79,9-3.78,8.49.16,16.31,8,20.33,3.7,1.9,5.65,3,7,4.53a11.73,11.73,0,0,1,1.86,2.92l3.49,8.26H7.11A2.32,2.32,0,0,0,4.8,52.1V93a16.87,16.87,0,0,0,16.82,16.82H96.79A16.87,16.87,0,0,0,113.61,93V52.1a2.32,2.32,0,0,0-2.32-2.32H88.89l13.07-22-9.37-5.4L76.21,49.78H65.79l0-2.86a.57.57,0,0,0-.12-.35c-.5-.6-.88-1-1.2-1.41h0c-.74-.86-1.12-1.29-1.12-1.57s.36-.75,1.09-1.65c.3-.37.66-.81,1.08-1.36a.57.57,0,0,0,.13-.36V37.05a.55.55,0,0,0-.55-.55l-4.85,0,.09-22.09,2.92-5.11a2.85,2.85,0,0,0,.46-1.55l0-5A2.83,2.83,0,0,0,60.82,0L54,0a2.83,2.83,0,0,0-2.79,2.87l.08,5.54A2.79,2.79,0,0,0,51.81,10l2.73,3.91-.09,22.63-5.74,0a.55.55,0,0,0-.55.56v3.1a.54.54,0,0,0,.14.36c.47.52.87,1,1.22,1.32,1,1.07,1.48,1.59,1.49,2s-.41.86-1.19,1.85c-.39.49-.87,1.1-1.44,1.86a.5.5,0,0,0-.12.35v1.86H35.19l-5.5-12.91a12.84,12.84,0,0,1-1.11-3.79,14.19,14.19,0,0,1,.28-3.75c1.33-7.78,4-14.25-2.73-20.52ZM9.43,63.94H109V54.41H9.43v9.53ZM109,68.57H95.13v7.79A3.17,3.17,0,0,1,92,79.53H80.86a3.18,3.18,0,0,1-3.17-3.17V68.57H41.82v7.79a3.18,3.18,0,0,1-3.17,3.17H27.55a3.18,3.18,0,0,1-3.18-3.17V68.57H9.43V93a12.24,12.24,0,0,0,12.19,12.2H96.79A12.24,12.24,0,0,0,109,93V68.57ZM75.29,18.83a15.81,15.81,0,0,1,5.3-2.57,10.13,10.13,0,0,1,7.87.85l20.38,11.75L107.61,31l7.75,4.51,7.52-13L115.14,18l-1.4,2.36L93.48,8.68a10.31,10.31,0,0,0-8-1.38c-4.24,1.14-7.65,5-10.23,11.53Z"
      />
    </svg>
  );
};

export default SvgEquipament;
