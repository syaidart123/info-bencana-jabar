import React, { useRef, useState } from "react";

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
  maxLength?: number;
  minLength?: number;
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
    maxLength,
    autoFocus,
    minLength,
    onChange,
  } = props;

  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;

      if (maxLength && value.length > maxLength) {
        inputRef.current.value = value.slice(0, maxLength);
      }

      if (minLength && value.length < minLength) {
        setError(`Input must be at least ${minLength} characters.`);
      } else {
        setError(null);
      }
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 mt-3 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        autoFocus={autoFocus}
        name={name}
        defaultValue={defaultValue}
        onInput={handleInput}
        id={name}
        onChange={onChange}
        className={`${className} ${
          disabled ? "cursor-not-allowed" : ""
        } mt-3 block w-full truncate rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 sm:text-sm`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
