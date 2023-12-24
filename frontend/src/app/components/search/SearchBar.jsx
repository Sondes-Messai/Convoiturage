import React, { useState } from "react";
import { SearchIcone } from "../../assets/icons/SearchIcone";

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchValue);
    }
  };

  return (
    <div
      id="search_container"
      className="max-w-md w-full flex items-center p-2 justify-self-center"
    >
      <div className="outline-none w-full px-5 text-gray-800 border-2 border-grey-afpa-mid rounded-3xl flex justify-between focus-within:border-green-afpa">
        <input
          aria-label="rechercher"
          id="input"
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          className="w-full h-10 relative transition-all duration-300 outline-0 focus:outline-none"
        />
        <button
          onClick={handleSearchClick}
          id="btn"
          className="flex items-center justify-center ml-3"
        >
          <SearchIcone />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
