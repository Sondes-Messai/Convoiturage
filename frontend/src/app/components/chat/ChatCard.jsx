import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import { getEmail } from "../../services/tokenServices";

const ChatCard = ({ chat, onClick }) => {
  const [otherProfil, setOtherProfile] = useState({});
  const [url, setUrl] = useState();

  useEffect(() => {
    (async function loadProfile(){
      const profil = await userService.getUserByEmailOrMatricule(getEmail());
      const other = chat.participants.find(participant => participant.matricule !== profil.matricule);
      setOtherProfile(other);
      setUrl(other.picture.url);
    })();
  }, []);

  const sendData = () => {
    chat.recepteur = otherProfil;
    onClick(chat)
  }

  return (
    <div
      key={chat.id}
      className="w-full rounded-3xl flex shadow-custom gap-3 p-3 items-center h-20 hover:bg-slate-100"
      onClick={sendData}
    >
      <img
        className="h-16 w-16 rounded-full object-cover "
        src={url}
        alt="Image de profil"
      />
      <div className="flex justify-start items-center font-jakartaSans font-bold">
        {otherProfil.firstName} {otherProfil.lastName}
      </div>
    </div>
  );
};

export default ChatCard;
