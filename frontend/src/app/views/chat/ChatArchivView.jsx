import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import messageService from "../../services/messageService";

import WhiteWithGreenBorderButton from "../../components/utils/button/WhiteWithGreenBorderButton";
import conversationService from "../../services/conversationService";

const ChatArchivView = () => {
  //chat: id de la conversation
  const { chat } = useParams();

  const [profiles, setProfiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const divRef = useRef(null);

  /**
   * récupération des participants de la conversation
   */
  async function getprofiles() {
    const conversation = await conversationService.findById(chat);
    const { createdDate, participants, id, name } = conversation;
    setProfiles(participants);
  }

  /**
   * récupération des messages d'une conversation
   */
  async function fetchMessages() {
    const messages = await messageService.getAllByConversationId(chat);
    setMessages(messages);
  }

  /**
   * lancement des récupérations
   */
  useEffect(() => {
    getprofiles();
    fetchMessages();
  }, []);

  /**
   * ascenseur si laconversation dépasse la taille de l'écran
   */
  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * formatage de la date
   * @param {*} date
   * @returns
   */
  function formDate(date) {
    const day = date.slice(8, 10);
    const mounth = date.slice(5, 7);
    const year = date.slice(0, 4);
    const time = date.includes("T") ? date.split("T")[1] : date.split(" ")[1];
    const times = time.split(":");
    return `${day}/${mounth}/${year} à ${times[0]}:${times[1]}`;
  }

  console.log("profiles", profiles)
  console.log("messages", messages)
  /**
   * début de composant
   */
  return (
    <div>
      <p className="flex justify-center font-bold text-lg">La conversation</p>
      <div className="messageChatContainer w-full bg-white flex items-center justify-center h-screen ">
        <div
          className={
            chat != null
              ? "h-[90%] w-[80%] flex flex-col drop-shadow-lg rounded-2xl bg-white"
              : "hidden"
          }
        >
          <ul ref={divRef} className="overflow-y-scroll flex flex-col">
            {messages.map((msg) =>
              msg.sender.toLowerCase() ===
              (profiles.length > 1 && profiles[0].firstName.toLowerCase()) ? (
                <li
                  key={msg.id}
                  className="p-3 flex items-center self-end max-w-[50%] justify-between"
                >
                  <div className="flex flex-col mr-3 my-2">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={profiles[0].picture.url}
                        alt="Image de profil"
                      />
                      <p className="ml-4 font-jakartaSans">
                        {profiles.length > 1 && profiles[0].firstName}{" "}
                        {profiles.length > 1 && profiles[0].lastName}
                      </p>
                    </div>
                    <div className="p-3 mb-3 ml-16 bg-green-afpa-alert rounded-l-2xl rounded-br-2xl text-white font-jakartaSans break-words">
                      {msg.content}
                    </div>
                    <p className="font-jakartaSans ml-16 text-[8px] text-grey-afpa text-right">
                      {formDate(msg.date)}
                    </p>
                  </div>
                </li>
              ) : (
                <li key={msg.id} className="p-3 flex items-center justify-between">
                  <div
                    
                    className="flex flex-col self-start max-w-[50%]  my-2"
                  >
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={profiles.length > 1 && profiles[1].picture.url}
                        alt="Image de profil"
                      />
                      <p className="ml-4 font-jakartaSans">
                        {profiles.length > 1 && profiles[1].firstName}{" "}
                        {profiles.length > 1 && profiles[1].lastName}
                      </p>
                    </div>
                    <div className="p-3 mb-3 ml-16 bg-grey-afpa-light rounded-r-2xl rounded-bl-2xl text-black font-jakartaSans break-words">
                      {msg.content}
                    </div>
                    <p className="font-jakartaSans ml-16 text-[8px] text-grey-afpa text-left">
                      {formDate(msg.date)}
                    </p>
                  </div>
                </li>
              )
            )}
            <div className="divRef"></div>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <Link to={"/admin/archives"}>
          <WhiteWithGreenBorderButton>
            <span>Retour</span>
          </WhiteWithGreenBorderButton>
        </Link>
      </div>
      ;
    </div>
  );
};

export default ChatArchivView;
