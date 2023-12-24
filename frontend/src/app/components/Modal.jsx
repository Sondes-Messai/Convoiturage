
import React from "react";
import ModalButton from "./utils/button/ModalButton";


const Modal = ({ isOpen, children, isInfo, onCancel, onConfirm, message, width }) => isOpen && (
  <div className="fixed top-0 z-50 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-20">
    <div className={`bg-white max-sm:w-[50%] w-[${width}%] flex flex-col items-center p-6 rounded-3xl shadow-lg`}>
      {children}
      {!isInfo ? (
        <div className="flex justify-end">
          <ModalButton type="submit" onClick={onConfirm} id="bouton_success_modal" cas="success">
            {message?.confirmText || "Oui, je confirme"}
          </ModalButton>
          <ModalButton type="submit" onClick={onCancel} id="bouton_cancel_modal">
            {message?.cancelText || "Non, j'annule"}
          </ModalButton>
        </div>
      ) : (
        <div className="flex justify-end">
          <ModalButton type="submit" onClick={onCancel} id="bouton_close_modal">
            Fermer
          </ModalButton>
        </div>
      )}
    </div>
  </div>
);

export default Modal;


