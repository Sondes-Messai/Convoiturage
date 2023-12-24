import apiBackEnd from "../api/backend/api.Backend";

const siteService = {
  
  getAll: async () => {
    const { data } = await apiBackEnd.get(`/site/all`);
    return data;
  },

  registerSite: async (site) => {
   
    const { data } = await apiBackEnd.post(`/site`,site, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return data
  },

  updateVisibility: async (id, site) => {
    const { data } = await apiBackEnd.put(
      `/site/${id}`,
      site
    );
    return data;
  },

  deleteById: async(id) => {
    const { data } = await apiBackEnd.delete(
      `/site/delete/${id}`);
    return data;
  }
};



export default siteService;