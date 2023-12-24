import apiBackEnd from "../api/backend/api.Backend";

const carService = {
/**
 * Méthode d'ajout d'un nouveau véhicule
 * @param {*} email email de l'utilisateur
 * @param {*} carDto information du véhicule
 * @returns 
 */
  createCar: async (email, carDto) => {
    const carData = JSON.stringify(carDto);
    const { data } = await apiBackEnd.post("/car/create", carData, {
      headers: {
        "Content-Type": "application/json",
      },
      params: { email: email },
    });
    return data;
  },
/**
 * Méthode permettant de vérifier si la plaque d'immatriculation est déjà présente en bdd
 * @param {*} licensePlate la plaque d'immatriculation
 * @returns 
 */
  existByMatriculation: async (licensePlate) => {
    const { data } = await apiBackEnd.get(
      `/car/exist-matriculation/${licensePlate}`
    );
    return data;
  },
/**
 * Méthode qui permet de supprimer une voiture de la bdd
 * @param {*} licensePlate la plaque d'immatriculation de la voiture à supprimer
 * @returns 
 */
  deleteCar: async (licensePlate) => {
    const { data } = await apiBackEnd.delete(`car/delete/${licensePlate}`);
    return data;
  },
/**
 * Méthode qui permet de mettre à jour les information d'un véhicule
 * @param {*} licensePlate la plaque d'immatriculation de la voiture à updater
 * @param {*} carDto information du véhicule
 * @returns 
 */
  updateCar: async (licensePlate, carDto) => {
    const { data } = await apiBackEnd.put(
      `/car/update/${licensePlate}`,
      carDto
    );
    return data;
  },
/**
 * Méthode permettant de récupérer toutes les voitures d'un utilisateur
 * @param {*} email 
 * @returns 
 */
  allCarsByUserEmail: async (email) => {
    const { data } = await apiBackEnd.get(`/car/car-user-mail/${email}`);
    return data;
  },
  /**
   * méthode permettant de récupérer toutes les marques de voiture depuis la bdd
   * @param {} search paramètre de recherche optionnel
   * @returns liste de marques de voiture
   */
  getAllBrandsWithSearch: async (search = "") => {
    try {
      const data = await apiBackEnd.get("/brand/search", {
        params: { search: search },
      });
      if (data.status === 200) {
        return data.data;
      }
      throw new Error("Request failed");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * méthode permettant la liste de couleur de voiture depuis la bdd
   * @returns la liste des couleurs de voiture
   */
  getAllColors: async () => {
    try {
      const data = await apiBackEnd.get("/color/allColors");
      if (data.status === 200) {
        return data.data;
      }
      throw new Error("Request failed");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * méthode permettant de récupérer tous les modèles de voiture en fonction d'une marque depuis la bdd
   * @param {} search paramètre de recherche optionnel
   * @returns liste de modèles de voiture
   */
  getAllModelsWithBrandAndSearch: async (brandName, search = "") => {
    try {
      const data = await apiBackEnd.get("/model/search-brand", {
        params: { brandName: brandName, search: search },
      });
      if (data.status === 200) {
        return data.data;
      }
      throw new Error("Request failed");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addCarPicture: async (carId,formData) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    console.log("carId",carId)
    console.log("formData",formData)
    const { data } = await apiBackEnd.post(`/car/addImage/${carId}`, formData, config);
    return data;
  },
  deleteCarPicture: async (pictureId) => {
    console.log("pictureId",pictureId)
    const { data } = await apiBackEnd.delete(`/car/deleteImage/${pictureId}`);
    return data;
  },
};

export default carService;
