import React, { useEffect, useState } from "react";
import { BlockedIcon } from "../../assets/icons/BlockedIcon";
import { EditIcon } from "../../assets/icons/EditIcon";
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { MenuPoint } from "../../assets/icons/MenuPoint";
import { ValidIcon } from "../../assets/icons/ValidIcon";
import { ArchiveIcon } from "../../assets/icons/ArchiveIcon";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import contactUsService from "../../services/contactUsService";
import apiBackEnd from "../../api/backend/api.Backend";

function GestionMenuContactUs({
  onClick,
  iconColor,
  className,
  messageId,
  setActiveMenu,
}) {
  const navigate = useNavigate();
  const [isModalDeletedOpen, setIsModalDeletedOpen] = useState(false);
  const [isConfirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDeleteAccount() {
    contactUsService.deleteById(messageId);
    console.log("! le fichier est suprimmé de la BDD non archivé !");
    setIsModalDeletedOpen(!isModalDeletedOpen);
  }
  function handleDeleteAccount() {
    contactUsService.deleteById(messageId);
    console.log("! le fichier est suprimmé de la BDD non archivé !");

    setIsModalDeletedOpen(!isModalDeletedOpen);
  }

  return (
    <>
      <MenuPoint
        width="30px"
        height="30px"
        onClick={onClick}
        className={iconColor}
      ></MenuPoint>

      <div className={className}>
        <ul className="flex flex-col items-center">
          <li
            className="h-[60px] w-full px-8 flex items-center hover:bg-grey-afpa-light group"
            onClick={() => {
              setIsModalDeletedOpen(true);
              setActiveMenu(null);
            }}
          >
            <div className="w-1/4 mr-2">
              <ArchiveIcon
                width="25px"
                height="25px"
                className="mr-2 fill-afpa-grey-dark group-hover:fill-rose-afpa"
              />
            </div>
            <div className="group-hover:text-rose-afpa">
              Archiver
            </div>
          </li>
        </ul>
      </div>

      <Modal
        isOpen={isModalDeletedOpen}
        onCancel={() => setIsModalDeletedOpen(!isModalDeletedOpen)}
        onConfirm={() => {
          apiBackEnd.post(`contact_us/archiv/${messageId}`).then(() => {
            setIsModalDeletedOpen(!isModalDeletedOpen);
            navigate(`../admin/archives/4`)
          });
        }}
      >
        <div>
          <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
            Voulez-vous vraiment archiver ce message ?
          </h2>
          <p className="font-jakartaSans text-sm text-grey-afpa text-center font-normal mb-8">
            Toutes les données et informations associées seront conservées
            pendant une période de x temps. Cette action sera définitive et non
            réversible.
          </p>
          <p className="font-jakartaSans text-grey-afpa-dark text-sm mt-16">
            Veuillez confirmer l'archivage de ce message.
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={isConfirmDeleteModal}
        onCancel={() => {
          setConfirmDeleteModal(false);
        }}
        isInfo
      >
        {isDeleted ? (
          <>
            <ValidIcon width="60px" height="60px" />
            <p className="font-jakartaSans text-grey-afpa-dark text-center text-sm my-8">
              L'archivage du message a été effectuée avec succès.
            </p>
          </>
        ) : (
          <>
            <ErrorIcon width="60px" height="60px" />
            <p className="font-jakartaSans text-grey-afpa-dark text-center text-sm my-8">
              L'archivage du message n'a pas pu être effectuée.
            </p>
          </>
        )}
      </Modal>
    </>
  );
}

export default GestionMenuContactUs;
