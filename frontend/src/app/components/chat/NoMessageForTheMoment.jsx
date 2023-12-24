import React from "react";
import noMessage from "../../assets/img/nomessage.svg";
import CurrentPageBar from "../utils/CurrentPageBar";


const NoMessageForTheMoment = ({displayM}) => {
  return (
    <>
    <CurrentPageBar text={"Messagerie"} />
      <div className="flex flex-col items-center h-[70vh] flex-wrap mt-[5%]">
        <div className="text-2xl font-bold mb-4">
          Pas de message pour l'instant.
        </div>
        <img className="h-[50%]" src={noMessage}></img>
      </div>
    </>
  );
};

export default NoMessageForTheMoment;
