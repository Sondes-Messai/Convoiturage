import React from "react";
import Modal from "./Modal";

const DeletePreferenceModal = ({ isOpen, onCancel, onConfirm }) => {
  const deleteSiteMessage = {
    confirmText: "Confirmer",
    cancelText: "Annuler"
  };

  return (
    <Modal isOpen={isOpen} isInfo={false} onCancel={onCancel} onConfirm={onConfirm} message={deleteSiteMessage}>
      <p>Êtes-vous sûr de vouloir supprimer cette préférence ?</p>
    </Modal>
  );
};

export default DeletePreferenceModal;
