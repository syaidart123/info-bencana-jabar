import React from "react";
import InputField from "../InputField";

type propTypes = {
  name: string;
  title: string;
  children:React.ReactNode;
};

const InputGroup = (props: propTypes) => {
  const { name, title,children } = props;
  return (
    <label
      htmlFor={name}
      className=" block  mb-2 text-sm font-medium text-gray-900 mt-3"
    >
      {title}
      {children}
    </label>
  );
};

export default InputGroup;
