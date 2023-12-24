import React from "react";
import notFound from "./../assets/img/404.png";
import LinkGradientButton from "../components/utils/button/LinkGradientButton";
import * as URL from "../constants/urls/urlFrontEnd";

function NotFoundView() {
  return (
    <div className="flex flex-col items-center pt-10">
      <h3 className="font-jakartaSans font-bold">Désolé, page non trouvée !</h3>
      <img src={notFound} alt="404 Not found" className="w-[620px]" />
      <LinkGradientButton link={URL.URL_HOME} children={"Retourner à la page d'accueil"} cas="404" />
    </div>
  );
}

export default NotFoundView;
