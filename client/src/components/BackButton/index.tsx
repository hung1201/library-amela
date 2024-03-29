import React from 'react';

type Props = {};

const BackButton = (props: Props) => {
  return (
    <div className="flex items-center gap-1">
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 7.99992H17.5M8.33333 3.33325L2.5 7.99992L8.33333 3.33325ZM2.5 7.99992L8.33333 12.6666L2.5 7.99992Z"
          stroke="#282938"
          strokeOpacity="0.8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <a href="#" className="">
        Home Page
      </a>
    </div>
  );
};

export default BackButton;
