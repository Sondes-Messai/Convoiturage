import React, { useEffect, useState } from "react";

import userService from "./../../services/userService";

import Pagination from "../../components/pagination/Pagination";

import AdminContactUsTable from "../../components/admin/AdminContactUsTable";
import contactUsService from "../../services/contactUsService";

const AdminContactUsView = () => {
  const [contactUsMessages, setcontactUsMessages] = useState([]);
  const [sortDirection, setSortDirection] = useState("ASC");
  const [property, setProperty] = useState("name");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [nbUsers, setNbUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [isHovered, setHovered] = useState(false);

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  function handlePageChange(newPage) {
    if (newPage >= 0) {
      setPageIndex(newPage);
    }
  }

  async function loadMessages() {
    console.log("log");
    const data = await contactUsService.getAll();
    setcontactUsMessages(data);
    console.log("getall",data)
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
    loadMessages();
  }, []);
  
  return (
    <section className="antialiased text-gray-600 mt-10">
      <div className="w-3/5 mx-auto flex justify-start items-center"></div>
      <div className="w-3/4 mx-auto bg-white shadow-lg rounded-lg border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h5 className="text-center font-bold">Messages "Contactez-nous"</h5>
        </header>
        <div className="pb-3 mb-20">
          <AdminContactUsTable
            messages={contactUsMessages}
            property={property}
            sortDirection={sortDirection}
            handleHeaderClick={handleHeaderClick}
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

export default AdminContactUsView;
