import React, { useState } from "react";
import apiBackEnd from "../../api/backend/api.Backend";

import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import ModalButton from "../utils/button/ModalButton";
import Modal from "../Modal";
import GestionMenuContactUs from "../windows/GestionMenuContactUs";

function AdminContactUsTable({
  messages,
  property,
  sortDirection,
  handleHeaderClick,
  condition,
}) {
  const [idMessage, setIdMessage] = useState(0);
  const [active, setActive] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFichierModalOpen, setIsFichierModalOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [previousResponses, setPreviousResponses] = useState([]);

  /**
   * récupération du texte saisi par l'utilisateur en guise de réponse
   * @param {*} e
   */
  const handleChange = (e) => {
    e.preventDefault();
    setResponse(e.target.value);
  };

  /**
   * envoie de la réponse dans le back pour enregistrement dans le bdd et envoie de mail
   * @param {*} id id du formulaire de contact
   */
  async function handleMessageModal() {
    console.log("id", idMessage);
    console.log("texte réponse", response);
    await apiBackEnd
      .post(`contact_us/update/${idMessage}`, response, {
        headers: {
          "Content-Type": "text/plain", // Indique que le contenu est du texte brut
        },
      })
      .then((res) => window.alert("Mail envoyé"));
    setIsMessageModalOpen(!isMessageModalOpen);
    setResponse("");
  }

  /**
   * récupère les réponses liées à un formulaire de contact
   * @param {*} id id du formulaire de contact
   */
  async function handleMessageClick(id) {
    await apiBackEnd.get(`contact_us_response/${id}`).then((res) => {
      setPreviousResponses(res.data);
    });
  }

  return (
    <React.Fragment>
      <table className="table-auto w-full">
        <tbody>
          <tr className="bg-grey-afpa-light h-[40px] mb-4">
            <th
              className={`whitespace-nowrap cursor-pointer w-40`}
              onClick={() => handleHeaderClick("name")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "name"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  NOM
                </div>
                {property === "name" && (
                  <div className="ml-2">
                    {sortDirection === "ASC" ? (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="-rotate-90 fill-grey-afpa"
                      />
                    ) : (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="rotate-90 fill-grey-afpa"
                      />
                    )}
                  </div>
                )}
                {property !== "name" && (
                  <ArrowIcon
                    width="15px"
                    height="15px"
                    className="-rotate-90 fill-grey-afpa ml-2"
                  />
                )}
              </div>
            </th>
            <th
              className={`whitespace-nowrap cursor-pointer w-40`}
              onClick={() => handleHeaderClick("firstName")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "firstName"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  PRÉNOM
                </div>
                {property === "firstName" && (
                  <div className="ml-2">
                    {sortDirection === "ASC" ? (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="-rotate-90 fill-grey-afpa"
                      />
                    ) : (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="rotate-90 fill-grey-afpa"
                      />
                    )}
                  </div>
                )}
                {property !== "firstName" && (
                  <ArrowIcon
                    width="15px"
                    height="15px"
                    className="-rotate-90 fill-grey-afpa ml-2"
                  />
                )}
              </div>
            </th>
            <th
              className={`whitespace-nowrap cursor-pointer w-60`}
              onClick={() => handleHeaderClick("mail")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "mail"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  EMAIL
                </div>
                {property === "mail" && (
                  <div className="ml-2">
                    {sortDirection === "ASC" ? (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="-rotate-90 fill-grey-afpa"
                      />
                    ) : (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="rotate-90 fill-grey-afpa"
                      />
                    )}
                  </div>
                )}
                {property !== "mail" && (
                  <ArrowIcon
                    width="15px"
                    height="15px"
                    className="-rotate-90 fill-grey-afpa ml-2"
                  />
                )}
              </div>
            </th>
            <th
              className={`whitespace-nowrap cursor-pointer w-60`}
              onClick={() => handleHeaderClick("createdDate")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "createdDate"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  DATE
                </div>
                {property === "createdDate" && (
                  <div className="ml-2">
                    {sortDirection === "ASC" ? (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="-rotate-90 fill-grey-afpa"
                      />
                    ) : (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="rotate-90 fill-grey-afpa"
                      />
                    )}
                  </div>
                )}
                {property !== "createdDate" && (
                  <ArrowIcon
                    width="15px"
                    height="15px"
                    className="-rotate-90 fill-grey-afpa ml-2"
                  />
                )}
              </div>
            </th>
            <th
              className="whitespace-nowrap cursor-pointer w-36"
              onClick={() => handleHeaderClick("type")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "type"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  TYPE
                </div>
                {property === "type" && (
                  <div className="ml-2">
                    {sortDirection === "ASC" ? (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="-rotate-90 fill-grey-afpa"
                      />
                    ) : (
                      <ArrowIcon
                        width="15px"
                        height="15px"
                        className="rotate-90 fill-grey-afpa"
                      />
                    )}
                  </div>
                )}
                {property !== "type" && (
                  <ArrowIcon
                    width="15px"
                    height="15px"
                    className="-rotate-90 fill-grey-afpa ml-2"
                  />
                )}
              </div>
            </th>
            <th className="whitespace-nowrap cursor-pointer w-36">
              <div className="flex justify-center items-center">
                <div className="font-semibold text-left text-green-afpa">
                  PROBLEME
                </div>
              </div>
            </th>
            <th className="whitespace-nowrap  w-36">
              <div className="flex justify-center items-center">
                <div className="font-semibold text-left text-green-afpa">
                  DOCUMENT
                </div>
              </div>
            </th>
            <th className="whitespace-nowrap cursor-pointer w-12">
              <div className="flex justify-center items-center">
                <div className="font-semibold text-left text-green-afpa"></div>
              </div>
            </th>
          </tr>
          <tr className="h-[10px]"></tr>

          {messages.map((msg, index) =>
            msg.status ? (
              <tr key={index}></tr>
            ) : (
              <tr key={index}>
                <th className="text-center font-jakartaSans">{msg.name}</th>
                <th className="text-center font-jakartaSans">{msg.firstName}</th>
                <th className="text-center font-jakartaSans font-normal">
                  {msg.email}{" "}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {msg.createdDate.substring(0, 10)}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {msg.help}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  <ModalButton
                    className="text-violet-600"
                    onClick={() => {
                      setIsMessageModalOpen(true);
                      setActive(index);
                      setIdMessage(msg.id);
                      handleMessageClick(msg.id);
                      console.log(msg.id);
                    }}
                  >
                    {"Message"}
                  </ModalButton>
                </th>
                {msg.fileUrl ? (
                  <th className="text-center font-jakartaSans font-normal">
                    <ModalButton
                      className="text-violet-600 underline"
                      onClick={() => {
                        setIsFichierModalOpen(true);
                        setActive(index);
                      }}
                    >
                      {"Fichier"}
                    </ModalButton>
                    <img className="width-[90%] rounded" src={msg.fileUrl} />
                  </th>
                ) : (
                  <th></th>
                )}
                <th className="relative w-16 justify-center">
                  <GestionMenuContactUs
                    onClick={() => {
                      if (activeMenu === null) {
                        setActiveMenu(index);
                      } else {
                        setActiveMenu(null);
                      }
                    }}
                    messageId={msg.id}
                    setActiveMenu={setActiveMenu}
                    iconColor={activeMenu == index ? "fill-green-afpa" : ""}
                    className={
                      activeMenu == index
                        ? "absolute right-10 top-5 w-[175px] bg-white shadow-lg rounded-xl ml-2"
                        : "hidden"
                    }
                  />
                </th>
              </tr>
            )
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isMessageModalOpen}
        onCancel={() => setIsMessageModalOpen(!isMessageModalOpen)}
        onConfirm={handleMessageModal}
        width={"80"}
      >
        <div className="flex-col items-center cursor w-full h-full">
          <h1 className="font-jakartaSans text-lg text-grey-afpa-dark font-bold mb-4">
            <span className="font-normal text-sm">Message de</span>{" "}
            {messages.length && messages[active].firstName}{" "}
            {messages.length && messages[active].name}
          </h1>
          <h2 className="font-jakartaSans text-sm text-grey-afpa-dark mb-4">
            Type de problème :{" "}
            <span className="font-bold">
              {messages.length && messages[active].help}{" "}
            </span>
          </h2>
        </div>
        <p className="font-jakartaSans items-self-center text-grey-afpa-dark text-sm my-4">
          "{messages.length && messages[active].about}"
        </p>
        <hr className="w-3/4 mb-8" />
        {previousResponses.length > 0 ? (
          <>
            <h2 className="font-jakartaSans text-sm text-grey-afpa-dark mb-4">
              Réponses :{" "}
            </h2>
            {previousResponses.map((res, index) => (
              <p
                key={index}
                className="font-jakartaSans items-self-center text-grey-afpa-dark text-sm my-4"
              >
                {res.date.substring(0, 10)} : {res.content}
              </p>
            ))}
          </>
        ) : (
          <p className="font-jakartaSans items-self-center text-grey-afpa-dark text-sm my-4">
            Personne n'a répondu à ce formulaire
          </p>
        )}
        <hr className="w-3/4 mb-8" />
        <div>
          <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font mb-4">
            Votre réponse par mail à{" "}
            <span className="font-bold">
              {messages.length && messages[active].email}
            </span>
          </h2>

          <textarea
            className="w-[700px] h-[200px] rounded-lg"
            placeholder=" Tapez votre réponse ici..."
            value={response}
            onChange={handleChange}
          ></textarea>
          <hr className="w-3/4 mb-8" />
        </div>
      </Modal>

      <Modal
        isOpen={isFichierModalOpen}
        isInfo
        onCancel={() => setIsFichierModalOpen(!isFichierModalOpen)}
        width={"80"}
      >
        <div className="flex-col items-center cursor w-4/5 ">
          <img src={messages.length && messages[active].fileUrl} />
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default AdminContactUsTable;
