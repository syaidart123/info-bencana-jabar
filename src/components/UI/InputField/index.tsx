import React from 'react'

type propTypes={
type:string;
name:string;
titleName:string;
placeholder?:string;
defaultValue?:any;
disabled?:boolean
readOnly?:boolean
}

const InputField = (props:propTypes) => {
    const {type,name,titleName,placeholder,defaultValue,disabled,readOnly}=props
  return (
    <div className="flex rounded-lg shadow-sm my-2">
    <span className="px-4 w-8/12 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 ">
      {titleName}
    </span>
    <input
    placeholder={placeholder}
      type={type}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      min={0}
      className="appearance-none py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none"
    />
  </div>
  )
}

export default InputField