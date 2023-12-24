import React from "react";
import confirmeRide from "./../../assets/img/confirmeTrajet.png";
import { useNavigate } from "react-router-dom";

const ConfirmeRideView = () => {
	const navigate = useNavigate();
	return (
		<div className="h-screen w-screen absolute top-0 z-60  flex px-40 justify-center pt-28">
			<div className="">
				<img src={confirmeRide} alt="" />
			</div>
			<div className="flex-col flex w-[30%] items-center ml-12 pt-10">
				<h4 className="text-gradient">Trajet Publié avec Succès !</h4>

				<div className="mt-6">
					<p className=" font-jakartaSans text-1xl text-gray-500 text-center">
						Votre trajet est désormais visible par d'autres utilisateurs qui
						recherchent des options de voyage similaires. Les personnes
						intéressées pourront vous contacter via notre système de messagerie
						sécurisé afin de discuter des détails et de finaliser les
						arrangements.
					</p>
				</div>
				<button
					onClick={() => navigate("/")}
					className="mt-16 shadow-[0_10px_20px_0_rgba(0,0,0,0.15)] h-[47px] w-[134px] border-gradient-button text-green-400 rounded-3xl font-bold justify-center"
				>
					OK
				</button>
			</div>
		</div>
	);
};

export default ConfirmeRideView;
