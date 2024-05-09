import React from "react";

type propsTypes={
  label?:string;
  type:string;
  name:string;
  className?:string;
  placeholder?:string;
  defaultValue?:string;
  required?:boolean;
  disabled?:boolean;
  
}

const Input = (props:propsTypes) => {
  const {label,type,name,placeholder, className,required,defaultValue,disabled}=props;
  return (
    <div>
      {label &&<label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 mt-3"
      >
       {label}
      </label>}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        min={0}
        id={name}
        className={`${className} bg-white text-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 truncate`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
