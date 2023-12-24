import React from "react";
import { useField } from "formik";

const Counter = (props) => {
  const [field, , helpers] = useField("place");

  /**
   * méthode pour augmenter la valeur du compteur
   */
  const increment = () => {
    if (field.value < props.seats) {
      helpers.setValue(field.value + 1);
    }
  };

  /**
   * méthode pour dimonuer la valeur du compteur
   */
  const decrement = () => {
    if (field.value > 0) {
      helpers.setValue(field.value - 1);
    }
  };

  return (
    <div className="flex p-3 border rounded-full border-grey-afpa-light ml-8">
      <button
        className="border w-8 h-8 flex items-center justify-center rounded-full border-green-afpa text-green-afpa text-xl px-3 text-center"
        onClick={decrement}
        type="button"
      >
        -
      </button>
      <span className="text-lg mx-8">{field.value}</span>
      <button
        className="border w-8 h-8 flex items-center justify-center rounded-full border-green-afpa text-green-afpa text-xl px-2"
        onClick={increment}
        type="button"
      >
        +
      </button>
    </div>
  );
}

export default Counter;
