import React from "react";
import { Link, useLocation } from "react-router-dom"; // Importez useParams
import CurrentPageBar from "../../components/utils/CurrentPageBar";
import { URL_PROFIL } from "../../constants/urls/urlFrontEnd";
import iconAdd from "../../assets/img/add.svg";
import CarList from "./CarList";
import CarGallery from "../../components/car/CarGallery";

const AddCar1 = () => {
  const location = useLocation();
  const { cars } = location.state;

  return (
    <div className="h-full">
      <CurrentPageBar text={"Mon vehicule"} />
      <div className="w-full sm:max-w-md p-5 mt-2">
        <Link
          to={URL_PROFIL}
          className="underline connexionLinks text-[15px] ml-32"
        >
          &#60;Retour
        </Link>
      </div>
      <div className="mt-3.5 text-center ">
        {cars && !cars.length ? (
          <h6>Pas de véhicule enregistré</h6>
        ) : (
          <>
            <h4>Ma voiture : </h4>
            <CarList cars={cars} />
            <h4>Galerie de mon véhicule : </h4>
            <CarGallery car={cars[0]}/>
          </>
        )}
      </div>
      {cars && !cars.length ? (
        <>
          <hr className="w-1/4 mx-auto border-t border-gray-300 mt-2" />
          <div className="flex justify-center mt-6">
            <button
              className="rounded-l-full px-2 py-2 border-gradient-full flex items-center w-96 border-2 border-gray-500 gradient invert-colors"
              style={{ borderRadius: "12px 12px" }}
            >
              <div className="h-7 w-7 rounded-full mr-3 flex justify-center items-center">
                <img src={iconAdd} alt="" className="" />
              </div>
              <Link to={"/addCar2"} className="font-jakartaSans text-white">
                Ajouter un véhicule
              </Link>
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddCar1;
