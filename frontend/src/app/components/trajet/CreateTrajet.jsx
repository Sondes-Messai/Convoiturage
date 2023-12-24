import React, { useState } from "react";
import SimpleRide from "./SimpleRide";
import RegularRide from "./RegularRide";
import TrajetCreate from "./TrajetCreate";

const CreateTrajet = () => {
  const [isChecked, setChecked] = useState(1);
  const [lieuDepart, setLieuDepart] = useState({});
  const [lieuArrivee, setLieuArrivee] = useState({});
  console.log("lieu de départ : ",lieuDepart, " lieu de d'arrivée : ", lieuArrivee);

  return (
    <div className="z-30 ">
      <div className="py-12">
        <TrajetCreate
          setLieuDepart={setLieuDepart}
          setLieuArrivee={setLieuArrivee}
        />
      </div>
      {/*affichage des composants seulement si une saisie sur le lieu de départ et d'arrivée a été effectué
      /à améliorer*/}
      {Object.keys(lieuArrivee).length === 0 ||
      Object.keys(lieuDepart).length === 0 ? (
        <p className="flex justify-center font-bold text-grey-afpa">
          Renseignez les adresses de départ et d'arrivée pour continuer.
        </p>
      ) : (
        <>
          <div className="h-[40px] w-[780px] pl-5 my-2 flex items-center z-50">
            <div className="flex items-center mr-8">
              <input
                type="radio"
                name="radio"
                id="radio"
                className="accent-rose-afpa w-4 h-4"
                onClick={() => setChecked(1)}
                defaultChecked
              />
              <label htmlFor="radio" className="font-jakartaSans">
                Trajet régulier
              </label>
            </div>
            <div className="flex items-center ">
              <input
                type="radio"
                name="radio"
                id="radio"
                className="accent-rose-afpa w-4 h-4"
                onClick={() => setChecked(2)}
              />
              <label htmlFor="radio" className="font-jakartaSans">
                Trajet unique
              </label>
            </div>
          </div>
          {isChecked == 1 ? <RegularRide /> : ""}

          {isChecked == 2 ? (
            <SimpleRide lieuDepart={lieuDepart} lieuArrivee={lieuArrivee} />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default CreateTrajet;
