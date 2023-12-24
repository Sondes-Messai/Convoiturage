import carService from '../../services/CarService';
import publicService from '../../services/publicService';

export default async function CheckEmail(value) {
  try {
    const response = await publicService.emailExiste(value);
    return !response; // La validation passe si l'email n'existe pas
  } catch (error) {
    console.error(error);
    return false; // La validation échoue en cas d'erreur lors de la requête
  }
}

export async function CheckLabel(value) {
  try {
    const response = await publicService.labelExiste(value);
    return !response; // La validation passe si l'email n'existe pas
  } catch (error) {
    console.error(error);
    return false; // La validation échoue en cas d'erreur lors de la requête
  }
}

export async function checkMatriculation(value) {
    try {
      const response = await carService.existByMatriculation(value);
      return !response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }