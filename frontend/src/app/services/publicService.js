import apiBackEnd from "../api/backend/api.Backend";

const publicService = {
  /**
   * méthode permettant de vérifier si l'email est déjà utilisé
   * @param {*} email email à vérifier 
   * @returns true or false
   */
  emailExiste: async (email) => {

    const { data } = await apiBackEnd.get(`auth/exist-email/${email}`);

    return data;
  },
  /**
   * méthode permettant de vérifier si le label d'une préférence est déjà utilisé
   * @param {*} label label à vérifier 
   * @returns true or false
   */
  labelExiste: async (label) => {
    const { data } = await apiBackEnd.get(`auth/exist-label/${label}`);
    return data;
  },
};

export default publicService;
