import { ErrorMessage } from "formik";
import React from "react";

const Input = ({ className, field, ...rest }) => {
  return (
    <div>
      <input className={`input ${className}`} {...field} {...rest} />
      <ErrorMessage
        component="small"
        className="text-xs text-red-500"
        name={field.name}
      />
    </div>
  );
};

export default Input;
