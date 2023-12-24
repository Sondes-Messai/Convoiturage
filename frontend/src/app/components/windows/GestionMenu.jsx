import React, { useState } from "react";
import { BlockedIcon } from "../../assets/icons/BlockedIcon";
import { EditIcon } from "../../assets/icons/EditIcon";
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { MenuPoint } from "../../assets/icons/MenuPoint";
import { ValidIcon } from "../../assets/icons/ValidIcon";
import { ArchiveIcon } from "../../assets/icons/ArchiveIcon";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import userService from "../../services/userService";

function GestionMenu({ user, onClick, iconColor, className }) {
  const navigate = useNavigate();
  const [isModalDeletedOpen, setIsModalDeletedOpen] = useState(false);
  const [isConfirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [isModalBlockedOpen, setIsModalBlockedOpen] = useState(false);
  const [isConfirmBlockedModal, setConfirmBlockedModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const isArchived = user.status === "ARCHIVED";

  async function handleDeleteAccount() {
    if (user.status === "ARCHIVED") {
      setIsModalBlockedOpen(false);
      setIsBlocked(true);
      setConfirmBlockedModal(true);
      try {
        await userService.unblockUser(user.matricule);
      } catch (error) {
        console.log("Une erreur est survenue lors de l'unblock");
      } finally {
        navigate(`/admin/users`);
      }
    } else {
      try {
        try {
          await userService.deleteByMailOrMatricule(user.matricule);
        setIsModalDeletedOpen(false);
        setIsDeleted(true);
        setConfirmDeleteModal(true);
        } catch (error) {
          console.log("Une erreur est survenue lors de l'unblock");
        } finally {
          navigate(`/admin/archives/0`);
        }
      } catch (error) {
        setIsModalDeletedOpen(false);
        setIsDeleted(false);
        setConfirmDeleteModal(true);
        console.log("Une erreur est survenue", error);
      }
    }
  }

  async function blockAccount() {
    if (user.status === "BLOCKED") {
      setIsModalBlockedOpen(false);
      setIsBlocked(true);
      setConfirmBlockedModal(true);
      try {
        await userService.unblockUser(user.matricule);
      } catch (error) {
        console.log("Une erreur est survenue lors de l'unblock");
      } finally {
        navigate(`/admin/users`);
      }
    } else {
      setIsModalBlockedOpen(false);
      setIsBlocked(true);
      setConfirmBlockedModal(true);
      try {
        await userService.blockUser(user.matricule);
      } catch (error) {
        console.log("Une erreur est survenue lors de l'unblock");
      } finally {
        navigate(`/admin/archives/1`);
      }
    }
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
            onClick={() => navigate(`/admin/user/${user.matricule}`)}
          >
            <div className="w-1/4 mr-2">
              <EditIcon
                width="25px"
                height="25px"
                className="mr-2 fill-afpa-grey-dark group-hover:fill-rose-afpa"
              />
            </div>
            <div className="group-hover:text-rose-afpa">Modifier</div>
          </li>
          <li
            className="h-[60px] w-full px-8 flex items-center hover:bg-grey-afpa-light group"
            onClick={() => setIsModalDeletedOpen(true)}
          >
            <div className="w-1/4 mr-2">
              <ArchiveIcon
                width="25px"
                height="25px"
                className="mr-2 fill-afpa-grey-dark group-hover:fill-rose-afpa"
              />
            </div>
            <div className="group-hover:text-rose-afpa">
              {" "}
              {isArchived ? "Désarchiver" : "Archiver"}
            </div>
          </li>
          <li
            className="h-[60px] w-full px-8 flex items-center hover:bg-grey-afpa-light group"
            onClick={() => setIsModalBlockedOpen(true)}
          >
            <div className="w-1/4 mr-2">
              <BlockedIcon
                width="25px"
                height="25px"
                className="mr-2 fill-afpa-grey-dark group-hover:fill-rose-afpa"
              />
            </div>
            <div className="group-hover:text-rose-afpa">
              {user.status === "BLOCKED" ? "Débloquer" : "Bloquer"}
            </div>
          </li>
        </ul>
      </div>

      <Modal
        isOpen={isModalDeletedOpen}
        onCancel={() => setIsModalDeletedOpen(!isModalDeletedOpen)}
        onConfirm={handleDeleteAccount}
      >
        {isArchived ? (
          <>
            <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
              Voulez-vous vraiment désarchivé ce compte ?
            </h2>
            <p className="font-jakartaSans text-grey-afpa-dark text-sm my-4">
              Veuillez confirmer le désarchivage de ce compte.
            </p>
            <hr className="w-3/4 mb-8" />
          </>
        ) : (
          <>
            <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
              Voulez-vous vraiment archivé ce compte ?
            </h2>
            <p className="font-jakartaSans text-sm text-grey-afpa text-center font-normal mb-8">
              Toutes les données et informations associées seront conservées
              pendant une période de x temps, et cette action sera définitive et
              non réversible.
            </p>
            <p className="font-jakartaSans text-grey-afpa-dark text-sm my-4">
              Veuillez confirmer l'archivage de ce compte.
            </p>
            <hr className="w-3/4 mb-8" />
          </>
        )}
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
              L'archivage du compte a été effectuée avec succès.
            </p>
          </>
        ) : (
          <>
            <ErrorIcon width="60px" height="60px" />
            <p className="font-jakartaSans text-grey-afpa-dark text-center text-sm my-8">
              L'archivage du compte n'a pas pu être effectuée.
            </p>
          </>
        )}
      </Modal>

      <Modal
        isOpen={isModalBlockedOpen}
        onCancel={() => setIsModalBlockedOpen(!isModalBlockedOpen)}
        onConfirm={blockAccount}
      >
        <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
          {user.status === "BLOCKED"
            ? "Voulez-vous vraiment débloquer ce compte ?"
            : "Voulez-vous vraiment bloquer ce compte ?"}
        </h2>
        <p className="font-jakartaSans text-sm text-center text-grey-afpa font-normal mb-8">
          {user.status === "BLOCKED"
            ? "Cette action entraînera la réactivation de toutes les fonctionnalités associées à ce compte."
            : "Cette action entraînera la désactivation temporaire de toutes les fonctionnalités associées à ce compte."}
        </p>
        <p className="font-jakartaSans text-grey-afpa-dark text-sm my-4">
          {user.status === "BLOCKED"
            ? "Veuillez confirmer le déblocage de ce compte."
            : "Veuillez confirmer le blocage de ce compte."}
        </p>
        <hr className="w-3/4 mb-8" />
      </Modal>
      <Modal
        isOpen={isConfirmBlockedModal}
        onCancel={() => {
          setConfirmBlockedModal(false);
        }}
        isInfo
      >
        {isBlocked ? (
          <>
            <ValidIcon width="60px" height="60px" />
            <p className="font-jakartaSans text-grey-afpa-dark text-sm my-8">
              {user.status === "BLOCKED"
                ? "Le déblocage du compte a été effectué avec succès."
                : "Le blocage du compte a été effectué avec succès."}
            </p>
          </>
        ) : (
          <>
            <ErrorIcon width="60px" height="60px" />
            <p className="font-jakartaSans text-grey-afpa-dark text-sm my-8">
              {user.status === "BLOCKED"
                ? "Le déblocage du compte n'a pas pu être effectué."
                : "Le blocage du compte n'a pas pu être effectué."}
            </p>
          </>
        )}
      </Modal>
    </>
  );
}

export default GestionMenu;
