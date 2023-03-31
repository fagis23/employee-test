import React from "react";

const Button = ({ label, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-slate-500 p-2 ${className} rounded-sm`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
