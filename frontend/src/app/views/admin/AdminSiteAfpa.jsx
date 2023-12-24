import React, { useEffect, useState } from "react";
import { URL_ADMIN_HOME } from "../../constants/urls/urlFrontEnd";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import InputClear from "../../components/utils/input/InputClear";
import DropDownInputVariant from "../../components/form/DropDownInputVariant";
import SiteAfpaLine from "../../components/utils/SiteAfpaLine";
import GreenButton from "../../components/utils/button/GreenButton";
import siteService from "../../services/siteService";
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { ValidIcon } from "../../assets/icons/ValidIcon";
import { useFormik } from "formik";
import { SITE_ADRESS_TOWN_REGION_ZIPCODE_COUNTRY } from "../../services/validationSchemaService";
import DeleteSiteModal from "../../components/DeleteSiteModal";


const AdminSiteAfpa = () => {
  const villes = [{ id: 1, nom: 'Lille' }, { id: 2, nom: 'Roubaix' }, { id: 3, nom: 'Tourcoing' }]
  const regions = [{ id: 1, nom: 'Hauts-de-France' }, { id: 2, nom: 'Normandie' }]
  const [sites, setSite] = useState([])
  const [isValid, setValid] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [siteIdToDelete, setSiteIdToDelete] = useState(null);



  //Méthode pour surligner la croix de fermeture du message apres la validation
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    /**
   * Méthode permettant de charger la liste des site afpa
   */
    (async function getSiteAfpa() {
      const data = await siteService.getAll();
      setSite(data);

    })();
  }, []);


  const updateVisibility = (prefVisible, id, site) => {
    const siteUpdated = { ...site, visibility: prefVisible }
    siteService.updateVisibility(id, siteUpdated)
  }

  const deleteById = (id) => {
    setSiteIdToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (siteIdToDelete) {
      siteService.deleteById(siteIdToDelete);
      const updatedSites = sites.filter((site) => site.id !== siteIdToDelete);
      setSite(updatedSites);
      setSiteIdToDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setSiteIdToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleComplete = async (newSite) => {
    try {
      const data = await siteService.registerSite(newSite);
      (async function getSiteAfpa() {
        const data = await siteService.getAll();
        setSite(data);
        
      })();

      console.log("Création du nouveau site" + data);
      setVisible(true);
      setValid(true);
    } catch (error) {
      console.log("Erreur lors de la création de l'utilisateur :", error);
      setVisible(true);
      setValid(false);
    }
  };

  const validationSchema = SITE_ADRESS_TOWN_REGION_ZIPCODE_COUNTRY

  const formik = useFormik({
    initialValues: {
      name: "",
      visibility: true,
      adress: "",
      town: "",
      region: "",
      zipCode: "",
      country: "",
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      handleComplete(values)
      console.log(values)
      
    },

  });

   const handleInputValue = (id, value) => {
    formik.values[id] = value;
  };

  return (
    <section className="antialiased font-jakartaSans text-dark-afpa mt-10 mb-20">
      <div className="w-7/12  max-md:w-11/12 mx-auto rounded-lg border-gray-200">
        <Link to={URL_ADMIN_HOME} className="flex items-center group">
          <ArrowIcon
            className="rotate-180 mt-1 mr-1 fill-current  group-hover:text-rose-afpa"
            width="20px"
            height="20px"
          />
          <button className="font-semibold font-plus-jakartaSans group-hover:text-rose-afpa ">
            Retour
          </button>
        </Link>
        <h6 className="text-center text-[20px] font-bold font-jakartaSans">
          La liste des sites Afpa{" "}
        </h6>
        <div className="flex flex-col items-center my-6">

          {sites.map(site => <SiteAfpaLine key={site.id} site={site} handleChange={formik.handleChange} setVisibility={updateVisibility} deleteOne={deleteById} />)}
          {isDeleteModalVisible && ( <DeleteSiteModal isOpen={isDeleteModalVisible} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm} />)}
          

        </div>
      </div>
      <hr className="w-7/12  max-md:w-11/12 m-auto border-grey-afpa-light" />
      
      <div className="w-7/12 max-md:w-11/12  mx-auto rounded-lg border-gray-200">
        <h5 className="text-left  my-4 text-[20px] font-bold title-pref">
          Ajouter un site Afpa
        </h5>
        <form onBlur={formik.handleBlur} onChange={formik.handleChange} onSubmit={formik.handleSubmit}  >
          <div className="shadow-custom rounded-2xl flex flex-col border  items-center mb-24">
            <div className="w-7/12 max-md:w-11/12  my-6">

              <InputClear label={"Nom de l'entreprise"} name={"name"} passValue={handleInputValue} />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
              <InputClear label={"Adresse"} name={"adress"} passValue={handleInputValue} />
              {formik.touched.adress && formik.errors.adress && (
                <div className="error">{formik.errors.adress}</div>
              )}

              <div className="grid grid-cols-2 gap-x-5 max-md:grid-cols-1">
                <DropDownInputVariant label={"Ville"} name={"town"} passValue={handleInputValue} data={villes} placeholder={"Ville"} />


                <DropDownInputVariant label={"Région"} name={"region"} passValue={handleInputValue} data={regions} />
                {formik.touched.region && formik.errors.region && (
                  <div className="error">{formik.errors.region}</div>)}
                {formik.touched.town && formik.errors.town && (
                  <div className="error">{formik.errors.town}</div>
                )}


              </div>
              <InputClear label={"Code Postal"} name={"zipCode"} passValue={handleInputValue} />
              {formik.touched.zipCode && formik.errors.zipCode && (
                <div className="error">{formik.errors.zipCode}</div>
              )}
              <InputClear label={"Pays"} name={"country"} passValue={handleInputValue} />
              {formik.touched.country && formik.errors.country && (
                <div className="error">{formik.errors.country}</div>
              )}

              <div className="flex justify-center">
                <GreenButton
                  type="submit"
                  id="sites_save-admin"
                  cas="with-m-y"
                >Enregistrer
                </GreenButton>

              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
      <div className={`absolute bottom-15 self-center w-1/2 h-[8rem] rounded-t-3xl overflow-hidden ${isVisible ? "flex" : "hidden"}`}>
        <div className={`h-full justify-self-center w-[5px] ${isValid ? "bg-green-afpa-alert" : "bg-red-alert"}`}>

        </div>
        <div className={`grow h-full flex pt-10 pl-10 ${isValid ? "bg-green-afpa-alert/20" : "bg-red-alert/20"}`}>

          <button className={`pointer ${isValid ? "hover:text-green-afpa" : "hover:text-red-500"}`} onMouseEnter={handleMouseEnter} onClick={() => setVisible(false)}
            onMouseLeave={handleMouseLeave}>
            {isHovered ? <ErrorIcon className={`absolute right-1 top-1 fill-current ${isValid ? "text-green-afpa" : "text-red-500"}`} width="35px" height="35px" /> :
              <CloseIcon className={`absolute right-0 top-1 fill-current ${isValid ? "text-green-afpa" : "text-red-500"}`} width="40px" height="40px" />
            }
          </button>
          <div className="flex flex-col">
            {isValid ? (
              <ValidIcon width="30px" height="30px" />
            ) : (
              <ErrorIcon className="fill-current text-red-500" width="30px" height="30px" />
            )}
          </div>
          <div className="flex flex-col">
            {isValid ? (
              <p className="font-jakartaSans text-green-afpa-alert font-bold ml-8">
                Un nouveau site a été créé avec succès:
                </p>
            ) : (
              <div>
                <p className="font-jakartaSans text-red-alert-dark font-bold ml-8">
                  Échec de création du site
                </p>
                <p className="font-jakartaSans text-red-alert-dark ml-8 mt-3">
                  Veuillez vérifier les informations fournies et réessayer.
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );


};

export default AdminSiteAfpa;