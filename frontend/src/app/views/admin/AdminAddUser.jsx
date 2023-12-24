import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import User from "../../models/User";
import userService from "../../services/userService";
import siteService from "../../services/siteService";
import { NAME_PHONE_MAIL_MATRICULE_WORKSITE_SCHEMA } from "../../services/validationSchemaService"
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { ValidIcon } from "../../assets/icons/ValidIcon";
import DropDownInputFieldSearch from "../../components/form/DropDownInputFieldSearch";

const AdminAddUser = () => {
  const [isValid, setValid] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [sites, setSite] = useState([])

  useEffect(() => {
    (async function getSiteAfpa() {
      const data = await siteService.getAll();
      const sitesVisibled = data.filter(item => item.visibility === true)
      setSite(sitesVisibled);

    })();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const validationSchema = NAME_PHONE_MAIL_MATRICULE_WORKSITE_SCHEMA

  const handleComplete = async (updatedUser) => {
    try {
      const mdpUser = await userService.registerUserAsAdmin(updatedUser);
      console.log("Création de l'utilisateur " + mdpUser);
      setVisible(true);
      setValid(true);
    } catch (error) {
      console.log("Erreur lors de la création de l'utilisateur :", error);
      setVisible(true);
      setValid(false);
    }
  };

  const handleDropDownInput = (value) => {
    formik.values.workSite = value
  };
  
  const [user] = useState(new User());

  const formik = useFormik({
    initialValues: {
      mail: user.mail || "",
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      phone: user.phone || "",
      matricule: user.matricule || "",
      workSite: user.workSite || "",
    },
    validationSchema,
    onSubmit: values => {
      handleComplete(values)
    },
  });

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="w-full justify-center flex flex-col items-center mt-3">
        <h1 className="text-3xl font-jakartaSans text-dark-afpa font-bold mb-2">
          Ajouter un nouvel utilisateur
        </h1>
        <div className="flex-grid w-4/12">
          <p className="justify-self-end   text-dark-afpa text-sm mb-6 font-jakartaSans">
            *Champs obligatoires
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} >
        <div className="flex flex-col gap-x-2 items-center content">
          <div className="mb-3">
            <input
              type="mail"
              id="mail"
              value={formik.values.mail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input-preference w-full  px-3 py-3 mt-1 placeholder-gray-400"
              placeholder="Identifiant*"
            />
            {formik.touched.mail && formik.errors.mail && (
              <div className="error">{formik.errors.mail}</div>
            )}
          </div>
          <div className="mb-3 flex space-x-5 namefield">
            <div className="namefieldInput w-1/2">
              <input
                type="text"
                id="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input-preference w-full  px-3 py-3 mt-1 placeholder-gray-400"
                placeholder="Prénom"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="namefieldInput w-1/2 flex-end">
              <input
                type="text"
                id="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input-preference w-full  px-3 py-3 mt-1  placeholder-gray-400"
                placeholder="Nom d'usage*"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="error">{formik.errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input-preference w-full  px-3 py-3 mt-1 placeholder-gray-400"
              placeholder="Numéro mobile*"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="matricule"
              value={formik.values.matricule}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input-preference w-full px-3 py-3 mt-1 placeholder-gray-400"
              placeholder="Matricule Afpa*"
            />
            {formik.touched.matricule && formik.errors.matricule && (
              <div className="error">{formik.errors.matricule}</div>
            )}
          </div>
          <div className="mb-3">

            <DropDownInputFieldSearch placeholder={"Site de travail régulier"} data={sites} passInput={handleDropDownInput} />
            {formik.touched.workSite && formik.errors.workSite && (
              <div className="error">{formik.errors.workSite}</div>
            )}
          </div>
          <div className="bottomChoix flex justify-center gap-x-5">
            <button
              className="btnKawaaGreen  text-white py-2 px-4"
              type="submit">
              <span>Enregistrer</span>
            </button>
            <button
              className="rounded-full duration-300 transition-all border  border-green-afpa text-center shadow-lg shadow-green text-green-afpa font-normal hover:bg-green-afpa  hover:text-white  py-2 px-10 "
              onClick={() => navigate(-1)}>
              Retour
            </button>
          </div>
        </div>

      </form>

      <div className={`absolute bottom-20 self-center w-1/2 h-1/6 rounded-t-3xl overflow-hidden ${isVisible ? "flex" : "hidden"}`}>
        <div className={`h-full w-[5px] ${isValid ? "bg-green-afpa-alert" : "bg-red-alert"}`}>

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
                Un nouvel utilisateur a été créé avec succès:
                <span
                  className="font-medium"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/admin/user/${formik.values.matricule}`)
                  }
                >
                  consulter l'utilisateur.
                </span>
              </p>
            ) : (
              <div>
                <p className="font-jakartaSans text-red-alert-dark font-bold ml-8">
                  Échec de création de l'utilisateur
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
  )
};

export default AdminAddUser;
