import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import userService from "../../../services/userService";
import { getPayloadToken, getToken } from "../../../services/tokenServices";
import preferencesService from "../../../services/preferencesService";
import { PREFERENCE_SCHEMA } from "../../../services/validationSchemaService";
import PreferenceRadioComponent from "../PreferenceRadioComponent";

function PreferenceContent({ profil }) {
  const [userPreferences, setUserPreferences] = useState([]);
  const [adminPreferences, setAdminPreferences] = useState([]);

  useEffect(() => {
    const token = getPayloadToken(getToken());

    // Récupérer les préférences de l'admin
    preferencesService.getAll()
      .then((adminPrefs) => setAdminPreferences(adminPrefs))
      .catch((error) => console.error("Erreur lors de la récupération des préférences admin:", error));

    // Récupérer les préférences de l'utilisateur
    userService.getUserPreferences(token.sub)
      .then((userPrefs) => setUserPreferences(userPrefs))
      .catch((error) => console.error("Erreur lors de la récupération des préférences utilisateur:", error));
  }, []);

  const isFound = (string) => userPreferences.find((el) => el.label === string);

  const validationSchema = PREFERENCE_SCHEMA;

  return (
    <div>
      <div className="flex flex-col p-12">
        <Formik
          initialValues={{
            // Initialisez les valeurs avec les préférences de l'utilisateur
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            let array = [];
            Object.keys(values).forEach((key) => {
              if (values[key] === "true") {
                let preference = { label: key };
                array.push(preference);
              }
            });

            // Mettre à jour les préférences utilisateur
            userService
              .updateUserPreferences(profil.mail, array)
              .then((res) => console.log("Préférences utilisateur mises à jour"))
              .catch((err) => console.log(err));
          }}
        >
          <Form>
            <div className="w-full mt-6 mb-20">
              {adminPreferences.map((preference) => (
                <PreferenceRadioComponent key={preference.label} name={preference.label} pictureUrl={preference.pictureUrl} />
              ))}
            </div>
            <div className="flex justify-center items-center mt-8">
              <button
                type="submit"
                className="bg-green-afpa hover:bg-green-afpa-alert hover:shadow-lg transition duration-500 text-white font-jakartaSans w-full h-11 rounded-3xl"
              >
                Enregistrer
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default PreferenceContent;
