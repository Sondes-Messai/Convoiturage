class Ride {
	constructor(rideData) {
		this.addresses = rideData.addresses;
		this.arrivalDate = rideData.arrivalDate;
		this.availableSeats = rideData.availableSeats;
		this.carBrand = rideData.carBrand;
		this.carColor = rideData.carColor;
		this.carLicensePlate = rideData.carLicensePlate;
		this.carLuggage = rideData.carLuggage;
		this.carModel = rideData.carModel;
		this.conversationId = rideData.conversationId;
		this.conversationName = rideData.conversationName;
		this.days = rideData.days;
		this.departDate = rideData.departDate;
		this.driverFirstName = rideData.driverFirstName;
		this.driverId = rideData.driverId;
		this.driverLastName = rideData.driverLastName;
		this.driverPicture = rideData.driverPicture;
		this.driverPreferences = rideData.driverPreferences;
		this.id = rideData.id;
		this.message = rideData.message;
		this.participants = rideData.participants;
		this.reservations = rideData.reservations;
		this.status = rideData.status;
		this.typeRide = rideData.typeRide;
	}
}

export default Ride;
