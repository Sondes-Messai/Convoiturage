import React, { useState } from "react";
import css from "./DropDownInput.css";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { Field } from "formik";

function DropDownInput(props) {
  const [isOpen, setOpen] = useState(false);

  // choix de la liste déroulante
  let options = "";
  const villes = [
    { id: 1, nom: "Lille" },
    { id: 2, nom: "Roubaix" },
    { id: 3, nom: "Tourcoing" },
  ];
  const aides = [
    { id: 1, nom: "Réserver un trajet" },
    { id: 2, nom: "Publier un trajet" },
    { id: 3, nom: "Problème de connexion" },
    { id: 4, nom: "Autre" },
  ];
  if (props.liste === "aides") {
    options = aides;
  } else {
    options = villes;
  }
  
  return (
    <div className="rounded-3xl bg-grey-afpa-light relative w-full">
      <div
        className="px-6 py-2 h-11 flex justify-between items-center cursor-pointer test"
        onClick={() => {
          setOpen(!isOpen);
          console.log(isOpen);
        }}
      >
        <span className="mx-2">{props.placeholder}</span>
        <button
          type="button"
          className="focus:outline-none focus:shadow-outline"
        >
          <ArrowIcon
            width="20px"
            height="20px"
            className={isOpen ? "closed" : "rotate-90"}
          />
        </button>
      </div>
      <div className={isOpen ? " py-4 flex flex-col" : "hidden"}>
        <hr />
        <input
          type="text"
          name="search"
          id="search"
          className="h-11 w-11/12 rounded-full my-3 self-center px-4"
        />
        {options.map((option) => (
          <span
            key={`option-${option.id}`}
            className="h-11 flex items-center font-jakartaSans hover:font-bold hover:text-rose-afpa hover:bg-grey-afpa-mid pl-6"
            id={`option-${option.id}`}
          >
            {option.nom}
          </span>
        ))}
      </div>
    </div>
  );
}

export default DropDownInput;
