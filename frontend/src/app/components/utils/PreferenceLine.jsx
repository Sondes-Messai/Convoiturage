import React, { useState, useRef } from "react";
import { PoubelleIcon, EditIcon } from "../../assets/icons/Icons";
import eye from "../../assets/img/eye.svg";
import noeye from "../../assets/img/noeye.svg";
import Button from "./button/Button";
import preferencesService from "../../services/preferencesService";
import Modal from "../Modal";
import { XIcon, CheckIcon } from "@heroicons/react/solid";

const PreferenceLine = ({ icon, name, onUpdatePreference, isVisible }) => {
  //initialisaton des constantes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInput = useRef(null);
  const MAX_IMAGE_SIZE_MB = 2; // La taille maximale autorisée en mégaoctets (2 Mo)

  /**
   * méthode permettant de rentrer en mode édition d'une préférence, permettant de changer l'icône
   */
  const toggleEditMode = () => {
    setSelectedImage(null);
    setIsEditMode(!isEditMode);
  };

  /**
   * méthode permettant d'afficher la modal
   */
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  /**
   * méthode permettant d'enlever la modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * méthode permettant de changer la visibilité d'une préférence
   * @param {} label qui correspond à l'id unique d'une préférence
   */
  const toogleVisibility = async (label) => {
    try {
      await preferencesService.visibilityChanged(label);
      console.log("Success du changement de la visibilité pour " + label);
      onUpdatePreference();
    } catch (error) {
      console.log(
        "Erreur lors du changement de la visibilité de la préférence :",
        error
      );
    }
  };
  /**
   * méthode qui permet de supprimer une préférence
   * @param {*} label qui correspond à l' id unique d'une préférence
   */
  const handleDeletePreference = async (label) => {
    // Fermer la modal de suppression
    setIsModalOpen(false);
    // // Suppression réelle sans utiliser window.confirm
    // try {
    //   // Effectuer la suppression réelle
    //   await preferencesService.deletePreference(label);
    //   console.log("Suppression réussie de la préférence " + label);
    //   onUpdatePreference();
    // } catch (error) {
    //   console.log("Erreur lors de la suppression de la préférence :", error);
    // }
    archiveChanged(label);
  };

  /**
   * méthode permettant d'archivé une préférence
   * @param {} label qui correspond à l'id unique d'une préférence
   */
  const archiveChanged = async (label) => {
    try {
      await preferencesService.archiveChanged(label);
      console.log("Success du changement de l'archivage pour " + label);
      onUpdatePreference();
    } catch (error) {
      console.log("Erreur lors de l'archivage de la préférence :", error);
    }
  };

  /**
   * méthode gérant le changement de l'image
   * @param {*} event
   */
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
        // Vérifiez si la taille du fichier est supérieure à 2 Mo
        alert(
          "L'image sélectionnée dépasse la taille maximale autorisée (2 Mo)."
        );
        // Réinitialisez l'entrée de fichier
        event.target.value = null;
      } else if (
        !file.type.includes("image/jpeg") &&
        !file.type.includes("image/png")
      ) {
        // Vérifiez si le type de fichier n'est ni JPEG ni PNG
        alert("Le format du fichier doit être JPEG ou PNG.");
        // Réinitialisez l'entrée de fichier
        event.target.value = null;
        toggleEditMode();
      } else {
        setSelectedImage(file);
      }
    }
  };

  /**
   * méthode permettant de sauvegarder le changement de l'image
   * @param {} label qui correspond à l'id unique d'une préférence
   */
  const handleSaveChanges = async (label) => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    console.log("formData", formData);
    console.log("label", label);
    try {
      await preferencesService.updateIcon(label, formData);
      console.log("Success du changement de l'icone pour " + label);
      onUpdatePreference();
    } catch (error) {
      console.log(
        "Erreur lors du changement de l'icone de la préférence :",
        error
      );
    } finally {
      toggleEditMode();
    }
  };

  /**
   * Méthode permattant de retourner un string en lowercase avec la première lettre en majuscule
   * @param {*} string chaine de caractères en entrée
   * @returns la chaine de caractères modifiée
   */
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="w-9/12 max-md:w-full flex shadow-lg rounded-full my-4 justify-between border border-grey-afpa-light">
      <div className="bg-grey-afpa-light rounded-l-3xl flex">
        <input
          type="file"
          accept="image/*"
          name="file"
          id="file"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          ref={fileInput}
        />
        {isEditMode ? (
          <>
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                className="mx-5 my-3 justify-self-center"
                width="40px"
                height="40px"
              />
            ) : null}
          </>
        ) : (
          <>
            {icon}
            <Button
              onClick={() => {
                toggleEditMode();
                fileInput.current.click();
              }}
            >
              <EditIcon width="20px" height="20px" className="opacity-50 ml-5" />
            </Button>
          </>
        )}
      </div>
      <div className="w-max flex items-start">
        <p className="self-center text-[16px] font-medium">
          {capitalizeFirstLetter(name)}
        </p>
      </div>
      <div className="flex items-center">
        <div className="eye-button border-l">
          {isEditMode ? (
            <XIcon
              onClick={toggleEditMode}
              className="w-7 h-7 mx-3 my-2 cursor-pointer opacity-50 hover:opacity-100"
            />
          ) : (
            <>
              {isVisible ? (
                <img
                  src={eye}
                  onClick={() => toogleVisibility(name)}
                  alt=""
                  className="w-7 h-7 mx-3 my-2 cursor-pointer opacity-50 hover:opacity-100"
                />
              ) : (
                <img
                  src={noeye}
                  onClick={() => toogleVisibility(name)}
                  alt=""
                  className="w-7 h-7 mx-3 my-2 cursor-pointer opacity-50 hover:opacity-100"
                />
              )}
            </>
          )}
        </div>
        <div className="bg-grey-afpa-light rounded-r-3xl flex hover:bg-red-100 cursor-pointer">
          {isEditMode ? (
            <Button onClick={() => handleSaveChanges(name)}>
              <CheckIcon className="mr-5 ml-4 my-5 text-red-icon" color="#cd5d5d" width="25px" height="25px" />
            </Button>
          ) : (
            <Button onClick={() => handleOpenModal()}>
              <PoubelleIcon className="mr-5 ml-4 my-5 text-red-icon" color="#cd5d5d" width="25px" height="25px" />
            </Button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onCancel={handleCloseModal}
        onConfirm={() => handleDeletePreference(name)}
      >
        <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
          Voulez-vous vraiment supprimer cette préférence ?
        </h2>
        <hr className="w-3/4 mb-8" />
      </Modal>
    </div>
  );
};

export default PreferenceLine;