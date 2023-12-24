import * as Yup from "yup";
import CheckEmail, {
  CheckLabel,
  checkMatriculation,
} from "../components/utils/CheckFunction";

export const FIRST_NAME = Yup.string()
  .required("Champ obligatoire.")
  .min(2, "Le prénom doit comporter au moins 2 caractères.")
  .max(50, "Le prénom doit 50 caractères maximum.")
  .matches(
    /^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$/,
    "Les caractères spéciaux et les chiffres ne sont pas autorisés."
  );

export const LAST_NAME = Yup.string()
  .required("Champ obligatoire.")
  .min(2, "Le prénom doit comporter au moins 2 caractères.")
  .max(50, "Le prénom doit 50 caractères maximum.")
  .matches(
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
    "Les caractères spéciaux et les chiffres ne sont pas autorisés."
  );

export const PHONE = Yup.string()
  .required("Champ obligatoire.")
  .test("isValidFormat", "Ce numéro de téléphone n'est pas valide", (value) => {
    // Étape 1 : Vérification du format
    const validCharacters = /^[0-9+]+$/;
    return validCharacters.test(value);
  })
  .min(10, "Le numéro doit comporter dix chiffres minimums")
  .matches(
    /^(?:(?:\+33|0033)?[67]\d{8}|0[67]\d{8})$/,
    "Veuillez saisir un numéro de téléphone mobile valide au format international ou national. Exemple : +33620102040 ou 0620102040 ou 0780907050"
  );

export const EMAIL = Yup.string()
  .required("Champ obligatoire.")
  .email("Veuillez fournir un mail valide.")
  .test("email-exists", "Cet email n'est pas valide", (value) => {
    if (!value) return true; // La validation passe si aucun email n'est renseigné
    return CheckEmail(value);
  });

export const PASSWORD_SCHEMA = Yup.string()
  .required("Champ obligatoire")
  .min(8, "Le mot de passe doit comporter au moins 8 caractères")
  .max(254, "Le mot de passe ne doit pas depasser les 254 caractéres")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
  );

export const NEW_PASSWORD_SCHEMA = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Champ obligatoire")
    .min(8, "Le mot de passe doit comporter au moins 8 caractères")
    .max(254, "Le mot de passe ne doit pas dépasser les 254 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
  newPassword: Yup.string()
    .required("Champ obligatoire")
    .min(8, "Le mot de passe doit comporter au moins 8 caractères")
    .max(254, "Le mot de passe ne doit pas dépasser les 254 caractères")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "Le nouveau mot de passe ne doit pas être identique à l'ancien mot de passe"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "La confirmation du mot de passe ne correspond pas au mot de passe saisi. Veuillez vérifier et réessayer."
    )
    .required("Champ obligatoire"),
});

export const ACCEPTED_PASSWORD_SCHEMA = Yup.object().shape({
  mail: EMAIL,
  password: PASSWORD_SCHEMA,
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "La confirmation du mot de passe ne correspond pas au mot de passe saisi. Veuillez vérifier et réessayer."
    )
    .required("Champ obligatoire"),
  isAccepted: Yup.string().required(
    "Vous devez accepter les conditions générales"
  ),
});

export const CONTACT_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Veuillez fournir un mail valide.")
    .required("L'adresse e-mail est requise"),
  name: Yup.string().required("Le nom est requis"),
  firstName: Yup.string().required("Le prénom est requis"),
  help: Yup.string().required("Le type d'aide est requis"),
  about: Yup.string().required("La description est requise"),
});

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().required("L'adresse e-mail est requise"),
  password: Yup.string().required("Le mot de passe est requis"),
});

export const PREFERENCE = Yup.boolean().required(
  "Veuillez sélectionner une option"
);

export const ADD_PREFERENCE = Yup.object().shape({
  addPreferences: Yup.boolean().required("Veuillez sélectionner une option"),
});

export const PREFERENCE_SCHEMA = Yup.object().shape({
  blabla: PREFERENCE,
  mask: PREFERENCE,
  music: PREFERENCE,
  smoker: PREFERENCE,
});

export const NAME_PHONE_MAIL_SCHEMA = Yup.object().shape({
  first_name: FIRST_NAME,
  last_name: LAST_NAME,
  phone: PHONE,
  mail: EMAIL,
});

export const NAME_PHONE_SCHEMA = Yup.object().shape({
  firstName: FIRST_NAME,
  lastName: LAST_NAME,
  phone: PHONE,
});

export const userProfilUpdateSchema = (profil) => {
  return Yup.object({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    phone: Yup.string()
      .required("Champ obligatoire.")
      .test(
        "isValidFormat",
        "Ce numéro de téléphone n'est pas valide",
        (value) => {
          // Étape 1 : Vérification du format
          const validCharacters = /^[0-9+]+$/;
          return validCharacters.test(value);
        }
      )
      .min(10, "Le numéro doit comporter dix chiffres minimums")
      .matches(
        /^(?:(?:\+33|0033)?[67]\d{8}|0[67]\d{8})$/,
        "Veuillez saisir un numéro de téléphone mobile valide au format international ou national. Exemple : +33620102040 ou 0620102040 ou 0780907050"
      ),
    mail: Yup.string()
      .required("Champ obligatoire.")
      .email("Veuillez fournir un mail valide.")
      .test("email-exists", "Cet email n'est pas valide", (value) => {
        if (value === profil.mail) {
          // L'e-mail est le même que celui stocké dans profil, donc la validation réussit
          return true;
        } else {
          // L'e-mail est différent, vous pouvez effectuer la validation ici
          if (!value) {
            // La validation passe si aucun e-mail n'est renseigné
            return true;
          }
          // Effectuez la validation personnalisée, par exemple, vérifiez si l'e-mail existe déjà
          const emailExists = CheckEmail(value); // Supposons que CheckEmail soit une fonction
          return emailExists;
        }
      }),
    matricule: Yup.string().required("Le matricule est requis"),
    workSite: Yup.string().required("Champ obligatoire"),
  });
};

/*schema validation qui permet d'exclure de la vérification du checkEmail 
si l'email attribué est déjà celle de l'utilisateur*/
export const createValidationSchema = (userInfos) => {
  return Yup.object().shape({
    firstName: FIRST_NAME,
    lastName: LAST_NAME,
    phone: PHONE,
    mail: Yup.string()
      .required("Champ obligatoire.")
      .email("Veuillez fournir un mail valide.")
      .test("email-exists", "Cet email n'est pas valide", (value) => {
        if (value === userInfos.mail) {
          // L'e-mail est le même que celui stocké dans userInfos, donc la validation réussit
          return true;
        } else {
          // L'e-mail est différent, vous pouvez effectuer la validation ici
          if (!value) {
            // La validation passe si aucun e-mail n'est renseigné
            return true;
          }
          // Effectuez la validation personnalisée, par exemple, vérifiez si l'e-mail existe déjà
          const emailExists = CheckEmail(value); // Supposons que CheckEmail soit une fonction
          return emailExists;
        }
      }),
    workSite: Yup.string().required("Champ obligatoire"),
    newPassword: Yup.string()
      .min(8, "Le mot de passe doit comporter au moins 8 caractères")
      .max(254, "Le mot de passe ne doit pas depasser les 254 caractéres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .oneOf(
        [Yup.ref("confirmPassword")],
        "Les mots de passe doivent correspondre"
      ),
    /*vérification de confirmPassword que si une saisie a été faite pour newPassword*/
    confirmPassword: Yup.string().when("newPassword", {
      is: (val) => val && val.length > 0,
      then: Yup.string()
        .required("La confirmation du mot de passe est requise")
        .oneOf(
          [Yup.ref("newPassword")],
          "Les mots de passe doivent correspondre"
        ),
    }),
  });
};

export const preferenceValidationSchema = Yup.object().shape({
  label: Yup.string()
    .required("Le nom de la préférence est requis")
    .test("label-exists", "Ce label est déjà pris", (value) => {
      if (!value) return true; // La validation passe si aucun email n'est renseigné
      return CheckLabel(value.toLowerCase());
    }),
  file: Yup.mixed()
    .required("L'image est requise")
    .test(
      "fileSize",
      "L'image dépasse la taille maximale autorisée (2 Mo)",
      (value) => {
        if (!value) return true;
        return value && value.size / 1024 / 1024 <= 2;
      }
    )
    .test(
      "fileType",
      "L'image doit être au format JPG, PNG ou GIF",
      (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }
    ),
});

export const NAME_PHONE_MAIL_MATRICULE_WORKSITE_SCHEMA = Yup.object().shape({
  mail: EMAIL,
  firstName: Yup.string()
    .required("Champ obligatoire")
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s-]+$/,
      "Le nom ne doit contenir que des lettres"
    ),
  lastName: Yup.string()
    .required("Champ obligatoire")
    .min(2, "Le prénom doit comporter au moins 2 caractères")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s-]+$/,
      "Le prénom ne doit contenir que des lettres"
    ),
  phone: Yup.string()
    .required("Champ obligatoire")
    .matches(
      /^(?:(?:\+33|0)[1-9](?:[\s.-]?[0-9]{2}){4})$/,
      "Le numéro de téléphone portable doit commencer par zéro et comporter 10 chiffres"
    ),
  matricule: Yup.string().required("Champ obligatoire"),
  workSite: Yup.string().required("Champ obligatoire"),
});

export const NAME_PHONE_MAIL_MATRICULE_WORKSITE_PICTURE_SCHEMA =
  Yup.object().shape({
    firstName: Yup.string()
      .required("Champ obligatoire")
      .min(2, "Le nom doit comporter au moins 2 caractères")
      .matches(
        /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s-]+$/,
        "Le nom ne doit contenir que des lettres"
      ),
    lastName: Yup.string()
      .required("Champ obligatoire")
      .min(2, "Le prénom doit comporter au moins 2 caractères")
      .matches(
        /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s-]+$/,
        "Le prénom ne doit contenir que des lettres"
      ),
    phone: Yup.string()
      .required("Champ obligatoire")
      .matches(
        /^(?:(?:\+33|0)[1-9](?:[\s.-]?[0-9]{2}){4})$/,
        "Le numéro de téléphone portable doit commencer par zéro et comporter 10 chiffres"
      ),
    matricule: Yup.string().required("Champ obligatoire"),
    workSite: Yup.string().required("Champ obligatoire"),
    picture: Yup.mixed()
      .test("fileFormat", "Le format de l'image n'est pas valide", (value) => {
        if (value) {
          const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
          return supportedFormats.includes(value.type);
        }
        return true;
      })
      .test(
        "fileSize",
        "La taille de l'image ne doit pas dépasser 2 Mo",
        (value) => {
          if (value) {
            const maxSize = 2 * 1024 * 1024; // 2 Mo
            return value.size <= maxSize;
          }
          return true;
        }
      ),
  });

export const NEW_VEHICULE_SCHEMA = Yup.object().shape({
  brandName: Yup.string().required(
    "Veuillez sélectionner une marque de véhicule"
  ),
  modelName: Yup.string().required(
    "Veuillez sélectionner un modèle de véhicule"
  ),
  color: Yup.string().required("Veuillez sélectionner une couleur de véhicule"),
  matriculation: Yup.string()
    .required("Veuillez entrer la plaque d'immatriculation du véhicule")
    .matches(
      /^[A-Z]{2}-\d{3}-[A-Z]{2}$/,
      "Format de plaque d'immatriculation invalide. Le format attendu est AB-123-CD"
    )
    .test(
      "matriculation-unique",
      "La plaque d'immatriculation existe deja",
      async function (value) {
        const isUnique = await checkMatriculation(value);
        return isUnique;
      }
    ),
  seats: Yup.number() // Valider que c'est un nombre
    .required("Veuillez entrer le nombre de places")
    .positive("Le nombre de places doit être supérieur à 0")
    .integer("Le nombre de places doit être un nombre entier")
    .min(2, "Le nombre de places doit être supérieur ou égal à 2"),
});

export const updateCar = (car) => {
  return Yup.object().shape({
    brandName: Yup.string().required(
      "Veuillez sélectionner une marque de véhicule"
    ),
    modelName: Yup.string().required(
      "Veuillez sélectionner un modèle de véhicule"
    ),
    color: Yup.string().required(
      "Veuillez sélectionner une couleur de véhicule"
    ),
    matriculation: Yup.string()
      .required("Veuillez entrer la plaque d'immatriculation du véhicule")
      .matches(
        /^[A-Z]{2}-\d{3}-[A-Z]{2}$/,
        "Format de plaque d'immatriculation invalide. Le format attendu est AB-123-CD"
      )
      .test(
        "matriculation-unique",
        "La plaque d'immatriculation existe deja",
        (value) => {
          if (value === car.licensePlate) {
            return true;
          } else {
            if (!value) {
              return true;
            }
            const isUnique = checkMatriculation(value);
            return isUnique;
          }
        }
      ),
    seats: Yup.number() // Valider que c'est un nombre
      .required("Veuillez entrer le nombre de places")
      .positive("Le nombre de places doit être supérieur à 0")
      .integer("Le nombre de places doit être un nombre entier")
      .min(2, "Le nombre de places doit être supérieur ou égal à 2"),
  });
};

export const ADD_VEHICULE_SCHEMA = Yup.object().shape({
  addVehicle: Yup.boolean().required("Veuillez sélectionner une option"),
  brandName: Yup.string().when("addVehicle", {
    is: true,
    then: Yup.string().required("Veuillez sélectionner une marque de véhicule"),
  }),
  modelName: Yup.string().when("addVehicle", {
    is: true,
    then: Yup.string().required("Veuillez sélectionner un modèle de véhicule"),
  }),
  color: Yup.string().when("addVehicle", {
    is: true,
    then: Yup.string().required(
      "Veuillez sélectionner une couleur de véhicule"
    ),
  }),
  matriculation: Yup.string().when("addVehicle", {
    is: true,
    then: Yup.string()
      .required("Veuillez entrer la plaque d'immatriculation du véhicule")
      .matches(
        /^[A-Z]{2}-\d{3}-[A-Z]{2}$/,
        "Format de plaque d'immatriculation invalide. Le format attendu est AB-123-CD"
      ),
  }),
});

export const SITE_ADRESS_TOWN_REGION_ZIPCODE_COUNTRY = Yup.object().shape({
  name: Yup.string()
    .required("Champ obligatoire")
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s-]+$/,
      "Le nom ne doit contenir que des lettres"
    ),
  adress: Yup.string()
    .required("Champ obligatoire")
    .min(2, "L'adresse doit comporter au moins 5 caractères")
    .matches(/^(?=.*[a-zA-ZÀ-ÿ])/, "L'adresse doit contenir des lettres")
    .matches(/^(?=.*[0-9])/, "L'adresse doit contenir des chiffres"),

  town: Yup.string().required("Champ obligatoire"),
  region: Yup.string().required("Champ obligatoire"),

  zipCode: Yup.string()
    .required("Champ obligatoire")
    .matches(/^[0-9]+$/, "Le code postal de doit comporter ques chiffres")
    .min(5, "Le code postal doit contenir 5 chiffres")
    .max(5, "Le code postal doit contenir 5 chiffres"),
  country: Yup.string().required("Champ obligatoire"),
});
