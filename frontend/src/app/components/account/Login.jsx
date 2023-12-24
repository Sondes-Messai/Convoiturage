import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import profil from "../../assets/img/ic-profil.svg";
import lock from "../../assets/img/mdp.svg";
import noeye from "../../assets/img/noeye.svg";
import eye from "../../assets/img/eye.svg";
import { signIn } from "../../redux-store/authenticationSlice";
import Input from "../utils/input/Input";
import InputPwd from "../utils/input/InputPwd";
import { LOGIN_SCHEMA } from "../../services/validationSchemaService";
import authService from "../../services/authService";
import GreenButton from "../utils/button/GreenButton";

/**
 * Component Login
 *
 * @author Chadjou Daffe
 */
const Login = () => {
  //initialisation des variables
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * méthode qui se lance à la soumission du formulaire
   * @param {*} values valeurs du formulaire
   */
  const handleLogin = async (values) => {
    try {
      const response = await authService.authenticate({
        email: values.email,
        password: values.password,
      });
      const token = response.token;

      dispatch(signIn(token));
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  /**
   * méthode permettant de valider les input du forulaire en appuyant sur la touche entrée
   * @param {*} event
   * @param {*} values
   */
  const handleKeyPress = (event, values) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin(values);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={handleLogin}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="flex flex-col space-y-5">
          <div className="input-icon">
            <img src={profil} alt="" className="input-icon-img" />
            <Field
              id="mail"
              type="mail"
              name="email"
              className="bg-grey-afpa-light"
              placeholder="Identifiant"
              component={Input}
              onKeyDown={(e) => handleKeyPress(e, values)} // Pass values to handleKeyPress
            />
          </div>

          <div className="input-icon">
            <img src={lock} alt="" className="input-icon-img" />
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Mot de passe"
              component={InputPwd}
              className="input bg-grey-afpa-light pr-10"
              showPassword={values.showPassword}
              onKeyDown={(e) => handleKeyPress(e, values)} // Pass values to handleKeyPress
            />
            <ErrorMessage name="LOGIN_SCHEMA">
              {(msg) => <div className="text-red-600 text-sm">{msg}</div>}
            </ErrorMessage>
            <img
              src={values.showPassword ? eye : noeye}
              alt=""
              onClick={() =>
                setFieldValue("showPassword", !values.showPassword)
              }
              className="input-icon-img-right"
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Field
                id="remember_me"
                name="rememberMe"
                type="checkbox"
                className="border border-pink-600 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-full"
                checked={values.rememberMe === true}
              />
              <label
                htmlFor="remember_me"
                className="ml-2 mb-4 block text-sm leading-5 text-gray-900"
              >
                Se rappeler de moi
              </label>
            </div>
          </div>

          <div className="mt-6">
            <GreenButton
              type="submit"
              disabled={isSubmitting}
              cas="isCO"
              id="bouton_de_connexion"
            >
              Se connecter
            </GreenButton>
            {error && (
              <div className="text-red-600 text-center mt-6">
                Identifiant et/ou mot de passe incorrect
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
