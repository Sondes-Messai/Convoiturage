import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentPageBar from "../../components/utils/CurrentPageBar";
import ReservationCard from "../../components/demandes/ReservationCard";
import reservationService from "../../services/reservationService";
import authService from "../../services/authService";
import userService from "../../services/userService";
import { getEmail } from "../../services/tokenServices";
import Reservation from "../../models/Reservation";

const DemandesView = () => {
	const navigate = useNavigate();
	const [demandes, setDemandes] = useState([]);

	useEffect(() => {
		getDemandes();
	}, []);

	async function getDemandes() {
		await userService.getUserByEmailOrMatricule(getEmail()).then((user) => {
			reservationService.getByUser(user.id).then((reservations) => {
				//console.log(reservations);
				reservations.push(new Reservation(1, "PENDING", 1, 2));
				reservations.push(new Reservation(2, "PENDING", 1, 3));
				reservations.push(new Reservation(3, "PENDING", 1, 4));
				setDemandes(reservations);
			});
		});
	}

	return (
		<div>
			<CurrentPageBar text={"Demandes"} />
			<ul className="h-screen flex items-center justify-center">
				{demandes.map((demande) => {
					<li key={demande.rideId}>
						<ReservationCard object={demande}>AH</ReservationCard>;
					</li>;
				})}
			</ul>
		</div>
	);
};

export default DemandesView;
