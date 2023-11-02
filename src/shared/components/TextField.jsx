import React from 'react';
import { SPLIT_NUMBER } from '../utils/formation';

const TextField = ({ label, name, required, type, cls, placeholder, onChange, ...props }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${cls}`}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextField;
