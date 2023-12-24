import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import photoSvg from "../../assets/img/photo.svg";
import dlSvg from "../../assets/img/dl.svg";
import GreenButton from "../../components/utils/button/GreenButton";
import WhiteWithGreenBorderButton from "./../../components/utils/button/WhiteWithGreenBorderButton";
import { NAME_PHONE_MAIL_MATRICULE_WORKSITE_PICTURE_SCHEMA } from "../../services/validationSchemaService";
import siteService from "../../services/siteService";
import DropDownInputFieldSearch from "../../components/form/DropDownInputFieldSearch";


const validationSchema = NAME_PHONE_MAIL_MATRICULE_WORKSITE_PICTURE_SCHEMA

const SignupPage2 = ({ onNext, onBack, user }) => {
  const [picture, setpicture] = useState(null);
  const inputRef = useRef(null);
  const [sites, setSite] = useState([])

  useEffect(() => {
    (async function getSiteAfpa() {
      const data = await siteService.getAll();
      const sitesVisibled = data.filter(item => item.visibility === true)
      setSite(sitesVisibled);

    })();
  }, []);

  const handlepictureChange = (e) => {
    const file = e.target.files[0];

    // Vérification du format de l'image
    const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
    if (file && !supportedFormats.includes(file.type)) {
      // Format de l'image non valide
      console.log("Le format de l'image n'est pas valide");
      return;
    }

    // Vérification de la taille de l'image
    const maxSize = 2 * 1024 * 1024; // 2 Mo
    if (file && file.size > maxSize) {
      // Taille de l'image dépassée
      console.log("La taille de l'image ne doit pas dépasser 2 Mo");
      return;
    }
    setpicture(file);
  };

  const clickInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleBack = () => {
    onBack();
  };

  
  const handleDropDownInput = (value) => {
    formik.values.workSite = value
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      matricule: user.matricule || "",
      workSite: user.workSite || "",
      picture: null,
    },
    validationSchema,
    onSubmit: (values) => {
      values.phone = values.phone.replace(/[ .-]/g, "");
      onNext(values);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 w-full justify-center flex flex-col items-center">
        <h1 className="text-2xl font-bold my-2">Créez un compte</h1>
        <div className="flex-grid w-4/12">
          <p className="justify-self-end text-sm text-gray-600 mb-4 font-sans font-medium">
            *Champs obligatoires
          </p>
        </div>
      </div>
      <div className="w-5/12 flex flex-col items-center content">
        <div className="mb-4 flex namefield">
          <div className="namefieldInput w-1/2">
            <input
              type="text"
              id="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="signupInput w-11/12 mr-4 border-gray-300 px-3 py-2 placeholder-gray-400 outline-none border-none"
              placeholder="Prénom*"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="error">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="namefieldInput w-1/2 flex-end">
            <input
              type="text"
              id="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="signupInput flex-end w-11/12 border-gray-300 px-3 py-2 placeholder-gray-400 outline-none border-none"
              placeholder="Nom*"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="error">{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="signupInput w-full border-gray-300 px-3 py-2 placeholder-gray-400 outline-none border-none"
            placeholder="Numéro de téléphone portable*"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="error">{formik.errors.phone}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="matricule"
            value={formik.values.matricule}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="signupInput w-full border-gray-300 px-3 py-2 placeholder-gray-400 outline-none border-none"
            placeholder="Matricule AFPA*"
          />
          {formik.touched.matricule && formik.errors.matricule && (
            <div className="error">{formik.errors.matricule}</div>
          )}
        </div>
        <div className="mb-4">
        <DropDownInputFieldSearch placeholder={"Site de travail régulier"} data={sites} passInput={handleDropDownInput} />
            {formik.touched.workSite && formik.errors.workSite && (
              <div className="error">{formik.errors.workSite}</div>
            )}
        </div>
        <div className="mb-4 flex items-center imgcontainer">
          <div className="rounded-full imagepreview" onClick={clickInput}>
            <img id="preview" src={photoSvg} alt="logo"></img>
            {picture && (
              <div
                className="rounded-full overflow-hidden ml-2"
                id="profilPhoto"
              >
                <img
                  className="rounded-full"
                  src={URL.createObjectURL(picture)}
                  alt="image de profile"
                ></img>
              </div>
            )}
          </div>
          <div
            id="imageDl"
            onClick={clickInput}
            className="signupInput clickable w-full px-3 py-2 placeholder-gray-400 outline-none border-none ml-2"
          >
            <label htmlFor="image" id="imageLabel">
              <img id="dlIcon" src={dlSvg} alt="download icon"></img>
              Ajoutez une photo de profil
            </label>
            <input
              ref={inputRef}
              type="file"
              className="signupInputImage w-full"
              onChange={(e) => {
                formik.setFieldValue("picture", e.currentTarget.files[0]);
                handlepictureChange(e);
              }}
              accept="image/*"
              readOnly
            />
          </div>
          {formik.touched.picture && formik.errors.picture && (
            <div className="error">{formik.errors.picture}</div>
          )}
        </div>
      </div>
      <div className="bottomChoix">
        <GreenButton
          type="submit"
          onClick={formik.handleSubmit}
          id="bouton_suivant_signup2"
        >
          Suivant
        </GreenButton>
        <WhiteWithGreenBorderButton
          onClick={handleBack}
          id="bouton_retour_signup2"
          type="button"
        >
          <span>Retour</span>
        </WhiteWithGreenBorderButton>
      </div>
    </div>
  );
};

export default SignupPage2;
