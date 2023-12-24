import React, { useState } from "react";
import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";

import img from "../assets/img/dl.svg";
import FileUploadComponent from "../components/utils/FileUploadComponent";
import Input from "../components/utils/input/Input";
import TextError from "../components/error/TextError";

import { CONTACT_SCHEMA } from "../services/validationSchemaService";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import GreenButton from "../components/utils/button/GreenButton";

/**
 * Component Contactez-nous
 *
 * @author Hélène Dubourg
 */

const ContactezNousView = () => {
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  //liste déroulante des aides - à basculer éventuellement dans le back
  const helps = [
    { id: 0, name: "Comment pouvons-nous vous aider ?*" },
    { id: 1, name: "Réserver un trajet" },
    { id: 2, name: "Publier un trajet" },
    { id: 3, name: "Problème de connexion" },
    { id: 4, name: "Autre" },
  ];

  //file input
  const [isFocus, setFocus] = useState(false);
  const uploadFile = (
    <div className="flex flex-row">
      <img src={img} width={20} height={20} />
      <span className="ml-8">Ajouter un fichier</span>
    </div>
  );

  //url vers le back
  const apiUrl = "http://localhost:8080/api/v1/contact_us";

  /**
   * envoie de la requète vers le back
   * @param {*} values liste des valeurs récupérées de Formik
   * @param {*} param1 boolean de soumission
   */
  const handleContact = async (values, { setSubmitting }) => {
    try {
      //création d'un formData pour le cas de l'envoie d'un fichier
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("firstName", values.firstName);
      formData.append("help", values.help);
      formData.append("about", values.about);
      formData.append("file", values.file);

      //création d'un formulaire uniquement pour l'envoie des données
      const formulaire = {
        email: values.email,
        name: values.name,
        firstName: values.firstName,
        help: values.help,
        about: values.about,
      };

      console.log("formData", formData)
      console.log("formulaire", formulaire)
      //choix de la méthode d'envoie dans le back en fonction de la présence d'un fichier
      if (values.file !== null) {
        console.log("fichier");

        await axios.post(`${apiUrl}/file`, formData, config).then((res) => {
          alert(
            `Merci ${values.firstName} ${values.name} pour votre demande. Nous la traitons au plus vite.`
          );
          setSubmitting(false);
        });
      } else {
        await axios.post(`${apiUrl}`, formulaire).then((res) => {
          console.log("sans fichier");
          alert(
            `Merci ${values.firstName} ${values.name} pour votre demande. Nous la traitons au plus vite.`
          );
          setSubmitting(false);
        });
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setSubmitting(false);
    } finally {
      navigate(URL_HOME);
    }
  };

  /**
   * balise textarea
   */
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTextareaSize = () => {
    setIsExpanded(!isExpanded);
  };

  /**
   * Début du composant
   */
  return (
    <>
      <div className="gradient h-5 w-full flex justify-center items-center"></div>

      <div className="mt-8 mx-20 lg:mx-80">
        <h3 className="text-center">
          <strong>Contactez-nous</strong>
        </h3>
        <p className="text-right my-3">*Champs obligatoires</p>

        <Formik
          initialValues={{
            email: "",
            name: "",
            firstName: "",
            about: "",
            help:"",
            file: null,
          }}
          validationSchema={CONTACT_SCHEMA}
          onSubmit={handleContact}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col">
              <div className="input-icon">
                <Field
                  id="mail"
                  type="email"
                  name="email"
                  className="bg-grey-afpa-light mb-4"
                  placeholder="Identifiant ou e-mail*"
                  component={Input}
                />
              </div>

              <div className="input-icon">
                <Field
                  id="name"
                  type="text"
                  name="name"
                  className="bg-grey-afpa-light mb-4"
                  placeholder="Nom d'usage*"
                  component={Input}
                />
              </div>

              <div className="input-icon mb-4">
                <Field
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="bg-grey-afpa-light mb-4"
                  placeholder="Prénom*"
                  component={Input}
                />
              </div>

              <div className="input-icon mb-4">
                <Field
                  as="select"
                  id="help"
                  name="help"
                  className="bg-grey-afpa-light mb-4 px-14 w-full"
                >
                  {helps.map((help) => {
                    return (
                      <option key={help.id} value={help.name}>
                        {help.name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="help" component={TextError} />
              </div>

              <div className="input-icon mb-4">
                <Field
                  as="textarea"
                  spellCheck="true"
                  name="about"
                  placeholder="Description*"
                  className={`flex items-center pl-14 py-1 border border-grey-afpa-light w-full mt-2 text-left
      ${isExpanded ? "expanded " : ""}`}
                  style={{
                    borderRadius: "45px 45px",
                    overflow: "auto",
                    backgroundColor: "white",
                    paddingLeft: "14px",
                    resize: "none",
                  }}
                  maxLength={255}
                  onClick={toggleTextareaSize}
                ></Field>
              </div>

              <div className="mb-4">
                <div
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  className="h-11 w-full py-2 pl-5 bg-grey-afpa-light rounded-3xl flex justify-center box-border focus-within:border-green-afpa focus-within:border-2"
                >
                  <FileUploadComponent
                    setFile={(uploadedFile) => {
                      setFile(uploadedFile);
                      setFieldValue("file", uploadedFile);
                    }}
                  >
                    {uploadFile}
                  </FileUploadComponent>
                </div>
              </div>

              <div className="mt-6">
                <GreenButton
                  type="submit"
                  disabled={isSubmitting}
                  cas="isCO"
                  id="contact_soumettre"
                >
                  Soumettre
                </GreenButton>
                {error && (
                  <div className="text-red-600 text-center mt-6">
                    Remplir les champs obligatoires
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ContactezNousView;
