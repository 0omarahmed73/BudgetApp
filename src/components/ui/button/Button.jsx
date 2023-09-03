import React from "react";
import "./Button.css";
const Button = ({
  children,
  type = "primary",
  size = "normal",
  disabled = false,
  icon = false,
  block = false,
  ...props
}) => {
  return (
    <button disabled={disabled}
      className={`btn btn-${type} btn-${size} ${icon ? "btn-icon" : ""} ${
        block ? "btn-block" : ""
      }`} {...props}
    >
      {children}
    </button>
  );
};

export default Button;
