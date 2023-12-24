class Reservation {
	constructor(rideId, status, userId, applicantId) {
		(this.rideId = rideId),
			(this.status = status),
			(this.userId = userId),
			(this.applicantId = applicantId);
	}
}

export default Reservation;
