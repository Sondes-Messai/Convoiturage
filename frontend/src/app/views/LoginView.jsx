import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { URL_FORGET_PASSWORD, URL_HOME } from "../constants/urls/urlFrontEnd";
import { selectIsLogged } from "./../redux-store/authenticationSlice";
import Login from "../components/account/Login";

/**
 * View/Page Login
 * @author Chadjou Daffe
 */
const LoginView = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsLogged);

  useEffect(() => {
    if (isAuthenticated) navigate(URL_HOME);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col sm:justify-start items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto mt-20">
        <h2 className="mb-20 text-center text-[32px] font-jakartaSans font-bold font-[700] text-grey-afpa-dark ">
          Se connecter
        </h2>
        <Login />
        <div className="mt-6 text-center">
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <p>Pas de compte ?</p>
              <Link
                className=" ml-2 text-[13px] underline connexionLinks"
                to="/register"
              >
                Inscription
              </Link>
            </div>
            <Link
              to={URL_FORGET_PASSWORD}
              className="underline connexionLinks text-[13px]"
            >
              Mot de passe oublié
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
