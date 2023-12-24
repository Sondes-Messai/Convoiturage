import React, { useEffect, useState } from "react";
import { ErrorMessage, Field } from "formik";

function PreferenceRadioComponent(props) {
  return (
    <div className="flex flex-col items-center px-8" key={props.name}>
      <div className="flex justify-between items-center self-center w-full h-16">
        <div className="flex items-center">  
          {/* Utilisez la propriété pictureUrl ici */}
          <img src={props.pictureUrl} alt="" width="30px" height="30px" className="rounded-full" />
          <span className="ml-2">{props.name}:</span>
        </div>
        <div>
          <label htmlFor={props.name}>
            <Field
              type="radio"
              value="true"
              name={props.name}
              id={props.name}
              className="accent-rose-afpa w-4 h-4"
            />
            Oui
          </label>
          <label htmlFor={props.name} className="ml-14">
            <Field
              type="radio"
              value="false"
              name={props.name}
              id={props.name}
              className="accent-rose-afpa w-4 h-4"
            />
            Non
          </label>
        </div>
      </div>
      <ErrorMessage
        component="span"
        name={props.name}
        className="text-red-600 text-sm"
      ></ErrorMessage>
      <hr className="w-3/4" />
    </div>
  );
}

export default PreferenceRadioComponent;
