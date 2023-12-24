import React, { useEffect, useState } from "react";
import TrajetRecapCard from "../../components/trajet/TrajetRecapCard";
import DriverCard from "../../components/trajet/DriverCard";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../../components/trajet/Map";
import reservationService from "../../services/reservationService";
import Reservation from "../../models/Reservation";
import Ride from "../../models/Ride";
import userService from "../../services/userService";
import { getEmail } from "../../services/tokenServices";

function RecapTrajetView() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const trajet = new Ride(JSON.parse(localStorage.getItem("selectedRide")));
  let userId;
  let reservation;
  userService
    .getUserByEmailOrMatricule(getEmail())
    .then(
      (user) => (
        (userId = user.id),
        (reservation = new Reservation(
          trajet.id,
          "PENDING",
          trajet.driverId,
          userId
        ))
      )
    );
  let participants = [];
  participants = getParticipant();
  //localStorage.removeItem("selectedRide");

  function getParticipant() {
    if (trajet.participants.length !== 0) {
      return trajet.availableSeats - trajet.participants.length;
    } else {
      return trajet.availableSeats;
    }
  }

  function sendReservation() {
    console.log(reservation);
    reservationService
      .createReservation(reservation)
      .then((response) => {
        console.log(response);
        navigate("/confirm/reservation");
        localStorage.removeItem("selectedRide");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function formatDate(pDate) {
    pDate = convertDate(pDate);
    const date = new Date(pDate).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    console.log(date);
    return date;
  }

  function formatHour(pDate) {
    pDate = convertDate(pDate);
    const date = new Date(pDate).toLocaleTimeString("fr-FR", {
      hour: "numeric",
      minute: "numeric",
    });
    console.log(date);
    return date;
  }

  function convertDate(pDate) {
    const year = pDate.slice(6, 10);
    const mounth = pDate.slice(3, 5);
    const day = pDate.slice(0, 2);
    const hour = pDate.slice(11, 13);
    const min = pDate.slice(14, 16);
    const sec = pDate.slice(17, 19);
    const conversion =
      year +
      "-" +
      mounth +
      "-" +
      day +
      "T" +
      hour +
      ":" +
      min +
      ":" +
      sec +
      "+01:00";
    return conversion;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full flex">
        <div className="w-1/3 pt-5 ml-52">
          <p className="font-jakartaSans text-xl font-bold">
            Le {formatDate(trajet.departDate)}
          </p>
          <p className="font-jakartaSans text-xl font-bold">
            à {formatHour(trajet.departDate)}
          </p>
          <p className="font-jakartaSans mt-2">
            Nombre de place disponible {participants} / {trajet.availableSeats}
          </p>
          <TrajetRecapCard
            className={
              isClicked
                ? "mt-5 mb-16 w-4/5 shadow-inset p-5 hover:cursor-pointer hover:bg-grey-afpa-light"
                : "mt-5 mb-16 w-4/5 shadow-custom p-5 hover:cursor-pointer hover:bg-grey-afpa-light"
            }
            obj={trajet}
            onClick={() => setIsClicked(!isClicked)}
          />
          {/* // TODO - Return object in back ( the same as TrajetView object ) */}
          <p className="font-jakartaSans text-gradient mb-10">
            Choisir le point de covoiturage
          </p>
          <p className="font-jakartaSans text-gradient mb-10">
            Proposer un point de covoiturage
          </p>
          <p className="font-jakartaSans text-sm font-bold">
            Message du conducteur
          </p>
          <div className="w-full mt-5 p-3 border-2 border-grey-afpa-light">
            {trajet.message}
          </div>
        </div>
        <div className="grow flex justify-center">
          {isClicked ? (
            <Map obj={trajet} />
          ) : (
            <DriverCard className="mt-16" obj={trajet} />
          )}
        </div>
      </div>
      <div className="w-full h-1/4 pb-8 flex justify-center items-end">
        <div className="w-1/2 flex justify-end items-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-green-afpa hover:shadow-lg hover:text-white transition duration-500 text-green-afpa font-jakartaSans border-green-afpa border-2 px-8 mr-4 h-11 rounded-3xl"
          >
            Retour
          </button>
        </div>
        <div className="w-1/2 flex items-end">
          <button
            type="submit"
            className="bg-green-afpa hover:bg-green-afpa-alert hover:shadow-lg transition duration-500 text-white font-jakartaSans px-8 h-11 ml-4 rounded-3xl"
            onClick={sendReservation}
          >
            Réserver ce trajet
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecapTrajetView;
