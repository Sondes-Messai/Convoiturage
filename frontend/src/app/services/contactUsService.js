import apiBackEnd from "../api/backend/api.Backend";

const contactUsService = {
  getAll: async () => {
    const { data } = await apiBackEnd.get("/contact_us");
    return data;
  },

  deleteById: async(id) => {
    const { data } = await apiBackEnd.delete(
      `/contact_us/${id}`);
    return data;
  },

  findAll: async (
    direction = "ASC",
    pageIndex = 0,
    pageSize = 5,
    property = "createdDate"
  ) => {
    try {
      const response = await apiBackEnd.get(`/contact_us/search`, {
        params: {
          number: pageIndex,
          size: pageSize,
          direction,
          property
        },
      });
console.log("contactForms", response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
};

export default contactUsService;
