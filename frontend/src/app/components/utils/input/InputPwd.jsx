import React from "react";
import { ErrorMessage } from "formik";

const InputPwd = ({ className, field, showPassword, ...rest }) => {
  return (
    <div>
      <input
        className={`input ${className}`}
        {...field}
        {...rest}
        type={showPassword ? "text" : "password"}
      />
      <ErrorMessage
        component="small"
        className="text-xs text-red-500"
        name={field.name}
      />
    </div>
  );
};

export default InputPwd;
