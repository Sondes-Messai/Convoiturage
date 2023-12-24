import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import noeye from "../../assets/img/noeye.svg";
import eye from "../../assets/img/eye.svg";
import { ACCEPTED_PASSWORD_SCHEMA } from "../../services/validationSchemaService";
import GreenButton from "../../components/utils/button/GreenButton";

const validationSchema = ACCEPTED_PASSWORD_SCHEMA;

const SignupPage1 = ({ onNext, user }) => {
  const [showPassword, setShowPassword] = useState(true);
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      mail: user.mail || "",
      password: user.password || "",
      confirmPassword: user.password || "",
      isAccepted: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onNext(values);
    },
  });

  function setVisibilityPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="mb-4 w-full justify-center flex flex-col items-center"
      >
        <h1 className="text-2xl font-bold mb-2">Créez un compte</h1>
        <div className="flex-grid w-5/12">
          <p className="justify-self-end text-sm text-gray-600 mb-4 font-sans font-medium">
            *Champs obligatoires
          </p>
        </div>
      </div>
      <div className="w-5/12 flex flex-col items-center content">
        <div className="">
          <input
            type="mail"
            id="mail"
            className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
            value={formik.values.mail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Identifiant*"
          />
          {formik.touched.mail && formik.errors.mail && (
            <div className="error">{formik.errors.mail}</div>
          )}
        </div>
        <div className="mt-4 relative flex flex-col justify-center">
          <input
            type={showPassword ? "password" : "text"}
            id="password"
            className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Mot de passe*"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
        <div className="mt-4 relative flex flex-col justify-center">
          <input
            type={showPassword ? "password" : "text"}
            id="confirmPassword"
            className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirmer le mot de passe*"
          />
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="error">{formik.errors.confirmPassword}</div>
        )}
        <div className="my-4 w-5/12 flex items-center radioBottom">
          <div id="radiobutton">
            <div>
              <input
                type="radio"
                id="isAccepted"
                className="mr-2"
                value="true"
                checked={formik.values.isAccepted === "true"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="isAccepted" className="text-sm text-gray-600">
                <span>J'ai lu et j'accepte&nbsp;</span>
                <mark>
                  <Link to="/cgu" id="cgulink">
                    Conditions Générales d’Utilisation
                  </Link>
                </mark>
                <span>
                  &nbsp; et de non-responsabilité de l’Afpa sur l’usage de la
                  plateforme.
                </span>
              </label>
            </div>
          </div>
          {formik.touched.isAccepted && formik.errors.isAccepted && (
            <div className="error">{formik.errors.isAccepted}</div>
          )}
        </div>
      </div>
      <GreenButton
        type="submit"
        onClick={formik.handleSubmit}
        id="bouton_suivant_signup1"
      >
        Suivant
      </GreenButton>
      <div id="dejainscrit" className="w-6/12">
        <p> Déjà inscrit(e) ?</p>
        <Link id="connexionLink" to="/login">
          &nbsp; Connexion
        </Link>
      </div>
    </div>
  );
};

export default SignupPage1;
