import React from "react";

const Input = ({
  type,
  placeholder,
  style,
  className,
  value,
  onChange,
  name,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{ border: "1px solid black", ...style }}
      className={`p-2 rounded-sm ${className}`}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default Input;
