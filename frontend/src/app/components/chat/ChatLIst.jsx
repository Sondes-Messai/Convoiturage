import React, { useState } from "react";
import ChatCard from "./ChatCard";
import { SearchGreen } from "../../assets/icons/SearchGreen";
import CurrentPageBar from "../utils/CurrentPageBar";

const ChatList = ({ conversations, active }) => {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <CurrentPageBar text={"Messagerie"} />
      <div className="flex flex-row-reverse">
        <div className="flex flex-col max-w-[60%] gap-5 w-3/5 p-3">
          <div className="relative text-gray-400 focus-within:text-gray-600 block flex">
            <input
              id="searchTrips-input"
              data-testid="filter"
              value={filter}
              onChange={handleFilterChange}
              type="search"
              name="searchTrips"
              placeholder="Recherche"
              className="signupInput signupInputWhite w-full px-3 py-2 outline-none border-none"
            />
            <SearchGreen
              width="42px"
              height="42px"
              className="pointer-events-none h-[50%] absolute top-1/2 transform -translate-y-1/2 right-[5%] "
            />
          </div>
          {conversations.map((conv, index) => (
            <ChatCard key={index} chat={conv} onClick={active}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;
