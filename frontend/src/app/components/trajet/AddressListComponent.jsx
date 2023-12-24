import React, { useState, useEffect } from "react";

const AddressListComponent = ({
	filteredDepartureList,
	setFilteredDepartureList,
	filteredArrivalList,
	setFilteredArrivalList,
	arrival,
	departure,
	setArrival,
	setDeparture,
	setSelectedDeparture,
	setSelectedArrival,
}) => {
	const [depIsUndefined, setDepIsUndefined] = useState(true);
	const [arrIsUndefined, setArrIsUndefined] = useState(true);

	useEffect(() => {
		check(departure).then((bool) => setDepIsUndefined(bool));
		check(arrival).then((bool) => setArrIsUndefined(bool));
	}, [departure, arrival]);

	async function check(location) {
		if (location.properties === undefined) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div className="grid grid-cols-3 gap-4 my-4">
			{depIsUndefined ? (
				<div></div>
			) : (
				<ul className="bg-white rounded-3xl shadow-[0_10px_20px_0_rgba(0,0,0,0.15)] ">
					<h6 className="text-center my-2">Liste des départs trouvés :</h6>
					{filteredDepartureList.map((address) => (
						<li
							className="bg-white rounded-3xl font-jakartaSans font-medium text-[16px]"
							key={address.id}
							onClick={() => (
								setDeparture({}),
								setFilteredDepartureList([]),
								setSelectedDeparture(address)
							)}>
							{address.road}
						</li>
					))}
				</ul>
			)}
			{arrIsUndefined ? (
				<div></div>
			) : (
				<ul className="bg-white rounded-3xl shadow-[0_10px_20px_0_rgba(0,0,0,0.15)]">
					<h6 className="text-center my-2">Liste des arrivées trouvées :</h6>
					{filteredArrivalList.map((address) => (
						<li
							className="bg-white rounded-3xl font-jakartaSans font-medium text-[16px]"
							key={address.id}
							onClick={() => (
								setArrival({}),
								setFilteredArrivalList([]),
								setSelectedArrival(address)
							)}>
							{address.road}
						</li>
					))}
				</ul>
			)}
			<div></div>
		</div>
	);
};

export default AddressListComponent;
