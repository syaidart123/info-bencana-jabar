import React from "react";

type propsTypes = {
  label?: string;
  type: string;
  name: string;
  className?: string;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: propsTypes) => {
  const {
    label,
    type,
    name,
    placeholder,
    className,
    required,
    defaultValue,
    disabled,
    autoFocus,
    onChange,
  } = props;
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-gray-900 mt-3"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        autoFocus={autoFocus}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        min={0}
        id={name}
        className={`${className} ${
          disabled ? "cursor-not-allowed" : ""
        } text-sm border border-gray-300 text-gray-900 sm:text-sm mt-3 rounded-lg block w-full p-2.5 truncate`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
