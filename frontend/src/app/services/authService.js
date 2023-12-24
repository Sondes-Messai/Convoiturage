import apiBackEnd from "../api/backend/api.Backend";

const authService = {
  register: async (user) => {
    const userData = JSON.stringify(user);
    const { data } = await apiBackEnd.post("/auth/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  authenticate: async (user) => {
    const userData = JSON.stringify(user);
    const { data } = await apiBackEnd.post("/auth/authenticate", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  },
};

export default authService;
