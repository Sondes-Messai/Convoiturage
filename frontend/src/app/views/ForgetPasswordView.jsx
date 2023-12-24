import React from "react";
import GreenButton from "../components/utils/button/GreenButton";

const ForgetPasswordView = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-start items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-13 mx-auto mt-5">
        <h2 className="mb-12 text-center text-2xl font-extrabold">
          Veuillez entrer votre adresse e-mail afin que nous puissions vous
          envoyer un lien pour réinitialiser votre mot de passe
        </h2>
        <form>
          <div>
            <input
              id="email"
              type="email"
              name="email"
              className="text-sm
                          placeholder-gray-500
                          pl-10
                          pr-4
                          rounded-2xl
                          border border-gray-400
                          w-full
                          py-2
                          focus:outline-none focus:border-blue-400 "
              placeholder="E-mail"
            />
          </div>

          <div className="mt-20 text-center">
            <GreenButton
              type="submit"
              onClick={() => console.log("bouton mot de passe oublié")}
              id="forgot_password_send"
            >
              Envoyer
            </GreenButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordView;
