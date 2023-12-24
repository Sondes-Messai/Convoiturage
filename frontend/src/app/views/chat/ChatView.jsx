import React, { useEffect, useState } from "react";
import NoMessageForTheMoment from "../../components/chat/NoMessageForTheMoment";
import MessageChatContainer from "../../components/chat/MessageChatContainer";
import conversationService from "../../services/conversationService";
import userService from "../../services/userService";
import { getEmail } from "../../services/tokenServices";
import ChatList from "../../components/chat/ChatLIst";

const ChatView = () => {
  const [messageList, setMessageList] = useState([]);
  const [conversation, setConversation] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const newProfil = await userService.getUserByEmailOrMatricule(
          getEmail()
        );
        const response = await conversationService.getAllByUserId(newProfil.id);
        setMessageList(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }
    fetchData();
  }, []);

  const identifyConv = (data) => {
    setConversation(data);
  };

  return (
    <div className="flex overflow-x-hidden">
      <div className="w-2/5">
        {!messageList.length ? (
          <NoMessageForTheMoment />
        ) : (
          <ChatList conversations={messageList} active={identifyConv} />
        )}
      </div>
      <div className="flex-1">
        <MessageChatContainer conversation={conversation} />
      </div>
    </div>
  );
};

export default ChatView;
