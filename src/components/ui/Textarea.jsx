import React from 'react';

const Textarea = ({ 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  label,
  required = false,
  rows = 3,
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Textarea;