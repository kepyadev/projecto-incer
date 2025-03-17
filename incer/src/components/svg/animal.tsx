/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, SVGProps } from 'react';

const SvgAnimal: FC<SVGProps<SVGSVGElement>> = props => {
  const { color } = props;
  return (
    <svg
      width="100%"
      height="100%"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 97.04"
      xmlSpace="preserve"
    >
      <style type="text/css" />
      <g>
        <path
          className="st0"
          d="M115.23,35.52L115.23,35.52L115.23,35.52L115.23,35.52z M56.9,80.17c-0.01,0.24-0.13,0.48-0.33,0.64 L56.9,80.17L56.9,80.17z M30.85,10.84c3.44-0.76,5.31-3.18,7.36-5.39c0.53-0.38,0.94-0.33,1.26,0.06c2.35,2.84-2.99,7.63-5.24,9.23 l3.95,0.02c2.01-0.02,4.31-0.29,6.2,0.44c0.52,0.2,0.84,0.61,1.23,0.98c-0.23,0.37-0.46,0.73-0.7,1.07 c5.16,1.41,14.73,1.62,24.97,0.84c10.09-0.77,20.79-2.5,28.51-5.01c0.62-0.36,1.32-0.64,2.13-0.78c0.84-0.14,1.78-0.12,2.84,0.14 l0.17,0.04l0,0v0c4.16,1.05,7.35,2.85,9.65,5.19c0.11,0.01,0.23,0.04,0.34,0.09c4.67,2.37,7.43,6,8.64,10.35 c1.31,4.74,0.76,10.31-1.18,16.03c-0.44,1.31-0.7,2.26-0.86,3.17c-0.16,0.92-0.23,1.82-0.29,2.99c0,0.06-0.01,0.11-0.02,0.16 c1.18,0.93,1.67,3.45,1.25,6.77c-0.32,1.58-1.01,2.93-1.97,3.7c-1.58-0.35-2-3.22-2.15-4.58c-0.26-2.4-0.19-4.56,1.21-5.71 c-0.07-0.13-0.1-0.28-0.09-0.44c0.07-1.25,0.14-2.21,0.31-3.2c0.17-1.01,0.45-2.04,0.93-3.44c1.84-5.39,2.37-10.61,1.15-14.98 c-0.77-2.76-2.24-5.2-4.53-7.14c2.09,4.06,2.37,9,1.09,14.21l-0.03,0.14l-1.44,10.46c-0.05,0.33-0.09,0.66-0.14,0.99 c-0.7,4.96-1.22,8.72,0.88,13.55c0.21,0.49,0.44,0.94,0.67,1.36c0.24,0.41,0.48,0.8,0.75,1.14c0.04,0.05,0.08,0.11,0.1,0.17 c0.87,1.67,1.27,3.52,1.2,5.42c-0.07,1.86-0.57,3.76-1.52,5.61c-0.65,4.18-0.57,7.6-0.48,11.42c0.03,1.47,0.07,3,0.07,4.42 c0,0.49-0.4,0.89-0.89,0.89c-0.08,0-0.16-0.01-0.23-0.03l-0.11-0.02c-0.03,0.61-0.08,1.2-0.17,1.78c-0.13,0.93-0.35,1.83-0.68,2.69 c-0.11,0.29-0.36,0.49-0.65,0.55l0,0c-1.45,0.3-2.83,0.54-4.1,0.68c-1.29,0.14-2.49,0.18-3.53,0.08c-0.49-0.05-0.85-0.48-0.8-0.97 c0.01-0.13,0.05-0.25,0.11-0.36c0.39-0.76,0.83-1.47,1.32-2.13c0.45-0.62,0.95-1.2,1.48-1.76c0.53-1.91,0.94-3.83,1.25-5.76 c0.33-2,0.57-4.02,0.74-6.07l0-0.02c0.07-1,0.1-1.92,0.1-2.77c-0.01-0.85-0.06-1.67-0.15-2.44c-0.15-1.35-0.36-2.29-0.68-3.17 c-0.33-0.89-0.79-1.73-1.46-2.86l-0.68-1.16l-5.68,16.43c-0.24,0.71-0.45,1.3-0.61,1.95c-0.15,0.6-0.26,1.21-0.3,1.95 c-0.03,0.4,0.1,1.11,0.22,1.75c0.07,0.41,0.14,0.79,0.18,1.08c0.06,0.49-0.29,0.93-0.78,0.98c-0.36,0.04-0.69-0.14-0.87-0.43 l-0.16-0.26c-0.22-0.34-0.56-0.88-0.9-1.31c-0.02,0.72-0.08,1.37-0.17,1.94c-0.13,0.75-0.33,1.38-0.61,1.86 c-0.22,0.38-0.53,0.86-0.97,1.21c-0.52,0.42-1.14,0.64-1.89,0.37l-5.88,0.26c-0.06,0-0.12,0-0.18-0.01v0 c-0.48-0.08-0.86-0.21-1.14-0.4c-0.43-0.28-0.67-0.65-0.71-1.12c-0.03-0.38,0.09-0.77,0.35-1.19c0.2-0.3,0.48-0.63,0.86-0.98 l4.53-4.6l5.35-14.35c0.17-0.46,0.68-0.69,1.14-0.52c0.46,0.17,0.69,0.68,0.52,1.14l-5.4,14.49c-0.04,0.13-0.11,0.25-0.21,0.35 l-0.45,0.46h3.19c0.03-0.1,0.06-0.18,0.09-0.26c0.11-0.25,0.23-0.39,0.37-0.54c0.55-0.59,1.16-0.51,1.75-0.06 c0.06-0.86,0.18-1.57,0.35-2.25c0.16-0.64,0.39-1.31,0.66-2.09l6.19-17.91c-0.55-0.94-1.22-1.99-1.98-3.07 c-1.09,1.32-2.23,2.36-3.38,3.14l-0.04,0.03l1.91,2.2c0.43,0.5,0.38,1.25-0.12,1.68c-0.5,0.43-1.25,0.38-1.68-0.12l-2.05-2.36 c-0.07-0.08-0.13-0.17-0.18-0.27c-0.73,0.3-1.47,0.51-2.2,0.63l-0.1,3.76c-0.02,0.66-0.56,1.17-1.21,1.16 c-0.66-0.02-1.17-0.56-1.16-1.21l0.09-3.59c-0.08-0.01-0.15-0.01-0.23-0.02c-0.81-0.08-1.6-0.25-2.38-0.51l-2.37,2.73 c-0.43,0.5-1.18,0.55-1.68,0.12c-0.5-0.43-0.55-1.18-0.12-1.68l1.9-2.19c-0.62-0.35-1.23-0.76-1.81-1.22 c-1.36-1.06-2.61-2.39-3.71-3.91c-2.84,1.28-5.5,2.02-8.32,2.19c-3,0.19-6.15-0.27-9.89-1.41l-4.33-0.09 c-0.13,1.99-0.49,3.8-1.04,5.46c-0.26,1.1-0.37,2.15-0.33,3.16c0.04,1,0.24,1.96,0.57,2.89l0,0c0.01,0.04,0.02,0.07,0.03,0.11 c0.24,1.1,0.31,2.17,0.17,3.22c-0.13,0.96-0.44,1.9-0.96,2.79l1.15,7.82l0.05,0.31c0.33,2.23,0.68,4.57-0.49,6.81 c-0.23,0.45-0.52,0.82-0.87,1.1c-0.02,0.02-0.04,0.03-0.06,0.05c-0.38,0.29-0.81,0.47-1.3,0.53c-0.06,0.01-0.12,0.02-0.18,0.02 h-6.26v0c-0.22,0-0.44-0.08-0.61-0.24c-0.35-0.34-0.37-0.9-0.03-1.25l3.43-3.6l0.08-10.16c-0.76-1-1.41-2.19-1.92-3.59 c-0.53-1.46-0.91-3.16-1.12-5.13l-0.78-2.46l-1.07,8.72l-0.75,11.16c0,0.49-0.4,0.88-0.89,0.88h-0.23v2.77h0v0 c0,0.49-0.4,0.88-0.89,0.88l-9.16-0.04v0c-0.21,0-0.43-0.08-0.59-0.23c-0.36-0.33-0.39-0.89-0.06-1.25l3.76-4.12 c0.03-0.04,0.07-0.08,0.11-0.11l1.18-1.02c0.56-0.49,0.94-0.94,1.22-1.45c0.29-0.52,0.49-1.14,0.69-1.92 c0.09-0.36,0.15-0.62,0.21-0.9l0.03-0.15l0.18-0.79c0.57-2.52,0.36-3.17-0.17-4.81c-0.17-0.52-0.37-1.13-0.58-1.91 c-0.54-1.96-0.99-4.04-1.39-6.27c-0.36-2-0.68-4.19-1-6.58c-1.57-0.11-3.05-0.44-4.4-1c-3.17-1.32-5.59-3.89-6.75-7.92 c-0.01-0.03-0.01-0.05-0.02-0.08l-4.02-15.42c-0.32,0.19-0.64,0.34-0.97,0.44c-0.59,0.18-1.19,0.24-1.8,0.18 c-0.14,0.18-0.29,0.34-0.45,0.5c-0.28,0.29-0.59,0.56-0.9,0.81c-0.16,0.12-0.33,0.24-0.51,0.36c-0.17,0.11-0.35,0.22-0.54,0.32 c-0.53,0.29-1.09,0.53-1.66,0.69c-0.59,0.16-1.2,0.25-1.84,0.24c-0.4-0.01-0.8-0.06-1.2-0.15c-0.39-0.09-0.78-0.22-1.17-0.38 c-0.09-0.04-0.18-0.1-0.25-0.16c-2.29,0.96-3.72,0.26-4.87-1.22H9.09c-1.01,0.47-1.83,0.45-2.47-0.08 c-1.39-1.16-1.49-3.84-1.2-5.51c0.12-0.71,0.33-1.29,0.63-1.7c0.03-0.18,0.13-0.35,0.29-0.47c0.26-0.2,0.61-0.64,0.94-1.06 c0.27-0.35,0.53-0.68,0.79-0.92c1.15-1.09,1.19-1.5,1.37-3.12l0.01-0.05c0.1-0.93,0.14-1.91,0.14-2.9c0-0.83-0.03-1.7-0.07-2.57 c-0.07-0.05-0.15-0.11-0.22-0.16c-0.43-0.01-0.9-0.08-1.41-0.24c-2.09-0.66-4.96-2.83-6.56-4.83c-1.15-1.44-2.23-2.52-0.16-3.88 c3.35-0.7,6.49-0.55,9.38,0.62c0.04-0.25,0.09-0.49,0.14-0.73c-0.37-0.18-0.75-0.4-1.01-0.58c-1.16-0.84-1.84-1.88-2.35-3.19 c-0.69-1.79-1.74-5.97-0.46-7.6c0.31-0.4,0.73-0.44,1.26-0.06c0.74,1.11,1.56,2.7,2.15,4.19c0.51,0.95,1.11,1.71,1.83,2.18 c0.37,0.24,1.03,0.47,1.67,0.6c0.12-0.06,0.24-0.13,0.36-0.18c1.13-0.53,2.44-0.71,3.84-0.55c1.22,0.14,2.52,0.53,3.84,1.15 c1.31-0.55,2.67-0.72,4.08-0.36c1.51,0.38,3.05,1.36,4.61,3.14l0,0l0.02,0.02C30.64,10.58,30.74,10.71,30.85,10.84L30.85,10.84z M13.21,35.86c0.38-0.96,1.75-1.65,2.61-0.92c0.32,0.56,0.22,1.18-0.04,1.74c-0.1,0.39-0.25,0.73-0.47,0.99 c-0.66,0.78-2.23,0.96-2.65-0.23C12.45,36.86,12.66,36.13,13.21,35.86L13.21,35.86z M7.88,33.8c0.75,0.56,1.84,1.86,1.49,2.88 c-0.11,0.32-0.36,0.51-0.69,0.61c-0.49,0.25-0.85,0.08-1.13-0.34c-0.37-0.56-0.35-1.02-0.29-1.68C7.33,34.51,7.53,33.73,7.88,33.8 L7.88,33.8z M17.36,39.36c0.24,0.05,0.49,0.08,0.73,0.08c0.45,0.01,0.9-0.05,1.33-0.17c0.45-0.12,0.88-0.31,1.29-0.54 c0.14-0.08,0.28-0.16,0.42-0.25c0.13-0.09,0.27-0.18,0.4-0.28c0.25-0.19,0.48-0.4,0.7-0.63c0.21-0.22,0.41-0.45,0.59-0.7 c0.19-0.3,0.55-0.47,0.92-0.4c0.53,0.1,1.03,0.1,1.5-0.05c0.47-0.15,0.92-0.44,1.35-0.92l0,0c0.11-0.12,0.26-0.22,0.43-0.26 c0.47-0.12,0.96,0.16,1.08,0.64l4.37,16.77l0.01,0.04c0.99,3.46,3.04,5.65,5.72,6.76c2.82,1.17,6.36,1.18,10.14,0.23 c-0.21-1.04-0.34-2.1-0.42-3.18c-0.09-1.34-0.1-2.73-0.06-4.18c0.01-0.49,0.41-0.88,0.9-0.87c0.49,0.01,0.88,0.41,0.87,0.9 c-0.03,1.38-0.03,2.72,0.06,4.03c0.08,1.2,0.24,2.36,0.51,3.5c0.03,0.05,0.05,0.1,0.07,0.16l3.54,11.22 c0.02,0.07,0.04,0.15,0.04,0.22c0.19,1.84,0.54,3.41,1.03,4.75c0.48,1.32,1.1,2.42,1.83,3.33c0.14,0.18,0.21,0.4,0.19,0.61 l-0.09,10.78c0,0.11-0.02,0.22-0.06,0.31h3.14c0.14-1.24-0.06-2.56-0.25-3.83l-0.05-0.31L58.4,79c-0.03-0.24,0.03-0.46,0.15-0.64 c0.47-0.75,0.74-1.53,0.85-2.33c0.11-0.82,0.06-1.66-0.13-2.54c-0.39-1.08-0.61-2.2-0.66-3.37c-0.05-1.18,0.08-2.4,0.38-3.67 c0.01-0.04,0.02-0.07,0.03-0.11c0.52-1.59,0.87-3.34,0.97-5.3c0.11-1.99-0.03-4.18-0.48-6.62c-0.09-0.48,0.23-0.94,0.72-1.03 c0.48-0.09,0.94,0.23,1.03,0.72c0.36,2,0.53,3.84,0.54,5.55l4.44,0.1c0.08,0,0.17,0.02,0.24,0.04l0,0c3.57,1.1,6.56,1.55,9.38,1.37 c2.8-0.17,5.45-0.97,8.35-2.34c0.4-0.19,0.87-0.05,1.11,0.31l0,0c1.11,1.64,2.38,3.04,3.77,4.13c1.72,1.35,3.61,2.2,5.53,2.39 c1.9,0.18,3.88-0.29,5.8-1.59c1.12-0.76,2.23-1.8,3.3-3.15c-1.11-1.48-2.34-2.99-3.62-4.36c-2.33-2.5-4.75-4.53-6.67-5.09 c-0.47-0.13-0.75-0.63-0.61-1.1c0.13-0.47,0.63-0.75,1.1-0.61c2.27,0.65,4.96,2.87,7.48,5.59c3.18,3.42,6.14,7.67,7.6,10.49 l1.15,1.95c0.72,1.22,1.22,2.14,1.59,3.15c0.37,1.02,0.61,2.09,0.78,3.58c0.09,0.81,0.15,1.68,0.16,2.63 c0.01,0.93-0.02,1.9-0.1,2.92l0,0.04c-0.18,2.07-0.42,4.14-0.76,6.21c-0.32,1.97-0.74,3.92-1.27,5.86h3.42 c0.07-0.65,0.1-1.31,0.11-1.98c0-0.07,0-0.14,0.01-0.2c0.09-0.48,0.55-0.8,1.04-0.71l0.13,0.03c-0.01-1.23-0.03-2.29-0.06-3.32 c-0.09-3.94-0.17-7.45,0.52-11.83c0.01-0.11,0.04-0.22,0.1-0.32c0.87-1.65,1.33-3.34,1.39-4.97c0.06-1.59-0.27-3.12-0.98-4.51 c-0.3-0.4-0.58-0.83-0.84-1.29c-0.27-0.48-0.52-0.99-0.76-1.53c-2.31-5.3-1.75-9.27-1.01-14.51c0.05-0.32,0.09-0.65,0.14-0.99 l1.45-10.51c0-0.03,0.01-0.06,0.02-0.09l0.05-0.18c1.19-4.86,0.93-9.43-1.02-13.12c-1.94-3.67-5.58-6.5-11.16-7.91l0,0l-0.17-0.04 c-0.81-0.2-1.51-0.22-2.13-0.12c-0.59,0.1-1.11,0.31-1.56,0.58c-0.06,0.04-0.14,0.08-0.21,0.1c-7.87,2.57-18.77,4.34-29.02,5.12 c-10.58,0.81-20.53,0.55-25.83-0.98c-0.13-0.04-0.25-0.1-0.35-0.19c-0.21,0.25-0.42,0.51-0.65,0.77c-0.3,0.33-0.61,0.66-0.93,0.99 c-2.34,2.37-4.27,3.8-7.55,4.08l-2.33,2.6l-1.1-1.06l2.77-2.9c0.78,0.01,1.57-0.13,2.37-0.4c1.54-0.52,3.28-1.7,4.52-2.75 c0.23-0.19,0.45-0.39,0.66-0.59c0.98-0.93,1.75-1.9,2.4-2.91c-3.83-0.42-7.42,0.38-10.88,1.83c-0.02,0.1-0.04,0.21-0.06,0.31 c-0.09,0.48-0.56,0.8-1.05,0.7c-0.48-0.09-0.8-0.56-0.7-1.05c0.21-1.09,0.17-2.18-0.17-3.28c-0.34-1.13-0.99-2.28-1.96-3.45l0,0 c-1.31-1.48-2.54-2.29-3.7-2.59c-1.12-0.28-2.21-0.09-3.28,0.42c-0.26,0.12-0.55,0.11-0.79-0.01c-1.25-0.64-2.47-1.03-3.61-1.16 c-1.07-0.12-2.06,0-2.88,0.39c-0.8,0.38-1.47,1.02-1.94,1.94c-0.36,0.7-0.6,1.56-0.72,2.6c-0.04,0.41-0.36,0.72-0.74,0.78 l-1.16,1.83c-2.09-2.98-5.81-2.92-9.04-2.61c1.53,2.95,4.69,5.53,8.15,6.4c0.74-0.53,1.53-0.41,2.3,0.07 c0.44,0.27,0.75,0.68,0.92,1.25l-0.27,1.4c-0.48-0.1-0.94-0.27-1.37-0.48c0.02,0.55,0.03,1.1,0.03,1.65c0,1.06-0.03,2.09-0.14,3.07 l-0.01,0.05c-0.23,2.05-0.29,2.57-1.83,4.03C8.93,30.8,8.69,31.1,8.45,31.4l-0.09,0.11c0.99,0.24,1.86,0.66,2.68,1.15 c1.74-0.21,3.39-0.31,4.84-0.18C20.16,32.89,19.09,37.39,17.36,39.36L17.36,39.36z M43.59,88.48h3.27 c0.16-0.16,0.38-0.26,0.62-0.26h0.29l0.7-10.43c0-0.02,0-0.03,0-0.05l0,0l1.54-12.6l-1.19-3.76c-1.76,0.45-3.48,0.7-5.12,0.75 c0.3,2.21,0.61,4.27,0.96,6.23c0.39,2.21,0.83,4.23,1.35,6.1c0.21,0.74,0.4,1.34,0.56,1.84c0.63,1.97,0.89,2.76,0.21,5.75 l-0.18,0.79l-0.03,0.15c-0.09,0.38-0.17,0.73-0.22,0.95c-0.23,0.91-0.48,1.65-0.85,2.33c-0.38,0.7-0.88,1.3-1.62,1.94L43.59,88.48 L43.59,88.48z M28.27,21.43L27.5,21.4c-0.31,1.32-1.55,2.04-4.35,1.91c-0.09-0.37-0.1-0.69-0.05-0.99c0.14-0.88,0.8-1.75,1.71-1.95 c0.69-0.15,3.09,0.16,3.59,0.52C28.52,20.98,28.13,21.37,28.27,21.43L28.27,21.43z"
        />
      </g>
    </svg>
  );
};

export default SvgAnimal;
