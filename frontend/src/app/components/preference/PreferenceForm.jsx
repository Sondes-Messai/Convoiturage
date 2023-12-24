import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CameraIcon } from "../../assets/icons/CameraIcon";
import { DownloadIcon } from "../../assets/icons/DownLoadIcon";
import GreenButton from "../../components/utils/button/GreenButton";
import Input from "../../components/utils/input/Input";
import TextError from "../../components/error/TextError";
import preferencesService from "../../services/preferencesService";
import { preferenceValidationSchema } from "../../services/validationSchemaService";

const PreferenceForm = ({ loadPreferences }) => {
  //initialisation des constantes
  const [error, setError] = useState(false);
  const [defaultPicture, setDefaultPicture] = useState(null);
  const fileInput = useRef(null);
  const MAX_IMAGE_SIZE_MB = 2; // La taille maximale autorisée en mégaoctets (2 Mo)

  /**
   * méthode gérant le changement de l'image
   * @param {*} e
   */
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
        // Vérifiez si la taille du fichier est supérieure à 2 Mo
        alert(
          "L'image sélectionnée dépasse la taille maximale autorisée (2 Mo)."
        );
        // Réinitialisez l'entrée de fichier
        e.target.value = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setDefaultPicture(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  /**
   * méthode permettant d'ajouter une nouvelle préférence
   * @param {*} formData formulaire contenant l'image et le label
   * @param {*} setSubmitting
   */
  async function addPreference(formData, setSubmitting) {
    try {
      await preferencesService.addNeWPreference(formData);
      console.log("ajout de la nouvelle préférence" + formData.get("label"));
      setSubmitting(false);
      setDefaultPicture(null);
    } catch (error) {
      console.log("Erreur lors de l'ajout de la préférence :", error);
    } finally {
      loadPreferences();
    }
  }

  /**
   * méthode de soumission du formulaire
   * @param {*} values valeurs du formulaire formik,
   * avec le label en lowercase pour ignorer l'influence de case sur la valeur
   * @param {*} param1 les méthode de soumission et de reset des valeurs du formulaire
   */
  const handlePreference = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("label", values.label.toLowerCase());
      formData.append("file", values.file);
      addPreference(formData, setSubmitting);
      resetForm();
    } catch (error) {
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        label: "",
        file: null,
      }}
      validationSchema={preferenceValidationSchema}
      enableReinitialize={true}
      onSubmit={handlePreference}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="w-7/12 max-md:w-11/12 mx-auto rounded-lg border-gray-200">
            <h5 className="text-left my-4 text-[20px] font-bold title-pref">
              Ajouter une préférence
            </h5>
            <div className="shadow-lg rounded-2xl flex flex-col border border-grey-light items-center mb-24">
              <div className="w-7/12 max-md:w-11/12">
                <div className="flex my-6 ">
                  <div className="rounded-full bg-grey-afpa-mid w-20 h-20 flex justify-center items-center">
                    {!defaultPicture ? (
                      <CameraIcon className="" width="30px" height="30px" />
                    ) : (
                      <img
                        className="rounded-full w-20 h-20 flex justify-center items-center"
                        src={defaultPicture}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    name="file"
                    id="file"
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files[0];
                      if (selectedFile) {
                        setFieldValue("file", selectedFile);
                      }
                      handleImageChange(event);
                    }}
                    style={{ display: "none" }}
                    ref={fileInput}
                  />
                  <button
                    type="button"
                    className="btn-grey-light rounded-full w-4/5 self-center ml-6 pt-2 group "
                    onClick={() => fileInput.current.click()}
                  >
                    <DownloadIcon
                      width="33px"
                      height="33px"
                      className="relative top-1  group-hover:text-rose-afpa "
                    />
                    <p className="group-hover:text-rose-afpa">
                      Ajouter une icône
                    </p>
                  </button>
                  <ErrorMessage name="file" component={TextError} />
                </div>

                <Field
                  id="label"
                  type="text"
                  name="label"
                  className="bg-grey-afpa-light mb-4"
                  placeholder="Nom de la préférence*"
                  component={Input}
                />
                <div className="flex justify-center">
                  <GreenButton
                    type="submit"
                    id="preferences_save-admin"
                    cas="with-m-y"
                  >
                    Enregistrer
                  </GreenButton>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PreferenceForm;
