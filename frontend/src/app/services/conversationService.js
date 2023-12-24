import apiBackEnd from "../api/backend/api.Backend";

const conversationService = {
  getAllByUserId: async (userId) => {
    const { data } = await apiBackEnd.get(`/conversation/${userId}`);
    return data;
  },

  getAll: async () => {
    const { data } = await apiBackEnd.get(`/conversation`);
    return data;
  },

  findById: async (id) => {
    const { data } = await apiBackEnd.get(`/conversation/chat/${id}`);
    console.log("data", data)
    return data;
  },

  findAll: async (
    direction = "ASC",
    pageIndex = 0,
    pageSize = 5,
    property = "date"
  ) => {
    try {
      const response = await apiBackEnd.get(`/conversation/search`, {
        params: {
          number: pageIndex.toString(),
          size: pageSize.toString(),
          direction,
          property,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default conversationService;
