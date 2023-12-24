import apiBackEnd from "../api/backend/api.Backend";

const reservationService = {
	createReservation: async (reservationDTO) => {
		const { data } = await apiBackEnd.post("/reservations", reservationDTO);
		return data;
	},

	getByUser: async (userId) => {
		const { data } = await apiBackEnd.get(`/reservations/user/${userId}`);
		return data;
	},
};

export default reservationService;
