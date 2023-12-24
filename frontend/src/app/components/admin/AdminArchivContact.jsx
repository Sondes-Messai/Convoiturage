import React, { useState } from "react";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import ModalButton from "../utils/button/ModalButton";
import Modal from "../Modal";
import apiBackEnd from "../../api/backend/api.Backend";

/**
 * Component Liste des formulaires de contact
 *
 * @author Hélène Dubourg
 */

function AdminArchivContact({
  contactForms,
  property,
  sortDirection,
  handleHeaderClick,
}) {
  const [idMessage, setIdMessage] = useState(0);
  const [active, setActive] = useState(0);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFichierModalOpen, setIsFichierModalOpen] = useState(false);
  const [previousResponses, setPreviousResponses] = useState([]);
  
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
    <>
      <table className="tsortDirection, pageIndex, pageSize, propertyable-auto w-full">
        <tbody>
          <tr className="bg-grey-afpa-light h-[40px] mb-4">
            <th
              className={`whitespace-nowrap cursor-pointer w-40`}
              onClick={() => handleHeaderClick("date")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "date"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  DATE
                </div>
                {property === "date" && (
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
                {property !== "date" && (
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
              onClick={() => handleHeaderClick("nom")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "nom"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  NOM
                </div>
                {property === "nom" && (
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
                {property !== "participants" && (
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
              onClick={() => handleHeaderClick("prenom")}
            >
              <div className="flex justify-center items-center">
                <div
                  className={`font-semibold text-left ${
                    property === "nom"
                      ? "text-green-afpa-alert"
                      : "text-green-afpa"
                  }`}
                >
                  PRENOM
                </div>
                {property === "prenom" && (
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
                {property !== "prenom" && (
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
                  MAIL
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
            <th className="w-16 text-green-afpa">MESSAGE</th>
            <th className="w-16 text-green-afpa">FICHIER</th>
          </tr>
          <tr className="h-[10px]"></tr>
          {Array.isArray(contactForms)? (contactForms.map((form) => (
            <tr key={`form-${form.id}`}>
              <th className="text-center font-jakartaSans font-normal">
                {`${form.createdDate.substring(
                  0,
                  4
                )}/${form.createdDate.substring(
                  5,
                  7
                )}/${form.createdDate.substring(8, 10)}`}
              </th>

              <th className="text-center font-jakartaSans font-normal">
                {form.name}
              </th>
              <th className="text-center font-jakartaSans font-normal">
                {form.firstName}
              </th>
              <th className="text-center font-jakartaSans font-normal">
                {form.email}
              </th>
              <th className="text-center font-jakartaSans font-normal">
                <ModalButton
                  className="text-violet-600"
                  onClick={() => {
                    setIsMessageModalOpen(true);
                    setActive(form.id);
                    setIdMessage(form.id);
                    handleMessageClick(form.id);
                    console.log(form.id);
                  }}
                >
                  {"Message"}
                </ModalButton>
              </th>
              {form.fileUrl ? (
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
                  <img className="width-[90%] rounded" src={form.fileUrl} />
                </th>
              ) : (
                <th></th>
              )}
            </tr>
          ))):(<p>Contact forms not available</p>)}
        </tbody>
      </table>
      <Modal
        isOpen={isMessageModalOpen}
        isInfo
        onCancel={() => setIsMessageModalOpen(!isMessageModalOpen)}
        width={"80"}
      >
        <div className="flex-col items-center cursor w-full h-full">
          <h1 className="font-jakartaSans text-lg text-grey-afpa-dark font-bold mb-4">
            <span className="font-normal text-sm">Message de</span>{" "}
            {contactForms.length && contactForms[active].firstName}{" "}
            {contactForms.length && contactForms[active].name}
          </h1>
          <h2 className="font-jakartaSans text-sm text-grey-afpa-dark mb-4">
            Type de problème :{" "}
            <span className="font-bold">
              {contactForms.length && contactForms[active].help}{" "}
            </span>
          </h2>
        </div>
        <p className="font-jakartaSans items-self-center text-grey-afpa-dark text-sm my-4">
          "{contactForms.length && contactForms[active].about}"
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
      </Modal>
      <Modal
        isOpen={isFichierModalOpen}
        isInfo
        onCancel={() => setIsFichierModalOpen(!isFichierModalOpen)}
        width={"80"}
      >
        <div className="flex-col items-center cursor w-4/5 ">
          <img src={contactForms.length && contactForms[active].fileUrl} />
        </div>
      </Modal>
    </>
  );
}

export default AdminArchivContact;
