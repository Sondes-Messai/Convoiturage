import React, { useState, useEffect } from "react";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { JourneyIcon } from "../../assets/icons/JourneyIcon";
import { formatHours } from "../utils/Outils";
import ModalButton from "../utils/button/ModalButton";
import Modal from "../Modal";
import MapView from "./MapView";

function TrajetRecapCard({ onClick, className, obj, retour }) {
	const [isMapModalOpen, setIsMapModalOpen] = useState(false);

	/**
	 * fonction pour récupérer l'heure d'une date au format xx:xx
	 */
	const formatTime = (mydate) => {
		const date = new Date(mydate);
		const options = {
			hour: "numeric",
			minute: "numeric",
		};
		const formattedTime = date.toLocaleTimeString("fr-FR", options);
		return formattedTime;
	};

	return (
		<>
			<div
				className={`flex rounded-3xl bg-white ${className}`}
				onClick={() => {
					setIsMapModalOpen(true);
					onClick;
				}}
			>
				<div className="flex flex-col justify-between">
					{retour !== true ? (
						<>
							<span className="font-jakartaSans font-bold text-sm mt-1">
								{(obj.departureStartDate &&
									formatTime(obj.departureStartDate)) ||
									formatHours(obj.departDate)}
							</span>
							<span className="font-jakartaSans font-bold text-sm mb-1">
								{(obj.departureEndDate && formatTime(obj.departureEndDate)) ||
									formatHours(obj.arrivalDate)}
							</span>
						</>
					) : (
						<>
							<span className="font-jakartaSans font-bold text-sm mt-1">
								{(obj.arrivalStartDate && formatTime(obj.arrivalStartDate)) ||
									formatHours(obj.departDate)}
							</span>
							<span className="font-jakartaSans font-bold text-sm mb-1">
								{(obj.arrivalEndDate && formatTime(obj.arrivalEndDate)) ||
									formatHours(obj.arrivalDate)}
							</span>
						</>
					)}
				</div>
				<div className="flex flex-col mx-4">
					<JourneyIcon width="30px" height="100%" className="h-full" />
				</div>
				{retour !== true ? (
					<div className="flex flex-col justify-between grow">
						<p className="font-jakartaSans mt-1">
							{obj.lieuDepart?.properties.city ||
								obj.addresses.find((address) => address.typeAddress === "START")
									.town}
						</p>
						<p className="font-jakartaSans mb-1">
							{obj.lieuArrivee?.properties.city ||
								obj.addresses.find(
									(address) => address.typeAddress === "ARRIVAL"
								).town}
						</p>
					</div>
				) : (
					<div className="flex flex-col justify-between grow">
						<p className="font-jakartaSans mt-1">
							{obj.lieuArrivee?.properties.city ||
								obj.addresses.find(
									(address) => address.typeAddress === "ARRIVAL"
								).town}
						</p>
						<p className="font-jakartaSans mb-1">
							{obj.lieuDepart?.properties.city ||
								obj.addresses.find((address) => address.typeAddress === "START")
									.town}
						</p>
					</div>
				)}
				<ModalButton
					className="text-violet-600 underline"
					onClick={() => {
						setIsMapModalOpen(true);
					}}
				>
					{<ArrowIcon width="20px" height="20px" />}
				</ModalButton>
			</div>
			<div className="flex flex-col justify-center justify-self-end">
				<Modal
					isOpen={isMapModalOpen}
					isInfo
					onCancel={() => setIsMapModalOpen(!isMapModalOpen)}
					width={"80"}
				>
					<MapView obj={obj} />
				</Modal>
			</div>
		</>
	);
}

export default TrajetRecapCard;
