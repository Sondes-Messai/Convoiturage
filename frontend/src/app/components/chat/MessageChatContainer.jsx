import React from "react";
import MessageChat from "./MessageChat";

const MessageChatContainer = ({profil,conversation}) => {
  return (
    <>
      <div className="messageChatContainer w-full bg-gray-100 flex items-center justify-center h-screen">
        <MessageChat profil={profil} conversation={conversation} />
      </div>
    </>
  );
};

export default MessageChatContainer;
