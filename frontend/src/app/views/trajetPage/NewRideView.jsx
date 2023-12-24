import React from "react";
import CreateTrajet from "../../components/trajet/CreateTrajet";

const NewRide = () => {
  return (
    <div className="h-screen">
      <div className="flex relative flex-col justify-around items-center">
        <h5 className="text-center font-bold py-4">Création du trajet</h5>
        <div>
         <CreateTrajet />
        </div>
      </div>
    </div>
  );
};

export default NewRide;
