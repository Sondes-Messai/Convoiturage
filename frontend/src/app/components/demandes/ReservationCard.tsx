import React from "react";
import Reservation from "../../models/Reservation";

function ReservationCard({ props }) {
	const d: Reservation = props.object;
	console.log(d);
	return <div>something something</div>;
}

export default ReservationCard;
