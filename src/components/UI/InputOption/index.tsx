import React from "react";

type propTypes = {
  title: string;
  name: string;
  nameOption: string;
  type: string;
  placeholder?: string;
  children: React.ReactNode;
  defaultValue?: any;
  value?: any;
  disable?: boolean;
};

const InputOption = (props: propTypes) => {
  const {
    children,
    name,
    nameOption,
    title,
    type,
    placeholder,
    defaultValue,
    value,
    disable,
  } = props;
  return (
    <div className="my-2 flex gap-4 rounded-lg shadow-sm">
      <span className="inline-flex w-1/4 min-w-fit items-center rounded-md border border-gray-200 bg-gray-50 pl-3 text-sm text-gray-500">
        {title}
      </span>
      <input
        type={type}
        name={name}
        min={0}
        placeholder={placeholder}
        className="w-2/4 appearance-none rounded-lg border border-gray-200 px-2 py-2 text-sm shadow-sm disabled:pointer-events-none disabled:opacity-50"
        defaultValue={defaultValue}
        disabled={disable}
      />
      <select
        name={nameOption}
        disabled={disable}
        value={value}
        className="ml-3 block w-1/4 items-center rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
      >
        {children}
      </select>
    </div>
  );
};

export default InputOption;
