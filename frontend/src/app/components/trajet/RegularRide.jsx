import React, { useState } from "react";
import InputGradientSwitch from "../utils/input/InputGradientSwitch";
import GreenButton from "../utils/button/GreenButton";

const RegularRide = (props) => {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [daysOfWeek] = useState([
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
  ]);

  // Fonction pour gérer la sélection/désélection d'un bouton
  const handleButtonClick = (day) => {
    if (selectedButtons.includes(day)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== day));
    } else {
      setSelectedButtons([...selectedButtons, day]);
    }
    console.log(selectedButtons);
  };

  return (
    <>
      <div
        className="rounded-l-full px-7 py-3 flex-grow border-gradient-white-simple"
        style={{ borderRadius: "25px 25px" }}
      >
        <div className="btn-group flex items-center">
          {daysOfWeek.map((day) => (
            <InputGradientSwitch
              key={day}
              onClick={() => handleButtonClick(day)}
              isActive={selectedButtons.includes(day)}
            >
              {day}
            </InputGradientSwitch>
          ))}
        </div>

        <hr className="w-1/2 mx-auto border-t border-gray-300 mt-2" />

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center ml-20">
            <input
              type="text"
              placeholder="Heure de depart *"
              className="signupInput w-full px-3 py-2 outline-none border-none text-center"
            />
          </div>
          <div className="flex items-center mr-20">
            <input
              type="text"
              placeholder="Heure de retour"
              className="signupInput w-full px-3 py-2 outline-none border-none text-center"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <GreenButton type="submit" cas="with-m-y">
          Suivant
        </GreenButton>
      </div>
    </>
  );
};

export default RegularRide;
