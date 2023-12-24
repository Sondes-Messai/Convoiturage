import apiBackEnd from "../api/backend/api.Backend";

//Service pour les préférences
const preferencesService = {
  /**
   * méthode permettant de récupérer la liste des préférences
   * @returns liste de toutes les preferences
   */
  getAll: async () => {
    const { data } = await apiBackEnd.get(`/preference`);
    return data;
  },
  /**
   * méthode permettant d'ajouter une nouvelle préférence
   * @param {*} formData formulauire contenant l'image et le label de la préférence
   * @returns 
   */
  addNeWPreference: async (formData) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await apiBackEnd.post(`/preference`, formData, config);
    return data;
  },
  /**
   * méthode permettant de changer l'icône d'une préférence déjà existante
   * @param {} id id de la préférence, le label est l'id d'une préférence
   * @param {*} formData nouveau fichier image
   * @returns 
   */
  updateIcon: async (id, formData) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await apiBackEnd.post(`/preference/update/${id}`,formData, config);
    return data;
  },
  /**
   * méthode permettant de passer une préférence au status archivé
   * @param {*} id id de la préférence, le label est l'id d'une préférence
   * @returns 
   */
  archiveChanged: async (id) => {
    const { data } = await apiBackEnd.post(`/preference/archived/${id}`);
    return data;
  },
    /**
   * méthode permettant de changer le status de la visibilité de la préférence
   * @param {*} id id de la préférence, le label est l'id d'une préférence
   * @returns 
   */
  visibilityChanged: async (id) => {
    const { data } = await apiBackEnd.post(`/preference/visibility/${id}`);
    return data;
  },


  /**
   * Méthode permettant de supprimer une préférence.
   * @param {*} label Label de la préférence à supprimer.
   * @returns Réponse de la suppression.
   */
  deletePreference: async (label) => {
    try {
      const response = await apiBackEnd.delete(`/preference/delete/${label}`);
      console.log("Réponse de la suppression :", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la préférence :", error);
      throw error;
    }
  },
};

export default preferencesService;
