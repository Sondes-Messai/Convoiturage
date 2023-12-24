import React from "react";
import LogoKawaa from "../../assets/img/Logo-Kawaa.svg";
import LogoAfpa from "../../assets/img/Logo-Afpa.png";
import { Link, NavLink } from "react-router-dom";

/**
 * @COMPONENT FOOTER
 * @AUTHOR Quentiinos
 **/

const Footer = () => {
  return (
    <footer className="bg-white w-full">
      <div className="grid grid-cols-5 justify-center justify-items-center items-center text-center">
        <div>
          <Link to={"/"}>
            <img src={LogoAfpa} alt="Afpa" />
          </Link>
        </div>
        <div className="col-span-3">
          <ul className="grid grid-cols-7 justify-items-center items-center">
            <li className="inline font-jakartaSans">
              <Link to={"/cgu"}>CGU</Link>
            </li>
            <li className="inline text-slate-200">|</li>
            <li className="inline font-jakartaSans">
              <Link to={"/mentions-legales"}>Mentions légales</Link>
            </li>
            <li className="inline text-slate-200">|</li>
            <li className="inline font-jakartaSans">
              <Link to={"/politique-de-protection-des-donnees"}>
                Politique de protections de données
              </Link>
            </li>
            <li className="inline text-slate-200">|</li>
            <li className="inline font-jakartaSans">
              <Link to={"/contactez-nous"}>Contactez-nous</Link>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/">
            <img src={LogoKawaa} alt="" className="w-14 h-14" />
          </Link>
        </div>
      </div>
      <div className="gradient h-3 w-full"></div>
    </footer>
  );
};

export default Footer;
