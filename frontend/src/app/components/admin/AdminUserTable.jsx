import React, { useState } from "react";
import { filterRole } from "../../constants/RoleFilter";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import GestionMenu from "../windows/GestionMenu";

function AdminUserTable({ users, property, sortDirection, handleHeaderClick, condition1, condition2 }) {
  const [active, setActive] = useState(null);
  return (
    <table className="table-auto w-full">
      <tbody>
        <tr className="bg-grey-afpa-light h-[40px] mb-4">
          <th className="w-24"></th>
          <th
            className={`whitespace-nowrap cursor-pointer w-40`}
            onClick={() => handleHeaderClick("lastName")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "lastName"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                NOM
              </div>
              {property === "lastName" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "lastName" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th
            className={`whitespace-nowrap cursor-pointer w-40`}
            onClick={() => handleHeaderClick("firstName")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "firstName"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                PRÉNOM
              </div>
              {property === "firstName" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "firstName" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th
            className={`whitespace-nowrap cursor-pointer w-60`}
            onClick={() => handleHeaderClick("mail")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "mail"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                EMAIL
              </div>
              {property === "mail" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "mail" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th
            className="whitespace-nowrap cursor-pointer w-36"
            onClick={() => handleHeaderClick("createdDate")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "createdDate"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                INSCRIPTION
              </div>
              {property === "createdDate" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "createdDate" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th
            className="whitespace-nowrap cursor-pointer w-36"
            onClick={() => handleHeaderClick("role")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "role"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                RÔLE
              </div>
              {property === "role" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "role" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th className="w-16"></th>
        </tr>
        <tr className="h-[10px]"></tr>
        {users.map(
          (user, index) =>
            user.status != condition1 && user.status != condition2 && (
              <tr
                key={`user-${user.matricule}`}
                className={
                  user.status === "BLOCKED"
                    ? "h-[60px] bg-rose-afpa-light"
                    : "h-[60px] hover:bg-grey-afpa-light"
                }
              >
                <th className="flex justify-center items-center h-[60px]">
                  <img
                    className="rounded-full"
                    src={user.picture.url}
                    width="50px"
                    height="50px"
                  />
                </th>
                <th className="text-center font-jakartaSans">
                  {user.lastName}
                </th>
                <th className="text-center font-jakartaSans">
                  {user.firstName}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {user.mail}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {user.createdDate}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {filterRole(user.role.label)}
                </th>
                <th className="relative text-end">
                  <GestionMenu
                    onClick={() => {
                      setActive(index);
                      if (active == index) setActive(null);
                    }}
                    user={user}
                    iconColor={active == index ? "fill-green-afpa" : ""}
                    className={
                      active == index
                        ? "absolute right-10 top-0 w-[175px] bg-white shadow-lg rounded-xl ml-2"
                        : "hidden"
                    }
                  />
                </th>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}

export default AdminUserTable;
