import React from "react";

type propTypes = {
  title: string;
  name: string;
  nameOption: string;
  type: string;
  placeholder?:string;
  children: React.ReactNode;
  defaultValue?:any;
  value?:any;
  disable?:boolean;
};

const InputOption = (props: propTypes) => {
  const { children, name, nameOption, title, type,placeholder,defaultValue,value,disable } = props;
  return (
    <div className="flex rounded-lg shadow-sm my-2 gap-4">
      <span className="pl-3 w-1/4 inline-flex items-center min-w-fit rounded-md border border-gray-200 bg-gray-50 text-sm text-gray-500 ">
        {title}
      </span>
      <input
        type={type}
        name={name}
        min={0}
        placeholder={placeholder}
        className="appearance-none py-2 px-2  w-2/4 border border-gray-200 shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
        defaultValue={defaultValue}
        disabled={disable}
      />
      <select
        name={nameOption}
        disabled={disable}
        value={value}
        className="border items-center ml-3 block w-1/4 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      >
        {children}
      </select>
    </div>
  );
};

export default InputOption;
