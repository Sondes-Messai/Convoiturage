import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SearchGreen } from "./../../assets/icons/SearchGreen";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";

import userService from "../../services/userService";
import rideService from "../../services/rideService"
import conversationService from "../../services/conversationService";
import contactUsService from "../../services/contactUsService";

import Pagination from "../../components/pagination/Pagination";

import AdminUserTable from "../../components/admin/AdminUserTable";
import AdminRideTable from "../../components/admin/AdminRideTable";
import AdminChatTable from "../../components/admin/AdminChatTable";
import AdminArchivContact from "../../components/admin/AdminArchivContact";

function AdminArchivesView() {
  const [users, setUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState("ASC");
  const [property, setProperty] = useState("firstName");
  const [status, setStatus] = useState("ARCHIVED");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [nbUsers, setNbUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [rides, setRides] = useState([])
  const [nbRides, setNbRides] = useState(0)
  const [chats, setChats] = useState([{}]);
  const [nbChats, setNbChats] = useState(0);
  const [contactForms, setContactForms] = useState([]);
  const [nbContactForms, setNbContactForms] = useState(0);

  //menu des pages d'archives
  const links = [
    {
      id: "pa",
      name: "Les profils archivés",
      href: "",
      status: "ARCHIVED",
    },
    {
      id: "pb",
      name: "Les profils bloqués",
      href: "",
      status: "BLOCKED",
    },
    {
      id: "t",
      name: "Les trajets",
      href: "",
    },
    {
      id: "m",
      name: "La messagerie",
      href: "",
    },
    {
      id: "f",
      name: "Les formulaires de contact",
      href: "",
    },
  ];

  let { index } = useParams();
  console.log(index);
  /**
   * garde l'index du menu sur lequel l'utilisateur click
   * @param {*} index
   */
  const handleLiClick = async (index) => {
    setStatus(links[index].status);
    setFocusedIndex(index);
  };

  /**
   * fonction liée à l'input de recherche
   * @param {*} event
   */
  const handleInputChangeSearch = (event) => {
    const newValue = event.target.value;
    setSearch(newValue);
  };

  /**
   * fonction liée à la pagination
   * @param {*} newPage
   */
  function handlePageChange(newPage) {
    if (newPage >= 0) {
      setPageIndex(newPage);
    }
  }

  /**
   * chargement des users
   */
  async function loadUsers() {
    const users = await userService.search(
      search,
      sortDirection,
      pageIndex,
      pageSize,
      property,
      status
    );
    setNbUsers(users.totalElements);
    setUsers(users.content);
  }

  /**
   * chargement des trajets
   */
  async function loadRides() {
    const ridesArray = await rideService.findAll(
      sortDirection,
      pageIndex,
      pageSize,
      property
    );
    setNbRides(ridesArray.totalElements);
    setRides(ridesArray);
  }

  /**
   * récupération des conversations dans le back
   */
  async function loadChats() {
    const chatsArray = await conversationService.findAll(
      sortDirection,
      pageIndex,
      pageSize,
      property
    );
    console.log(chatsArray);
    setChats(chatsArray);
    setNbChats(chatsArray.length);
  }

  /**
   * récupération des formulaires de contact archivés
   */
  async function loadContactForms() {
    console.log("loadContact")
    const formsArray = await contactUsService.findAll(
      sortDirection,
      pageIndex,
      pageSize,
      property
    );
    console.log("formArray.content",formsArray.content);
    setContactForms(formsArray.content);
    setNbContactForms(formsArray.length);
  }

  /**
   * sens du tri des colonnes
   * @param {*} column
   */
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
    loadRides();
    loadChats();
    loadContactForms();
    console.log("rides", rides)
  }, [status, search, pageIndex, sortDirection, property]);
  
  useEffect(() => {
    handleLiClick(index || 0);
  }, []);

  return (
    <div className="">
      <div className="w-full h-3/5 relative overflow-hidden flex flex-col justify-around items-center">
        <h5 className="text-center font-bold">Les archives</h5>

        <div className="w-3/4 ml-10 mb-10flex justify-center">
          <ul className="grid grid-flow-col gap-4">
            {links.map((link, index) => (
              <li key={link.id} onClick={() => handleLiClick(index)}>
                <Link
                  to={link.href}
                  style={{
                    fontWeight: index == focusedIndex ? "bold" : "normal",
                    borderBottomColor:
                      index == focusedIndex ? "#87bb34" : "#f1f1f1",
                  }}
                  className="text-center border-b-4 border-grey-afpa-light px-10 focus:border-green-afpa focus:font-bold"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 ml-10 mb-10 py-5 flex flex-col justify-between border border-grey-afpa-light rounded-xl md:flex-row">
          <div className="flex mx-2">
            <input
              type="text"
              placeholder="Recherche"
              className="w-96 px-3 py-2 outline-none border border-grey-afpa-light rounded-xl"
              value={search}
              onChange={handleInputChangeSearch}
            />
            <i className="relative right-12">
              <SearchGreen
                width="32px"
                height="32px"
                className="fill-grey-afpa mr-2"
              />
            </i>
          </div>

          <div className="flex items-center mx-2">
            <input
              type="text"
              placeholder="01/01/2023-01/01/2023"
              className="w-96 pr-8 pl-11 py-2 outline-none border boreder-grey-afpa-light rounded-xl text-center md:w-full"
              value={search}
              onChange={handleInputChangeSearch}
            />
            <i className="absolute pl-3">
              <CalendarIcon
                width="22px"
                height="22px"
                className="fill-grey-afpa mr-2"
              />
            </i>
          </div>
        </div>
        {/* Partie à adapter en fonction des filtres */}
        <div className="pb-3 mb-20 w-3/4">
          {/* Affiche le composant en fonction de l'index de la table links 
          sachant que les index 0 et 1 utilisent la même logique mais le switch case ne prend pas le ||
          A simplifier si quelqu'un a une idée lumineuse*/}
          {{
            0: (
              <>
                <AdminUserTable
                  users={users}
                  property={property}
                  sortDirection={sortDirection}
                  handleHeaderClick={handleHeaderClick}
                />
                <Pagination
                  currentPage={pageIndex}
                  totalPages={Math.ceil(nbUsers / pageSize)}
                  onPageChange={handlePageChange}
                />
              </>
            ),
            1: (
              <>
                <AdminUserTable
                  users={users}
                  property={property}
                  sortDirection={sortDirection}
                  handleHeaderClick={handleHeaderClick}
                />
                <Pagination
                  currentPage={pageIndex}
                  totalPages={Math.ceil(nbUsers / pageSize)}
                  onPageChange={handlePageChange}
                />
              </>
            ),
            2: (
              <>
                <AdminRideTable
                  rides={rides}
                  property={property}
                  sortDirection={sortDirection}
                  handleHeaderClick={handleHeaderClick}
                />
                <Pagination
                  currentPage={pageIndex}
                  totalPages={Math.ceil(nbRides / pageSize)}
                  onPageChange={handlePageChange}
                />
              </>
            ),
            3: (
              <>
                <AdminChatTable
                  chats={chats}
                  property={property}
                  sortDirection={sortDirection}
                  handleHeaderClick={handleHeaderClick}
                />
                <Pagination
                  currentPage={pageIndex}
                  totalPages={Math.ceil(nbChats / pageSize)}
                  onPageChange={handlePageChange}
                />
              </>
            ),
            4: (
              <>
                <AdminArchivContact
                  contactForms={contactForms}
                  property={property}
                  sortDirection={sortDirection}
                  handleHeaderClick={handleHeaderClick}
                />
                <Pagination
                  currentPage={pageIndex}
                  totalPages={Math.ceil(nbContactForms / pageSize)}
                  onPageChange={handlePageChange}
                />
              </>
            ),
          }[focusedIndex] || <p>En construction</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminArchivesView;
