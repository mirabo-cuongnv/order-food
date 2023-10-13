import React from 'react';

const TextArea = ({ name, cls, row, onChange, ...props }) => {
  return (
    <textarea
      name={name}
      rows={row}
      className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${cls}`}
      placeholder="Write your thoughts here..."
      onChange={onChange}
      {...props}
    />
  );
};

export default TextArea;
