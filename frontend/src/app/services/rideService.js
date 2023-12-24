import apiBackEnd from "../api/backend/api.Backend";

const rideService = {
	searchRide: async (search) => {
		const { data } = await apiBackEnd.post(`/ride/search-ride`, search);
		return data;
	},

	getRideById: async (id) => {
		const { data } = await apiBackEnd.get(`/ride/${id}`);
		return data;
	},

	createRide: async (rideDTO) => {
		const { data } = await apiBackEnd.post("/ride", rideDTO);
		return data;
	},

	findAll: async (
		direction = "ASC",
		pageIndex = 0,
		pageSize = 5,
		property = "departDate"
	) => {
		try {
			const response = await apiBackEnd.get(`/ride/archive`, {
				params: {
					number: pageIndex.toString(),
					size: pageSize.toString(),
					direction,
					property,
				},
			});
			console.log("rides response", response);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getRideItenaryById: async (id) => {
		const { data } = await apiBackEnd.get(`/ride/archive/${id}`);
		console.log("getRideItenary", data);
		return data;
	},
};

export default rideService;
