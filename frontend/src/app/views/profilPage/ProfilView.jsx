import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentPageBar from "../../components/utils/CurrentPageBar";
import ProfilComponent from "../../components/profile/ProfilComponent";
import ProfilContent from "../../components/profile/drawerContent/ProfilContent";
import userService from "../../services/userService";
import { formatProfil } from "../../components/utils/Outils";
import Drawer from "../../components/windows/Drawer";
import PasswordContent from "../../components/profile/drawerContent/PasswordContent";
import PreferenceContent from "../../components/profile/drawerContent/PreferenceContent";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signOut } from "../../redux-store/authenticationSlice";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { getEmail } from "../../services/tokenServices";
import carService from "../../services/CarService";

const Profil = () => {
  //initialisation des variables
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState();
  const [profil, setProfil] = useState([]);
  const [title, setTitle] = useState();
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);

  /**
   * méthode permettant de récupérer la voiture de l'utilisateur depuis son adresse email
   */
  const fetchCarsByUserEmail = async () => {
    try {
      const response = await carService.allCarsByUserEmail(getEmail());
      setCars(response);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des voitures de l'utilisateur :",
        error
      );
    }
  };

  /**
   * méthode permettant de récupérer les informations de profil à partir de l'adresse email de l'utilisateur
   */
  const getProfilLoad = async () => {
    try {
      const profil = await userService.getUserByEmailOrMatricule(getEmail());
      setProfil(formatProfil(profil));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du profil utilisateur :",
        error
      );
    }
  };

  /**
   * méthode permettant d'ouvrir la modale
   */
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  /**
   * méthode permettant de fermer la modale
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * méthode permettant d'archiver le compte de l'utilisateur et de le rediriger vers la page d'accueil
   */
  const handleDeleteAccount = async () => {
    userService
      .deleteByMailOrMatricule(profil.matricule)
      .then((response) => {
        navigate("/confirm/delete");
        dispatch(signOut());
      })
      .catch((err) => {
        toast.error("Une erreur est survenue!!");
      });
    setIsModalOpen(false);
  };

  const renderSwitch = (param) => {
    switch (param) {
      case 1:
        return (
          <ProfilContent
            profil={profil}
            getProfilLoad={getProfilLoad}
            setIsOpen={setIsOpen}
          />
        );
      case 2:
        return (
          <PasswordContent matricule={profil.matricule} setIsOpen={setIsOpen} />
        );
      case 3:
        return <PreferenceContent profil={profil} />;
      default:
        return null;
    }
  };

  /**
   * méthode se lançant lors de la création du composant
   */
  useEffect(() => {
    getProfilLoad();
    fetchCarsByUserEmail();
    return () => {};
  }, []);

  return (
    <div className="h-full">
      <CurrentPageBar text={"Vos informations"} />
      <div className="mt-3.5 flex flex-col justify-start items-center">
        <ProfilComponent
          className="group cursor-pointer h-20 w-1/3 rounded-2xl flex items-center p-3 hover:bg-grey-afpa-light"
          isProfil
          profile={profil}
          onClick={() => {
            setIsOpen(true);
            setContent(1);
            setTitle("Mon profil");
          }}
        />
        <ProfilComponent
          className="group cursor-pointer h-20 w-1/3 rounded-2xl flex items-center p-3 hover:bg-grey-afpa-light"
          label="Changer le mot de passe"
          onClick={() => {
            setIsOpen(true);
            setContent(2);
            setTitle("Le mot de passe");
          }}
        />
        <ProfilComponent
          className="group cursor-pointer h-20 w-1/3 rounded-2xl flex items-center p-3 hover:bg-grey-afpa-light"
          label="Modifier mes préférences"
          onClick={() => {
            setIsOpen(true);
            setContent(3);
            setTitle("Modifier mes préférences");
          }}
        />
        {profil.role && profil.role.label === "ROLE_USER" && (
          <ProfilComponent
            className="group cursor-pointer h-20 w-1/3 rounded-2xl flex items-center p-3 hover:bg-grey-afpa-light"
            label="Informations de mon véhicule"
            onClick={() => {
              navigate("/addCar", { state: { cars: cars } });
            }}
          />
        )}

        <hr className="h-1 w-1/4 my-2" />

        <div className="cursor-pointer h-14 w-1/3 rounded-2xl flex items-center p-3 hover:bg-[#f87171]/[.2] hover:text-[#cd5d5d]">
          <div
            onClick={handleOpenModal}
            className="font-jakartaSans ml-3"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleOpenModal();
              }
            }}
            type="button"
            tabIndex={0}
          >
            Archiver mon compte
          </div>
          <Modal
            isOpen={isModalOpen}
            onCancel={handleCloseModal}
            onConfirm={handleDeleteAccount}
          >
            <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
              Voulez-vous vraiment Archivé votre compte Kawaa ?
            </h2>
            <p className="font-jakartaSans text-sm text-grey-afpa mb-4 ">
              Toutes vos données et informations associées seront définitivement
              archivées et cette action ne pourra pas être annulée.
            </p>
            <p className="font-jakartaSans text-grey-afpa-dark text-sm mb-4 ">
              Veuillez confirmer la l'archivage de votre compte Kawaa.
            </p>
            <hr className="w-3/4 mb-8" />
          </Modal>
        </div>

        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title={"Mon profil"}>
          <div className="gradient h-14 w-full flex justify-between px-3 items-center">
            <span className="font-jakartaSans text-xl text-white">{title}</span>
            <button
              className="font-jakartaSans text-white"
              onClick={() => setIsOpen(false)}
              type="button"
              tabIndex={0}
            >
              Retour
            </button>
          </div>
          {renderSwitch(content)}
        </Drawer>
      </div>
    </div>
  );
};

export default Profil;
