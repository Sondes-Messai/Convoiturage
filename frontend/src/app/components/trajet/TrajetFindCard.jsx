import React from "react";
import TrajetRecapCard from "./TrajetRecapCard";
import Ride from "../../models/Ride";

function TrajetFindCard({ obj, onClick, className }) {
	const ride = new Ride(obj);
	const driverPicture = ride.driverPicture;
	return (
		<div
			className={`rounded-3xl flex items-center p-8 bg-white shadow-custom ${className}`}
			onClick={onClick}
		>
			<div className="w-1/2 h-full flex border-r-2 mr-4">
				<div className="flex justify-center items-center">
					<div className="w-[90px] h-[90px] rounded-full">
						<img src={driverPicture.url} width="100%" height="100%" alt="" />
					</div>
				</div>
				<div className="flex flex-col justify-evenly ml-10">
					<p className="font-jakartaSans font-bold">{`${ride.driverFirstName} ${ride.driverLastName}`}</p>
					<div className="flex flex-col">
						<p className="font-jakartaSans text-sm">{ride.carModelBrandName}</p>
						<p className="font-jakartaSans text-sm">{ride.carModel}</p>
					</div>
				</div>
			</div>
			<div className="w-1/2 flex items-center">
				<TrajetRecapCard obj={ride} className="w-full" />
			</div>
		</div>
	);
}

export default TrajetFindCard;
