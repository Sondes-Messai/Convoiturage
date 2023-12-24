import React, { useEffect, useState } from "react";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { useNavigate, useParams } from "react-router-dom";
import rideService from "../../services/rideService";
import { JourneyLandscapeIcon } from "../../assets/icons/JourneyLandscapeIcon";
import WhiteWithGreenBorderButton from "../utils/button/WhiteWithGreenBorderButton";
import ModalButton from "../utils/button/ModalButton";
import Modal from "../Modal";
import MapViewArchive from "../trajet/MapViewArchive";

const AdminTrajetRecapCard = () => {
  const navigate = useNavigate();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  //ride : id du trajet
  const { ride } = useParams();

  const [rideDetails, setRideDetails] = useState([]);
  const [nbParticipants, setNbParticipants] = useState(0);
  
  /**
   * récupération du trajet par son id
   */
  async function getRide() {
    const response = await rideService.getRideById(ride);
    setRideDetails(response);
    console.log("response", response);
  }

  /**
   * lancement de la récupération
   */
  useEffect(() => {
    getRide();
  }, []);

  return (
    <div className="mx-24 bg-white">
      <h2 className="flex justify-center font-bold text-lg mb-16">Le trajet</h2>
      <div className="flex flex-col">
        {rideDetails &&
        rideDetails.departDate &&
        rideDetails.departDate.substring(0, 9) == rideDetails &&
        rideDetails.arrivalDate &&
        rideDetails.arrivalDate.substring(0, 9) ? (
          <h1 className="font-bold text-2xl mb-4">
            {rideDetails &&
              rideDetails.departDate &&
              rideDetails.departDate.substring(0, 9)}{" "}
            {rideDetails &&
              rideDetails.arrivalDate &&
              rideDetails.arrivalDate.substring(0, 9)}
          </h1>
        ) : (
          <h1 className="font-bold text-2xl mb-4">
            {rideDetails &&
              rideDetails.departDate &&
              rideDetails.departDate.substring(0, 9)}
          </h1>
        )}

        <h3 className="font-bold text-sm mb-4">
          Nombre de places occupées {nbParticipants}/
          {rideDetails && rideDetails.availableSeats}
        </h3>
        <div className="flex flex-row justify-center mb-4 w-full">
          <p className="flex justify-center font-jakartaSans text-sm">
            {rideDetails &&
              rideDetails.addresses &&
              rideDetails.addresses[0] &&
              rideDetails.addresses[0].road}
            <br />
            {rideDetails &&
              rideDetails.addresses &&
              rideDetails.addresses[0] &&
              rideDetails.addresses[0].zipCode}{" "}
            {rideDetails &&
              rideDetails.addresses &&
              rideDetails.addresses[0] &&
              rideDetails.addresses[0].town}
            <br />
            {rideDetails &&
              rideDetails.departDate &&
              rideDetails.departDate.substring(10, 16)}
          </p>
          <div className="flex justify-center mx-4">
            <JourneyLandscapeIcon
              width="60px"
              height="100%"
              className="h-full"
            />
          </div>
          <p className="flex justify-center font-jakartaSans text-sm">
            {rideDetails &&
              rideDetails.addresses &&
              rideDetails.addresses[1] &&
              rideDetails.addresses[1].road}
            <br />
            {rideDetails &&
              rideDetails.addresses &&
              rideDetails.addresses[1] &&
              rideDetails.addresses[1].zipCode}{" "}
            {rideDetails &&
              rideDetails.addresses &&
              rideDetails.addresses[1] &&
              rideDetails.addresses[1].town}
            <br />
            {rideDetails &&
              rideDetails.arrivalDate &&
              rideDetails.arrivalDate.substring(10, 16)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mx-auto py-2 bg-grey-afpa-light rounded-b-xl">
      <ModalButton
          className="text-violet-600 underline"
          onClick={() => {
            setIsMapModalOpen(true);
          }}
        >
          {<ArrowIcon width="20px" height="20px" className="rotate-90" />}
        </ModalButton>
      </div>
      <div className="flex flex-col justify-center justify-self-end">
        <Modal
          isOpen={isMapModalOpen}
          isInfo
          onCancel={() => setIsMapModalOpen(!isMapModalOpen)}
          width={"80"}
        >
          <MapViewArchive obj={rideDetails} />
        </Modal>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col">
          <p className="font-jakartaSans text-sm ml-2">Conducteur</p>
          <div className="font-bold flex flex-col justify-center items-center shadow-lg rounded-2xl py-10">
            <img
              className="rounded-full pb-2"
              src={
                rideDetails && rideDetails.picture && rideDetails.picture.url
              }
              width="50px"
              height="50px"
            />
            <br />
            {rideDetails && rideDetails.driverFirstName}{" "}
            {rideDetails && rideDetails.driverLastName}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-jakartaSans text-sm ml-2">Passagers</p>
          {rideDetails &&
          rideDetails.participants &&
          rideDetails.participants.length == 0 ? (
            <span className="font-bold flex justify-center items-center shadow-lg rounded-2xl py-20">
              Pas de passager
            </span>
          ) : (
            <span>Passagers à coder</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <p className="font-jakartaSans text-sm ml-2">Voiture</p>
          <div className="flex flex-row justify-arround border border-grey-afpa-light rounded-2xl p-2">
            {/* <img
              className="rounded-full pb-2"
              src={
                rideDetails && rideDetails.car && rideDetails.picture.url
              }
              width="50px"
              height="50px"
            /> */}
            <p>
              {rideDetails && rideDetails.carBrand}
              <br />
              {rideDetails && rideDetails.carModel}
              <br />
              {rideDetails && rideDetails.carColor}
              <br />
              {rideDetails && rideDetails.carLicensePlate}
            </p>
          </div>
        </div>
        <div>
          <p className="font-jakartaSans text-sm ml-2">Message du conducteur</p>
          <p className="border border-grey-afpa-light rounded-md p-4">
            {rideDetails && rideDetails.message ? (rideDetails && rideDetails.message) : (<span className="font-bold flex justify-center items-center py-10">Pas de message</span>)}
          </p>
        </div>
      </div>
      <div className="flex justify-center my-8">
        <WhiteWithGreenBorderButton onClick={() => navigate(`../admin/archives/${2}`)}>
          <span>Retour</span>
        </WhiteWithGreenBorderButton>
      </div>
    </div>
  );
};

export default AdminTrajetRecapCard;
