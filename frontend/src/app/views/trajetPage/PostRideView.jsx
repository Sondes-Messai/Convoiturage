import React, { useEffect, useState } from "react";
import TrajetRecapCard from "../../components/trajet/TrajetRecapCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetRide, selectRide } from "../../redux-store/rideSlice";
import rideService from "../../services/rideService";
import DriverCard from "../../components/trajet/DriverCard";
import userService from "../../services/userService";
import { getEmail } from "../../services/tokenServices";
import { format } from "date-fns";

const PostRideView = () => {
	//initialisation des variables
	const navigate = useNavigate();
	const myRide = useSelector(selectRide);
	const [rideProps, setRideProps] = useState(null);
	const dispatch = useDispatch();

	const handleReset = () => {
	  dispatch(resetRide());
	};

	/**
	 * fonction de formatage de la date pour l'envoie en bdd
	 *
	 */
	const formattedDate = (date) => {
		const originalDate = new Date(date);
		const formattedDate = format(originalDate, "dd-MM-yyyy HH:mm:ss");
		return formattedDate;
	};

	/**
	 *méthode pour l'envoi du trajet en bdd
	 */
	const postRide = () => {
		if (myRide.type === "UNIQUE") {
			let goTrip = {
				message: myRide.message,
				carModel: myRide.car.modelLabel,
				carBrand: myRide.car.brandLabel,
				carColor: myRide.car.color.label,
				carLicensePlate: myRide.car.licensePlate,
				driverId: myRide.car.userId,
				driverFirstName: rideProps.firstName,
				driverLastName: rideProps.lastName,
				conversationId: 1,
				typeRide: myRide.type,
				departDate: formattedDate(myRide.departureStartDate),
				arrivalDate: formattedDate(myRide.departureEndDate),
				availableSeats: myRide.place,
				carLuggage: myRide.car.luggage,
				status: true,
				addresses: [
					{
						typeAddress: "START",
						road: myRide.lieuDepart.properties.label,
						zipCode: myRide.lieuDepart.properties.citycode,
						town: myRide.lieuDepart.properties.city,
						longitude: myRide.lieuDepart.geometry.coordinates[0],
						latitude: myRide.lieuDepart.geometry.coordinates[1],
					},
					{
						typeAddress: "ARRIVAL",
						road: myRide.lieuArrivee.properties.label,
						zipCode: myRide.lieuArrivee.properties.citycode,
						town: myRide.lieuArrivee.properties.city,
						longitude: myRide.lieuArrivee.geometry.coordinates[0],
						latitude: myRide.lieuArrivee.geometry.coordinates[1],
					},
				],
				itenary: myRide.itinery.geometry.coordinates,
				distance: myRide.itinery.distance,
			};
			rideService.createRide(goTrip);
			if (myRide.arrivalStartDate && myRide.arrivalEndDate) {
				let returnTrip = {
					message: myRide.message,
					carModel: myRide.car.modelLabel,
					carBrand: myRide.car.brandLabel,
					carColor: myRide.car.color.label,
					carLicensePlate: myRide.car.licensePlate,
					driverId: myRide.car.userId,
					driverFirstName: rideProps.firstName,
					driverLastName: rideProps.lastName,
					conversationId: 1,
					typeRide: myRide.type,
					departDate: formattedDate(myRide.arrivalStartDate),
					arrivalDate: formattedDate(myRide.arrivalEndDate),
					availableSeats: myRide.place,
					carLuggage: myRide.car.luggage,
					status: true,
					addresses: [
						{
							typeAddress: "START",
							road: myRide.lieuArrivee.properties.label,
							zipCode: myRide.lieuArrivee.properties.citycode,
							town: myRide.lieuArrivee.properties.city,
							longitude: myRide.lieuArrivee.geometry.coordinates[0],
							latitude: myRide.lieuArrivee.geometry.coordinates[1],
						},
						{
							typeAddress: "ARRIVAL",
							road: myRide.lieuDepart.properties.label,
							zipCode: myRide.lieuDepart.properties.citycode,
							town: myRide.lieuDepart.properties.city,
							longitude: myRide.lieuDepart.geometry.coordinates[0],
							latitude: myRide.lieuDepart.geometry.coordinates[1],
						},
					],
					itenary: myRide.itinery.geometry.coordinates,
					distance: myRide.itinery.distance,
				};
				rideService.createRide(returnTrip);
				handleReset();
			}
		}
	};

	/**
	 *
	 */
	async function loadProfile() {
		const profile = await userService.getUserByEmailOrMatricule(getEmail());
		setRideProps(profile);
	}

	useEffect(() => {
		loadProfile();
		return () => {};
	}, []);

	/**
	 * fonction de formatage de la date pour l'affichage
	 */
	const formatDate = (mydate) => {
		const date = new Date(mydate);
		const options = {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
		};
		const formattedDate = date.toLocaleDateString("fr-FR", options);
		return formattedDate;
	};
	console.log("myRide", myRide);
	return (
		<div className="mx-auto w-3/4 h-screen flex flex-col">
			<p className="font-bold text-xl md-4">Récapitulatif</p>

			<div className="w-full grid grid-cols-2 gap-4">
				<div>
					<p className="font-jakartaSans text-lg font-bold">
						Aller : {formatDate(myRide.departureStartDate)}
					</p>
					<p className="font-jakartaSans my-4 text-sm text-grey-afpa">
						{myRide.place} places disponibles
					</p>
					<TrajetRecapCard
						obj={myRide}
						className="w-2/3 drop-shadow-lg mb-4 ml-10"
					/>
					{myRide.arrivalStartDate && (
						<>
							<p className="font-jakartaSans text-lg font-bold">
								Retour : {formatDate(myRide.arrivalStartDate)}
							</p>
							<p className="font-jakartaSans my-4 text-sm text-grey-afpa">
								{myRide.place} places disponibles
							</p>
							<TrajetRecapCard
								obj={myRide}
								className="w-2/3 drop-shadow-lg mb-4 ml-10"
								retour={true}
							/>
						</>
					)}
				</div>
				<div>
					<div className="flex justify-center">
						<div className="w-2/3 flex justify-center border rounded-2xl">
							{rideProps ? (
								<div className="flex flex-col justify-between  w-2/3 px-5 py-16">
									<div className="flex flex-col items-center justify-center">
										<div className="w-[90px] h-[90px] rounded-full">
											<img
												src={rideProps.picture.url}
												alt=""
												className="rounded-3xl"
											/>
										</div>
										<p className="font-jakartaSans font-bold mt-3">
											{rideProps.firstName} {rideProps.lastName}
										</p>
									</div>
									<div className="flex flex-col items-center justify-between h-1/3">
										<hr className="w-3/4 h-[3px] my-3" />
										<div className="w-full flex">
											<div className="w-1/2">
												<img
													src="https://images.caradisiac.com/images/1/1/5/3/161153/S1-essai-video-skoda-citigo-2017-constat-des-tcheques-522337.jpg"
													alt=""
													className="rounded-3xl"
												/>
											</div>
											<div className="w-1/2  h-full flex flex-col">
												<p className="font-jakartaSans text-grey-afpa text-sm text-center">
													{rideProps.cars[0].brandLabel}
												</p>
												<p className="font-jakartaSans text-grey-afpa text-sm text-center">
													{rideProps.cars[0].modelLabel}
												</p>
												<p className="font-jakartaSans text-grey-afpa text-sm text-center">
													{rideProps.cars[0].color.label}
												</p>
												<p className="font-jakartaSans text-grey-afpa text-sm text-center">
													{rideProps.cars[0].licensePlate}
												</p>
											</div>
										</div>
										<hr className="w-3/4 h-[3px] my-3" />
									</div>
									<div className="flex flex-col">
										<p className="font-jakartaSans font-bold text-sm text-center my-3">
											Mes préférences
										</p>
										{/* <div className="flex justify-around mt-5">
                  <SmokerIcon
                    width="30px"
                    height="30px"
                    className={
                      preferences.some((pref) => pref.label === "smoker")
                        ? "fill-green-afpa"
                        : "fill-grey-afpa"
                    }
                  />
                  <BlablaIcon
                    width="30px"
                    height="30px"
                    className={
                      preferences.some((pref) => pref.label === "blabla")
                        ? "fill-green-afpa"
                        : "fill-grey-afpa"
                    }
                  />
                  <MusicIcon
                    width="30px"
                    height="30px"
                    className={
                      preferences.some((pref) => pref.label === "music")
                        ? "fill-green-afpa"
                        : "fill-grey-afpa"
                    }
                  />
                  <MaskIcon
                    width="30px"
                    height="30px"
                    className={
                      preferences.some((pref) => pref.label === "mask")
                        ? "fill-green-afpa"
                        : "fill-grey-afpa"
                    }
                  />
                </div> */}
									</div>
								</div>
							) : (
								<p>Chauffeur non trouvé</p>
							)}
						</div>
					</div>
					<p className="font-jakartaSans text-sm font-bold my-4">
						Mon message aux passagers
					</p>
					<div className="w-full border rounded ml-4">{myRide.message}</div>
				</div>
			</div>

			<div className="w-full h-1/4 flex justify-center items-end">
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
						type="button"
						className="bg-green-afpa hover:bg-green-afpa-alert hover:shadow-lg transition duration-500 text-white font-jakartaSans px-8 h-11 ml-4 rounded-3xl"
						onClick={() => {
							postRide();
							navigate("/confirme-ride", { confirmationType: "CREATION" });
						}}
					>
						Publier
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostRideView;
