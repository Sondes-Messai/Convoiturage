import React, { useEffect, useState } from "react";
import AccueilCard from "../../components/utils/AccueilCard";
import { AdaptIcon } from "./../../assets/icons/AdaptIcon";
import { EconomicIcon } from "./../../assets/icons/EconomicIcon";
import { EnvironmentIcon } from "./../../assets/icons/EnvironmentIcon";
import { AccueilWave } from "./../../assets/icons/AccueilWave";
import TrajetSearch from "../../components/trajet/TrajetSearch";
import { useNavigate } from "react-router-dom";
import GreenButton from "../../components/utils/button/GreenButton";

import SearchRide from "../../models/SearchRide";

const Accueil = () => {
	const [isChecked, setChecked] = useState(1);
	const [departure, setDeparture] = useState({});
	const [arrival, setArrival] = useState({});

	const [date, setDate] = useState({});
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	function searchRides() {
		if (
			//selectedDeparture.id !== undefined &&
			//selectedArrival.id !== undefined &&
			date !== undefined &&
			departure !== "" &&
			arrival !== ""
		) {
			let departCity = departure.properties;
			let arrivalCity = arrival.properties;
			setError(false);
			let search = new SearchRide(
				//selectedDeparture.town,
				departCity.city,
				//selectedArrival.town,
				arrivalCity.city,
				date
			);

			console.log(search);
			localStorage.setItem("serachRides", JSON.stringify(search));
			navigate("/trajets");
		} else {
			setError(true);
		}
	}

	return (
		<div>
			<div className="flex flex-col relative overflow-hidden justify-around items-center">
				<AccueilWave className="absolute top-0" />
				<AccueilWave className="opacity-50 absolute top-7" />
				<AccueilWave className="opacity-30 absolute top-11" />
				<p className="pb-20 pt-10 text-grey-afpa-mid  font-jakartaSans z-20  text-center font-bold text-3xl sm:text-white md:w-[600px]">
					Trouvez des partenaires de covoiturage pour une conduite économique
				</p>
				<div className="z-30">
					<TrajetSearch
						departure={departure}
						setDeparture={setDeparture}
						arrival={arrival}
						setArrival={setArrival}
						setDate={setDate}
					/>

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
								Aller simple
							</label>
						</div>
						<div className="flex items-center mr-8">
							<input
								type="radio"
								name="radio"
								id="radio"
								className="accent-rose-afpa w-4 h-4"
								onClick={() => setChecked(2)}
							/>
							<label htmlFor="radio" className="font-jakartaSans">
								Aller-retour
							</label>
						</div>
						<div className="flex items-center">
							<input
								type="radio"
								name="radio"
								id="radio"
								className="accent-rose-afpa w-4 h-4"
								onClick={() => setChecked(3)}
							/>
							<label htmlFor="radio" className="font-jakartaSans">
								Trajet régulier
							</label>
						</div>
					</div>
					{isChecked == 2 ? (
						<TrajetSearch
							departure={departure}
							setDeparture={setDeparture}
							arrival={arrival}
							setArrival={setArrival}
							setDate={setDate}
						/>
					) : (
						<></>
					)}
				</div>

				<GreenButton
					type="submit"
					onClick={searchRides}
					cas={"with-m-y"}
					id="bouton_recherche_accueil"
				>
					Recherche
				</GreenButton>
				{error ? (
					<p className="font-jakartaSans">
						Veuillez entrer des informations valides
					</p>
				) : (
					<></>
				)}
			</div>
			<div>
				<div className="pt-20  mb-10  bg-grey-afpa-light grid place-items-center  max-lg:grid-rows-3 lg:grid-cols-3">
					<AccueilCard icon={<AdaptIcon width="50px" height="50px" />}>
						<p className="text-center font-jakartaSans font-bold text-sm mb-4 text-gradient">
							Avantage de l'adaptabilité
						</p>
						<p className="text-center font-jakartaSans font-medium text-[13px]">
							La personnalisation des trajets est l'un des avantages clés du
							covoiturage, offrant aux utilisateurs la possibilité d'adapter
							leurs déplacements en fonction de leurs besoins spécifiques.
						</p>
					</AccueilCard>
					<AccueilCard icon={<EnvironmentIcon width="50px" height="50px" />}>
						<p className="text-center font-jakartaSans font-bold text-sm mb-4 text-gradient">
							Avantages environnementaux
						</p>
						<p className="text-center font-jakartaSans font-medium text-[13px]">
							En partageant une voiture, plusieurs personnes utilisent un seul
							véhicule, réduisant ainsi le nombre de voitures sur la route et
							les émissions de gaz à effet de serre.
						</p>
					</AccueilCard>
					<AccueilCard icon={<EconomicIcon width="50px" height="50px" />}>
						<p className="text-center font-jakartaSans font-bold text-sm mb-4 text-gradient">
							Avantages économiques
						</p>
						<p className="text-center font-jakartaSans font-medium text-[13px]">
							Le covoiturage, c'est partager plus qu'un simple trajet. C'est
							aussi partager les coûts et faire des économies importantes sur
							les frais de transport.
						</p>
					</AccueilCard>
				</div>
			</div>
		</div>
	);
};

export default Accueil;
