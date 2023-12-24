import React, { useState, useEffect } from "react";
import { GoReturn } from "./../../assets/icons/GoReturn";
import { SearchGreen } from "./../../assets/icons/SearchGreen";
import { SearchRose } from "./../../assets/icons/SearchRose";
import AddressSearch from "./AdressSearch";

function TrajetCreate({ setLieuArrivee, setLieuDepart }) {
  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState({});

  const handleReverseClick = () => {
    // Inversez les valeurs de departure2 et arrival2 en utilisant une variable temporaire
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  useEffect(() => {
    setLieuArrivee(arrival);
    setLieuDepart(departure);
  }, [arrival, departure]);

  return (
    <div className="flex justify-between items-center mr-2 mb-4">
      <div className="flex items-center mr-2">
        <SearchGreen
          width="42px"
          height="42px"
          className="fill-green-afpa mr-2"
        />
        <AddressSearch
          placeholder="Lieu de départ"
          className="signupInput w-full px-3 py-2 outline-none border-none text-center "
          setValue={setDeparture}
          value={departure} // Transmettez la valeur actuelle de departure2
        />
      </div>
      <button onClick={handleReverseClick}>
        <GoReturn width="42px" height="42px" className="fill-rose-afpa mr-2" />
      </button>
      <div className="flex items-center mr-2">
        <SearchRose
          width="42px"
          height="42px"
          className="fill-rose-afpa mr-2"
        />
        <AddressSearch
          placeholder="Lieu d'arrivée"
          className="signupInput w-full px-3 py-2 outline-none border-none text-center"
          setValue={setArrival}
          value={arrival} // Transmettez la valeur actuelle de departure2
        />
      </div>
    </div>
  );
}

export default TrajetCreate;
