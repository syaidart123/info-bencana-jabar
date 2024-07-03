import React from "react";

type propsType = {
  children: React.ReactNode;
  title: string;
};

const TextInput = (props: propsType) => {
  const { children, title } = props;
  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="text-lg font-semibold">{children}</p>
    </div>
  );
};

export default TextInput;
