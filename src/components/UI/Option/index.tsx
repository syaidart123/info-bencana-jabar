import React from "react";

type propTypes = {
  value: string;
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
};

const Option = (props: propTypes) => {
  const { value, disabled, selected, children } = props;
  return (
    <option value={value} disabled={disabled} selected={selected}>
      {children}
    </option>
  );
};

export default Option;
