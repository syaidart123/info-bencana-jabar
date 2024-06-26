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
    <div className="flex rounded-lg my-2">
      <span className="px-4 w-8/12 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-xs md:text-sm text-gray-500 ">
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
        className={`appearance-none py-2 px-3 pe-11 block w-full border text-xs md:text-sm border-gray-200 shadow-sm rounded-e-lg truncate  focus:z-10 disabled:opacity-50 disabled:pointer-events-none ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default InputField;
