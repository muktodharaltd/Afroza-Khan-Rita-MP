"use client";
import { forwardRef } from "react";

const SelectField = forwardRef(
  (
    {
      label,
      options = [],
      error,
      className = "",
      placeholder = "Select an option",
      ...rest // name, onChange, onBlur, value এগুলো register() থেকে আসবে
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {/* Select Box */}
        <div
          className={`mb-1 ml-2 flex items-center  rounded focus-within:border-[#172D8A] ${className}`}
        >
          <select
            ref={ref}
            className="h-9 px-2 border border-gray-300 rounded w-full bg-transparent focus:outline-none text-gray-700 text-sm"
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export default SelectField;
