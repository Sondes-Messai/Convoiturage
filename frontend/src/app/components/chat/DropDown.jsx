import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { PoubelleIcon } from "../../assets/icons/PoubelleIcon";
import { MenuPoint } from "../../assets/icons/MenuPoint";
import greenCheck from "../../assets/img/greenCheck.svg";
import Modal from "../Modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropDown = () => {
  const modalContent = (
    <div>
      <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
        Voulez-vous vraiment supprimer cette conversation ?
      </h2>
      <p className="font-jakartaSans text-sm text-grey-afpa mb-4">
        Cette action est irréversible et toutes les données associées à cette
        conversation seront définitivement perdues
      </p>
      <p className="font-jakartaSans text-grey-afpa-dark text-sm mb-4">
        Veuillez confirmer la suppression de cette conversation.
      </p>
      <hr className="w-3/4 mb-8" />
    </div>
  );

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);

  const menuItems = [
    {
      name: "Signaler",
      action: function () {
        console.log("signaler");
      },
      icon: "ErrorIcon",
      colour: "black",
    },
    {
      name: "Archiver",
      action: function () {
        setShowDeleteConfirmation(true);
      },
      icon: "PoubelleIcon",
      color: "text-red-alert",
    },
  ];

  const getIconComponent = (choice) => {
    switch (choice) {
      case "ErrorIcon":
        return (
          <ErrorIcon
            width="36px"
            height="36px"
            className="mr-4 fill-grey-afpa"
          />
        );
      case "PoubelleIcon":
        return (
          <PoubelleIcon
            width="36px"
            height="36px"
            className="mr-4 fill-red-alert"
          />
        );

      default:
        return null;
    }
  };
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className="hover:bg-gray-50 flex justify-center"
          title="dropdown button"
        >
          <MenuPoint
            width="36px"
            height="36px"
            className="fill-grey-afpa rotate-90 "
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-46 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {menuItems.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      onClick={item.action}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        `px-2 py-2 text-sm flex items-center ${item.color}`
                      )}
                    >
                      {getIconComponent(item.icon)}
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Modal
        isOpen={showDeleteConfirmation}
        children={modalContent}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={() => {
          setShowDeleteConfirmation(false);
          setShowSuccessDelete(true);
        }}
      />
      <Modal
        isOpen={showSuccessDelete}
        onCancel={() => setShowSuccessDelete(false)}
        isInfo={true}
      >
        <img src={greenCheck} alt="la conversation a été archivée" />
        <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-[15%]">
          La conversation a été supprimée avec succès.
        </h2>
      </Modal>
    </>
  );
};

export default DropDown;
