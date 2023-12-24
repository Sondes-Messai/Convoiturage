import apiBackEnd from "../api/backend/api.Backend";

const userService = {
  getAll: async (status, page = 0) => {
    const { data } = await apiBackEnd.get(
      `/user/admin/all?status=${status}&size=5&page=${page}`
    );
    return data.content;
  },

  getUserByEmailOrMatricule: async (emailOrMatricule) => {
    const { data } = await apiBackEnd.get(`/user/email/${emailOrMatricule}`);
    return data;
  },

  getUserById: async (id) => {
    const { data } = await apiBackEnd.get(`/user/id/${id}`);

    return data;
  },

  registerUserAsAdmin: async (user) => {
    let createdDate = new Date().toLocaleString("fr");
    createdDate = createdDate.replace(/\//g, "-");

    const userPrefix = {
      createdDate: createdDate,
      status: "ACTIF",
    };

    const userData = JSON.stringify({ ...user, ...userPrefix });
    const { data } = await apiBackEnd.post(`/user/admin/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  },

  deleteByMailOrMatricule: async (emailOrMatricule) => {
    const { data } = await apiBackEnd.delete(
      `/user/delete/${emailOrMatricule}`
    );
    return data;
  },
  /**
   * méthode permettant de mettre un utilisateur à jour
   */
  updateUser: async (emailOrMatricule, user) => {
    const { data } = await apiBackEnd.put(
      `/user/update/${emailOrMatricule}`,
      user
    );
    return data;
  },
  /**
   * méthode permettant de mettre un utilisateur à jour avec changement de la photo
   */
  updateUserWithFile: async (formData) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await apiBackEnd.put(
      `/user/updatewithfile`,
      formData, config
    );
    return data;
  },

  getUserPreferences: async (emailOrMatricule) => {
    const { data } = await apiBackEnd.get(
      `/user/${emailOrMatricule}/preferences`
    );
    return data;
  },

  updateUserPreferences: async (emailOrMatricule, userPreferences) => {
    const { data } = await apiBackEnd.put(
      `/user/${emailOrMatricule}/preferences/update`,
      userPreferences
    );
    return data;
  },

  emailExiste: async (email) => {
    const { data } = await apiBackEnd.get(`auth/exist-email/${email}`);
    return data;
  },

  updatePassword: async (changePassword) => {
    const { data } = await apiBackEnd.put(
      "/user/change-password",
      changePassword,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  },

  search: async (
    search,
    direction = "ASC",
    pageIndex = 0,
    pageSize = 5,
    property = "firstName",
    status = ""
  ) => {
    try {
      const response = await apiBackEnd.get(`/user/admin/search`, {
        params: {
          status: status,
          search: search,
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

  blockUser: async (matricule) => {
    const { data } = await apiBackEnd.put(`user/admin/block/${matricule}`);
    return data;
  },

  unblockUser: async (matricule) => {
    const { data } = await apiBackEnd.put(`user/admin/unblock/${matricule}`);
    return data;
  },
};

export default userService;
