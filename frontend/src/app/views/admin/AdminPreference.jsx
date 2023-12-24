import React, { useEffect, useRef, useState } from "react";
import { URL_ADMIN_HOME } from "../../constants/urls/urlFrontEnd";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import PreferenceLine from "../../components/utils/PreferenceLine";
import preferencesService from "../../services/preferencesService";
import SpinnerComponent from "../../components/utils/SpinnerComponent";
import PreferenceForm from "../../components/preference/PreferenceForm";

const AdminPreference = () => {
  const [preferences, setPreferences] = useState([]);
  const preferencesRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   *Méthode permettant de charger la liste des préféreces
   *le status loading permet d'afficher ou non le loader
   */
  const loadPreferences = async () => {
    setIsLoading(true);
    const preferences = await preferencesService.getAll();
    preferencesRef.current = preferences;
    setPreferences(preferences);
    setIsLoading(false);
  };

  /**
   * useEffect méthode permettant d'appeler les méthodes au démmarrage du composant
   */
  useEffect(() => {
    loadPreferences();
  }, []);

  /**
   * méthode permettant de recharché la liste des préférences quand une préférence a été archivé
   * ou que la visibilité d'une préférence change
   */
  const handleUpdatePreference = async () => {
    try {
      await loadPreferences();
    } catch (error) {
      console.log(
        "Erreur lors du chargement des préférences après archivage :",
        error
      );
    }
  };

  // variable content permettant de faire de l'affichage conditionnel
  let content;

  //si le status est en loading afichage du loader
  if (isLoading) {
    content = <SpinnerComponent />;
  }
  //si la liste des préférences est vide, message l'indiquant
  else if (preferences.length === 0) {
    content = <p>Aucune préférence n'est disponible pour le moment.</p>;
  } else {
  /*si la liste n'est pas vide affichage de cette dernière en ordre ASC 
  et affichage seulement des préférences non archivées*/
    const filteredPreferences = preferences
      .filter((item) => item && !item.isArchived)
      .sort((a, b) => a.label.localeCompare(b.label));

    content = filteredPreferences.map((item, index) => (
      //composant correspondant à l'affichage d'une préférednce
      <PreferenceLine
        onUpdatePreference={handleUpdatePreference}
        key={index}
        isVisible={item.isVisible}
        icon={
          <img
            className="ml-5 my-3 justify-self-center"
            width="40px"
            height="40px"
            src={item.pictureUrl}
          />
        }
        name={item.label}
      />
    ));
  }

  return (
    <>
      <section className="antialiased font-jakartaSans text-dark-afpa mt-10">
        <div className="w-7/12  max-md:w-11/12 mx-auto rounded-lg border-gray-200">
          <Link to={URL_ADMIN_HOME} className="flex items-center group">
            <ArrowIcon
              className="rotate-180 mt-1 mr-1 fill-current  group-hover:text-rose-afpa"
              width="20px"
              height="20px"
            />
            <button className=" font-semibold font-plus-jakartaSans group-hover:text-rose-afpa ">
              Retour
            </button>
          </Link>
          <h6 className="text-center text-[20px] font-bold font-jakartaSans">
            La liste des préférences des utilisateurs
          </h6>
          {/* affichage selon la valeur du content */}
          <div className="flex flex-col items-center my-6">{content}</div>
        </div>
        <hr className="w-7/12  max-md:w-11/12 m-auto" />
        {/* composant du formulaire d'ajout d'une nouvelle compétence */}
        <PreferenceForm loadPreferences={loadPreferences} />
      </section>
    </>
  );
};

export default AdminPreference;
