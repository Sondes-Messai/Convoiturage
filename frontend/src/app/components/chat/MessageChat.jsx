import React, { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import sendButton from "../../assets/img/sendButton.svg";
import { getEmail } from "../../services/tokenServices";
import userService from "../../services/userService";
import { formatProfil } from "../utils/Outils";
import attachement from "../../assets/img/attachement.svg";
import FileUploadComponent from "../utils/FileUploadComponent";
import ImageButton from "../utils/button/ImageButton";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import Message from "../../models/Message";
import * as MessageType from "../../constants/MessageType";
import messageService from "../../services/messageService";
import MessagePost from "../../models/MessagePost";

const MessageChat = ({ conversation }) => {
  const [stompClient, setStompClient] = useState(null);
  const [profile, setProfile] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const divRef = useRef(null);
  const [todayNowDate, setTodayNowDate] = useState(formatDate(new Date()));
  const [imagefile, setImageFile] = useState();
  const [file, setFile] = useState(null);
  const fileUploadComponentRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleImageUpload = (imageData) => {
    setImageFile(imageData);
  };

  const uploadFile = (
    <img
      onClick={() => {
        console.log("rajouter la fonction d'ajout d'une pièce jointe");
      }}
      alt="ajouter pièce jointe"
      src={attachement}
    />
  );

  useEffect(() => {
    if (conversation && conversation.id) {
      (async function fetchMessages() {
        const messages = await messageService.getAllByConversationId(
          conversation.id
        );
        setMessages(messages);
      })();
    }
  }, [conversation ? conversation.id : null]);

  useEffect(() => {
    (async function getProfilLoad() {
      const userProfile = await userService.getUserByEmailOrMatricule(
        getEmail()
      );
      setProfile(formatProfil(userProfile));
    })();
  }, [profile ? profile.matricule : null]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.debug = null;

    client.connect({}, () => {
      setStompClient(client);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(
        `/user/${profile.matricule}/private`,
        (response) => {
          const newMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      );
    }
  }, [stompClient]);

  /**
   * Envoie du message dans le websocket et en requete http post classique
   * @author Clément Vaugoyeau
   */
  const handleSubmit = async () => {
    if (
      (stompClient && inputValue.trim() !== "") ||
      (stompClient && file !== null)
    ) {
      let imageUrl = "";

      const message = new MessagePost(
        conversation.id,
        inputValue,
        format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        profile.id,
        profile.matricule
      );

      const formData = new FormData();
      formData.append("content", inputValue);
      formData.append("conversationId", conversation.id);
      formData.append(
        "createdDate",
        format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
      );
      formData.append("userId", profile.id);
      formData.append("userMatricule", profile.matricule);
      formData.append("file", file);

      if (file !== null) {
        await messageService
          .postMessageFile(formData)
          .then((res) => (imageUrl = res.fileUrl));
        setFile(null);
      } else {
        messageService.postMessage(message);
      }

      const msg = new Message(
        MessageType.CHAT,
        inputValue,
        profile.matricule,
        conversation.recepteur.matricule,
        formatDate(new Date()),
        imageUrl
      );

      stompClient.send("/app/chat.sendPrivateMessage", {}, JSON.stringify(msg));
      setMessages((prevMessages) => [...prevMessages, msg]);
      setInputValue("");
      fileUploadComponentRef.current.removeFileRef();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  function formatDate(date) {
    return format(date, "yyyy-MM-dd HH:mm:ss", { locale: fr });
  }
  /**
   * Incrit l'heure sous le message s'il date d'aujourd'hui, "Hier" si hier, et le jour et le mois si plus vieux.
   * @param {string} date
   * @author Clément Vaugoyeau
   */
  function formDate(date) {
    const time = date.includes("T") ? date.split("T")[1] : date.split(" ")[1];
    const times = time.split(":");

    if (date.substring(8, 10) == todayNowDate.substring(8, 10)) {
      return `${times[0]}:${times[1]}`;
    } else {
      /*else if (
      Number(date.substring(8, 10)) ===
      Number(todayNowDate.substring(8, 10)) - 1
    ) {
      return `Hier • ${times[0]}:${times[1]}`;
    }*/
      return `${formatDateDayMonthInLetters(date)} • ${times[0]}:${times[1]}`;
    }
  }

  /**
   * Formate la date recu par le back (exemple : 2023-10-26 14:46:41 en 14•46 jeudi 10 octobre)
   * @param {string} date
   * @author Clément Vaugoyeau
   */
  function formatDateDayMonthInLetters(date) {
    const month = {
      "01": "janv.",
      "02": "févr.",
      "03": "mars",
      "04": "avr.",
      "05": "mai",
      "06": "juin",
      "07": "juil.",
      "08": "août",
      "09": "sept.",
      10: "oct.",
      11: "nov.",
      12: "déc.",
    };
    const daysOfWeek = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];

    const dateParts = date.split("T")[0].split("-");
    const day = dateParts[2];
    const monthNumber = dateParts[1];
    const year = dateParts[0];
    const formattedDate = `${daysOfWeek[new Date(date).getDay()]} ${day} ${
      month[monthNumber]
    } ${year}`;
    return formattedDate;
  }

  return conversation != null ? (
    <div
      className={
        conversation != null
          ? "bg-white h-[80%] w-[80%] flex flex-col p-0 rounded-3xl cursor-auto"
          : "hidden"
      }
    >
      <div className="p-3 borderBottomChat flex items-center justify-between h-[15%]">
        <div className="flex items-center gap-3">
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={conversation.recepteur.picture.url}
            alt="Image de profil"
          />
          <p className="font-jakartaSans font-bold">
            {conversation.recepteur.firstName} {conversation.recepteur.lastName}
          </p>
        </div>
        {/* Suppression de la conversation */}
        <div className="flex justify-center items-center">
          <DropDown />
        </div>
      </div>
      <div
        ref={divRef}
        className="h-[70%] overflow-y-scroll borderBottomChat flex flex-col"
      >
        {messages.map((msg, index) =>
          msg.sender === profile.matricule ? (
            <div
              key={index}
              className="flex flex-col self-end max-w-[50%] mr-3 my-2"
            >
              <div className="p-3 bg-green-afpa-alert rounded-l-2xl rounded-tr-2xl text-white font-jakartaSans break-words">
                {msg.content}
                {<img src={msg.fileUrl} />}
              </div>
              <p className="font-jakartaSans text-[8px] text-grey-afpa text-right">
                {formDate(msg.date)}
              </p>
            </div>
          ) : (
            <div
              key={index}
              className="flex flex-col self-start max-w-[50%] ml-3 my-2"
            >
              <div className="p-3 bg-grey-afpa-light rounded-r-2xl rounded-tl-2xl text-black font-jakartaSans break-words">
                {msg.content}
                {<img src={msg.fileUrl} />}
              </div>
              <p className="font-jakartaSans text-[8px] text-grey-afpa text-left">
                {formDate(msg.date)}
              </p>
            </div>
          )
        )}
        <div className="divRef"></div>
      </div>
      <div className="flex justify-center items-center h-auto gap-8 px-5 py-8">
        <div htmlFor="" className="flex w-[100%]">
          <div className="search-bar w-full rounded-full">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              name="message"
              id="message"
              placeholder="Message..."
              className="rounded-full border border-gray-500 bg-white placeholder-gray-400 text-gray-500 appearance-none block font-jakartaSans pl-5 focus:outline-none w-[100%]"
            />
            <FileUploadComponent
              children={uploadFile}
              setFile={(uploadedFile) => {
                setFile(uploadedFile);
              }}
              ref={fileUploadComponentRef}
            />
          </div>
        </div>
        <ImageButton
          id="send-message-button"
          title="bouton envoyer message"
          src={sendButton}
          alt="Envoyer message"
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default MessageChat;
