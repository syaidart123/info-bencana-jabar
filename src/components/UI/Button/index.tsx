import React from "react";

type propTypes = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: any;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ type = "button", className, children, onClick, disabled }: propTypes) => {
  return (
    <button
      type={type}
      className={`${className} font-medium rounded-lg text-sm px-8 py-3 text-center`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
