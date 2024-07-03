import React from "react";

type propTypes = {
  type: string;
  name: string;
  titleName: string;
  placeholder?: string;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = (props: propTypes) => {
  const {
    type,
    name,
    titleName,
    placeholder,
    defaultValue,
    disabled,
    readOnly,
    onChange,
  } = props;
  return (
    <div className="my-2 flex rounded-lg">
      <span className="inline-flex w-8/12 min-w-fit items-center rounded-s-md border border-e-0 border-gray-200 bg-gray-50 px-4 text-xs text-gray-500 md:text-sm">
        {titleName}
      </span>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        min={0}
        className={`block w-full appearance-none truncate rounded-e-lg border border-gray-200 px-3 py-2 pe-11 text-xs shadow-sm focus:z-10 disabled:pointer-events-none disabled:opacity-50 md:text-sm ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default InputField;
