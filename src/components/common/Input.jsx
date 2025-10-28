"use client";
import { forwardRef } from "react";

const InputField = forwardRef(
  (
    {
      icon,
      type = "text",
      placeholder = "",
      error,
      className = "",
      ...rest // এখানে name, onChange, onBlur, value সব যাবে register() থেকে
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {/* Input Wrapper */}
        <div className={`mb-1 ml-2 flex items-center  rounded  focus-within:border-[#172D8A] ${className}`}>
          
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className="h-9 px-2 border border-gray-300 rounded w-full bg-transparent placeholder-gray-400 placeholder-opacity-50 focus:outline-none"
            {...rest}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
