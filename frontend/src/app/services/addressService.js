import axios from "axios";
import apiBackEnd from "../api/backend/api.Backend";

// service pour les adresses
const addressService = {
  /**
   * méthode permettant de proposer un autocomplete sur les adresses
   * @param {*} search champs de recherche d'adresse
   * @returns une liste d'adresse
   */
  autocomplete: async (search) => {
    const { data } = await axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${search}&limit=15`
    );
    return data;
  },
  /**
   * méthode permettant de proposer un autocomplete sur les adresses
   * @param {*} search champs de recherche d'adresse
   * @returns une liste d'adresse
   */
  itinerayCalcul: async (departure,arrival) => {
    const { data } = await axios.get(
      `https://wxs.ign.fr/calcul/geoportail/itineraire/rest/1.0.0/route?resource=bdtopo-osrm&profile=car&optimization=fastest&start=${departure}&end=${arrival}&intermediates=&constraints=&geometryFormat=geojson&getSteps=true&getBbox=true`
    );
    console.log("itinéraire", data)
    return data;
  },

  /**
   * Méthode qui récupère toutes les adresses de la bdd
   * @returns une liste d'adresses 
   */
  getAllAddresses : async () => {
    const {data} = await apiBackEnd.get(`/address`)
    return data; 
  }



};

export default addressService;
