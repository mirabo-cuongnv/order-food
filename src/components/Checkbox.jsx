import React from 'react';

const Checkbox = ({ id, label, name, value, onChange, ...props }) => {
  return (
    <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
      <input
        id={id}
        type="checkbox"
        name={name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={onChange}
        value={value}
        {...props}
      />
      <label
        htmlFor={id}
        className="w-full py-4 ml-2 text-sm font-medium select-none text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
