import React, { useEffect, useState } from "react";
import TrajetFindCard from "../../components/trajet/TrajetFindCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRide, updateRide } from "../../redux-store/rideSlice";
import rideService from "../../services/rideService";
import TrajetSearch from "../../components/trajet/TrajetSearch";
import RideList from "../../models/RideList";
import Ride from "../../models/Ride";
import SearchRide from "../../models/SearchRide";

const TrajetsView = () => {
	const [trajets, setTrajets] = useState([]);
	const [date, setDate] = useState("");
	const [departure, setDeparture] = useState("");
	const [arrival, setArrival] = useState("");
	const navigate = useNavigate();
	const [emptyList, setEmptyList] = useState(true);

	useEffect(() => {
		getList();
	}, [arrival, departure, date]);

	async function getList() {
		let search = JSON.parse(localStorage.getItem("serachRides"));
		if (
			departure.properties !== undefined &&
			arrival.properties !== undefined &&
			date !== ""
		) {
			search = new SearchRide();
			let departCity = departure.properties;
			let arrivalCity = arrival.properties;
			search.depart = departCity.city;
			search.arrival = arrivalCity.city;
			search.departDate = date.toString();
		}
		if (search !== null) {
			console.log(search);
			rideService
				.searchRide(search)
				.then((results) => {
					setEmptyList(false);
					setTrajets(results);
				})
				.catch(() => {
					setEmptyList(true);
					setTrajets([]);
				});
			localStorage.removeItem("serachRides");
		}
	}

	return (
		<div className="w-full">
			<div className="w-full py-6 h-1/6 gradient flex justify-center items-center">
				<TrajetSearch
					departure={departure}
					setDeparture={setDeparture}
					arrival={arrival}
					setArrival={setArrival}
					setDate={setDate}
				></TrajetSearch>
			</div>
			<div className="w-3/4 mx-auto flex flex-col items-center py-5">
				{emptyList ? (
					<p className="font-jakartaSans font-bold text-2xl mb-5">
						Pas d'annonce de covoiturage trouvée
					</p>
				) : (
					<p className="font-jakartaSans font-bold text-2xl mb-5">
						{trajets.length} annonce(s) de covoiturage trouvée(s)
					</p>
				)}

				<ul>
					{trajets.map((trajet) => (
						<li key={trajet.id}>
							<TrajetFindCard
								obj={trajet}
								className="w-auto mb-8 hover:cursor-pointer"
								onClick={() => {
									navigate(`/trajet`);
									localStorage.setItem("selectedRide", JSON.stringify(trajet));
								}}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TrajetsView;
