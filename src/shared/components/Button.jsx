import React from 'react';

const Button = ({ text, cls, onClick, ...props }) => {
  return (
    <button
      className={`text-gray-800 bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded inline-flex items-center justify-center ${cls}`}
      onClick={onClick}
      {...props}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
