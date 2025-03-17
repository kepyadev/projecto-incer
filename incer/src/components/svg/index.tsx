import React, { FC } from 'react';
import { v4 } from 'uuid';

interface SVGProps {
  style?: {};
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
  viewBox?: string;
  paths: string[];
}
const SVG: FC<SVGProps> = ({
  style = {},
  fill = '#fff',
  width = '100%',
  height = '100%',
  className = '',
  viewBox = '0 0 32 32',
  paths,
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {paths.map(path => (
      <path d={path} fill={fill} key={v4()} />
    ))}
  </svg>
);

export default SVG;
