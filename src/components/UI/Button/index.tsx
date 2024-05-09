import React from "react";

type propTypes = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ type = "button", className = "", children, onClick, disabled }: propTypes) => {
  const combinedClassName = `${className} px-3 py-1 cursor-pointer border-none flex justify-center items-center rounded-full focus:outline-none hover:shadow-sm`;
  return (
    <button
      type={type}
      className={`${combinedClassName.trim()} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
