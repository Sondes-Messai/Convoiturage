import React, { useState, useEffect } from "react";
import { NavIcon } from "../../assets/icons/NavIcon";
import AddressSearch from "./AdressSearch";
import addressService from "../../services/addressService";

const TrajetSearch = ({
	arrival,
	setArrival,
	departure,
	setDeparture,
	setDate,
}) => {
	function getDate(value) {
		let date = "";
		if (value !== undefined) {
			date = new Date(value).toISOString().slice(0, 19);
		}
		setDate(date);
		console.log(date);
	}

	return (
		<div className="bg-white rounded-3xl shadow-[0_10px_20px_0_rgba(0,0,0,0.15)] grid grid-cols-3 gap-2">
			<div className="flex items-center mr-2">
				<NavIcon width="42px" height="42px" className="fill-green-afpa mr-2" />
				<AddressSearch
					placeholder="Lieu de départ"
					className="w-full px-3 py-2 outline-none border-none text-left "
					setValue={setDeparture}
					value={departure}
				/>
			</div>
			<div className="flex items-center px-4 border-x-2">
				<NavIcon width="42px" height="42px" className="fill-rose-afpa mr-2" />
				<AddressSearch
					placeholder="Lieu d'arrivée"
					className="w-full px-3 py-2 outline-none border-none text-left"
					setValue={setArrival}
					value={arrival}
				/>
			</div>
			<input
				id="date"
				name="date"
				type="datetime-local"
				className="flex items-center text-center"
				onChange={() => {
					getDate(document.getElementById("date").value);
				}}
			/>
		</div>
	);
};

export default TrajetSearch;
