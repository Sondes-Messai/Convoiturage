import React, { useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { PlusIconInverted } from "../../assets/icons/PlusIconInverted";
import userService from "./../../services/userService";
import SearchBar from "../../components/search/SearchBar";
import Pagination from "../../components/pagination/Pagination";
import { filterRole } from "../../constants/RoleFilter";
import InputGradient from "../../components/utils/input/InputGradient";
import { URL_ADD_USER_ADMIN } from "../../constants/urls/urlFrontEnd";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import GestionMenu from "../../components/windows/GestionMenu";
import AdminUserTable from "../../components/admin/AdminUserTable";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState("ASC");
  const [property, setProperty] = useState("firstName");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [nbUsers, setNbUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [isHovered, setHovered] = useState(false);
  const condition1 = "BLOCKED";
  const condition2 = "ARCHIVED";


  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  function handlePageChange(newPage) {
    if (newPage >= 0) {
      setPageIndex(newPage);
    }
  }

  async function loadUsers() {
    const profil = await userService.search(
      search,
      sortDirection,
      pageIndex,
      pageSize,
      property
    );
    setNbUsers(profil.totalElements);
    setUsers(profil.content);
  }

  const handleHeaderClick = (column) => {
    if (column === property) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortDirection("ASC");
      setProperty(column);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search, pageIndex, sortDirection, property]);
  return (
    <section className="antialiased text-gray-600 mt-10">
      <div className="w-3/5 mx-auto flex justify-start items-center">
        <div className="w-1/4">
          <InputGradient
            onHover={() => setHovered(false)}
            onLeave={() => setHovered(true)}
          >
            {isHovered ? (
              <PlusIconInverted width="20px" height="20px" className="mr-3" />
            ) : (
              <PlusIcon width="20px" height="20px" className="mr-3" />
            )}
            <Link
              to={URL_ADD_USER_ADMIN}
              className="text-white font-jakartaSans mr-3"
            >
              Ajouter un utilisateur
            </Link>
          </InputGradient>
        </div>
        <div className="w-2/4 flex justify-center">
          <SearchBar placeholder="Rechercher..." onSearch={handleSearch} />
        </div>
        <div className="w-1/4"></div>
      </div>
      <div className="w-3/4 mx-auto bg-white shadow-lg rounded-lg border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h5 className="text-center font-bold">La liste des utilisateurs</h5>
        </header>
        <div className="pb-3 mb-20">
          <AdminUserTable
            users={users}
            property={property}
            sortDirection={sortDirection}
            handleHeaderClick={handleHeaderClick}
            condition1={condition1}
            condition2={condition2}

          />
          <Pagination
            currentPage={pageIndex}
            totalPages={Math.ceil(nbUsers / pageSize)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
