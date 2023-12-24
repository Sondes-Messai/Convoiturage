import React, { useEffect, useState } from "react";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { AdminPreferencesIcone } from "../../assets/icons/AdminPreferencesIcone";
import { AdminSitesIcone } from "../../assets/icons/AdminSitesIcone";
import { AdminUsersIcone } from "../../assets/icons/AdminUsersIcone";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import { filterRole } from "../../constants/RoleFilter";
import AdminStatistiques from "../../components/admin/AdminStatistiques"

function AdminHomeView() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function getProfilLoad() {
      const users = await userService.search("", "DESC", 0, 6, "createdDate");
      console.log("Users:", users);
      setUsers(users.content);
    })();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-[400px] flex justify-center items-center my-14">
        <div className="w-full shadow-lg mx-40 flex justify-center items-center font-jakartaSans text-xl">
          <AdminStatistiques/>
        </div>
      </div>
      <div className="flex justify-center w-full px-52">
        <div className="w-1/4 flex flex-col items-center">
          <Link
            to="/admin/addUser"
            className="w-[300px] h-[70px] shadow-xl mb-5 flex justify-between items-center px-5"
          >
            <AdminUsersIcone width="40px" height="40px" />
            <span className="font-jakartaSans">Ajouter un utilisateur</span>
            <ArrowIcon width="20px" height="20px" />
          </Link>
          <Link
            to="/admin/preferences"
            className="w-[300px] h-[70px] shadow-xl mb-5 flex justify-between items-center px-5"
          >
            <AdminPreferencesIcone width="40px" height="40px" />
            <span className="font-jakartaSans">Ajouter une préférence</span>
            <ArrowIcon width="20px" height="20px" />
          </Link>
          <Link
            to="/admin/sites"
            className="w-[300px] h-[70px] shadow-xl flex justify-between items-center px-5"
          >
            <AdminSitesIcone width="40px" height="40px" />
            <span className="font-jakartaSans">Ajouter un site Afpa</span>
            <ArrowIcon width="20px" height="20px" />
          </Link>
        </div>
        <div className="w-3/4 ml-10 mb-10 shadow-xl flex flex-col">
          <div className="font-jakartaSans text-[18px] font-medium py-5 pl-5">
            Derniers utilisateurs créés
          </div>
          <table className="w-full">
            <tbody>
              <tr className="bg-grey-afpa-light h-[40px]">
                <td className="w-20"></td>
                <td className="w-36 font-jakartaSans font-semibold text-left text-green-afpa">
                  Nom
                </td>
                <td className="w-36 font-jakartaSans font-semibold text-left text-green-afpa">
                  Prénom
                </td>
                <td className="w-52 font-jakartaSans font-semibold text-center text-green-afpa">
                  Email
                </td>
                <td className="w-20 font-jakartaSans font-semibold text-center text-green-afpa">
                  Inscription
                </td>
                <td className="w-36 font-jakartaSans font-semibold text-center text-green-afpa">
                  Rôle
                </td>
              </tr>
              <tr className="h-[10px]"></tr>
              {users.map((user) => (
                <tr
                  key={`user-${user.matricule}`}
                  className={
                    user.status === "BLOCKED"
                      ? "h-[60px] bg-rose-afpa-light"
                      : "h-[60px] hover:bg-grey-afpa-light"
                  }
                  onClick={() => navigate(`/admin/user/${user.matricule}`)}
                >
                  <td>
                    <img
                      className="rounded-full mx-auto"
                      src={user.picture.url}
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td className="text-left font-jakartaSans font-bold">
                    {user.lastName}
                  </td>
                  <td className="text-left font-jakartaSans font-bold">
                    {user.firstName}
                  </td>
                  <td className="text-center font-jakartaSans">{user.mail}</td>
                  <td className="text-center font-jakartaSans">
                    {user.createdDate}
                  </td>
                  <td className="text-center font-jakartaSans">
                    {filterRole(user.role.label)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHomeView;
