import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminHomeIcone } from "../../assets/icons/AdminHomeIcone";
import { AdminPreferencesIcone } from "../../assets/icons/AdminPreferencesIcone";
import { AdminSitesIcone } from "../../assets/icons/AdminSitesIcone";
import { AdminUsersIcone } from "../../assets/icons/AdminUsersIcone";
import { ArchiveIcon } from "../../assets/icons/ArchiveIcon";
import { MailIcon } from "../../assets/icons/MailIcon";

const NavBarAdmin = () => {
  const [hoveredIcon, setHoveredIcon] = useState(false);
  const location = useLocation();

  const handleIconHover = () => {
    setHoveredIcon(true);
  };

  const handleIconLeave = () => {
    setHoveredIcon(false);
  };

  return (
    <div
      className={`absolute bg-white z-50 ${
        !hoveredIcon ? "w-[3rem]" : "w-[10rem]"
      } transition-all duration-500`}
      onMouseLeave={handleIconLeave}
    >
      <div
        className={`gradient h-1.5 ${!hoveredIcon ? "w-full" : "w-full"}`}
      ></div>
      <div className="">
        <Link
          to="/admin/home"
          className={`font-jakartaSans text-sm flex items-center p-2  hover:bg-gray-200 hover:border-r-[6px] border-[#1ea6ba] min-h-[3rem] transition-all ${
            location.pathname === "/admin/home" ? "text-green-afpa" : ""
          }`}
          onMouseEnter={handleIconHover}
        >
          {!hoveredIcon ? (
            <AdminHomeIcone
              width="30px"
              height="30px"
              isActive={location.pathname === "/admin/home" ? true : false}
            />
          ) : (
            <p className="flex-shrink-0">Accueil admin</p>
          )}
        </Link>
        <div className="border-t border-gray-300"></div>
        <Link
          to="/admin/users"
          className={`font-jakartaSans text-sm flex items-center space-x-2 p-2  hover:bg-gray-200 hover:border-r-[6px] border-[#1ea6ba] min-h-[3rem] transition-all ${
            location.pathname === "/admin/users" ? "text-green-afpa" : ""
          }`}
          onMouseEnter={handleIconHover}
        >
          {!hoveredIcon ? (
            <AdminUsersIcone
              width="30px"
              height="30px"
              isActive={location.pathname === "/admin/users" ? true : false}
            />
          ) : (
            <p className="flex-shrink-0">Les utilisateurs</p>
          )}
        </Link>
        <div className="border-t border-gray-300"></div>
        <Link
          to="/admin/preferences"
          className={`font-jakartaSans text-sm flex items-center space-x-2 p-2  hover:bg-gray-200 hover:border-r-[6px] border-[#1ea6ba] min-h-[3rem] transition-all ${
            location.pathname === "/admin/preferences" ? "text-green-afpa" : ""
          }`}
          onMouseEnter={handleIconHover}
        >
          {!hoveredIcon ? (
            <AdminPreferencesIcone
              width="30px"
              height="30px"
              isActive={
                location.pathname === "/admin/preferences" ? true : false
              }
            />
          ) : (
            <p className="flex-shrink-0">Les préférences</p>
          )}
        </Link>
        <div className="border-t border-gray-300"></div>
        <Link
          to="/admin/sites"
          className={`font-jakartaSans text-sm flex items-center space-x-2 p-2  hover:bg-gray-200 hover:border-r-[6px] border-[#1ea6ba] min-h-[3rem] transition-all ${
            location.pathname === "/admin/sites" ? "text-green-afpa" : ""
          }`}
          onMouseEnter={handleIconHover}
        >
          {!hoveredIcon ? (
            <AdminSitesIcone
              width="30px"
              height="30px"
              isActive={location.pathname === "/admin/sites" ? true : false}
            />
          ) : (
            <p className="flex-shrink-0">Les sites Afpa</p>
          )}
        </Link>
        <div className="border-t border-gray-300"></div>
        <Link
          to="/admin/archives/0"
          className={`font-jakartaSans text-sm flex items-center space-x-2 p-2  hover:bg-gray-200 hover:border-r-[6px] border-[#1ea6ba] min-h-[3rem] transition-all ${
            location.pathname === "/admin/archives/0" ? "text-green-afpa" : ""
          }`}
          onMouseEnter={handleIconHover}
        >
          {!hoveredIcon ? (
            <ArchiveIcon
              width="30px"
              height="30px"
              isActive={location.pathname === "/admin/archives/0" ? true : false}
            />
          ) : (
            <p className="flex-shrink-0">Les archives</p>
          )}
        </Link>
        <div className="border-t border-gray-300"></div>
        <Link
          to="/admin/contact-us"
          className={`font-jakartaSans text-sm flex items-center space-x-2 p-2  hover:bg-gray-200 hover:border-r-[6px] border-[#1ea6ba] min-h-[3rem] transition-all ${
            location.pathname === "/admin/contact-us" ? "text-green-afpa" : ""
          }`}
          onMouseEnter={handleIconHover}
        >
          {!hoveredIcon ? (
            <MailIcon
              width="30px"
              height="30px"
              isActive={
                location.pathname === "/admin/contact-us" ? true : false
              }
            />
          ) : (
            <p className="flex-shrink-0">Contactez-nous</p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default NavBarAdmin;
