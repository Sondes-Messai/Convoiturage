import React, { createRef, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import FormTextInput from "../../form/FormTextInput";
import GreenButton from "../../utils/button/GreenButton";
import DropDownInputFieldSearch from "./../../form/DropDownInputFieldSearch";
import siteService from "../../../services/siteService";
import userService from "../../../services/userService";
import { setToken } from "../../../services/tokenServices";
import { ValidIcon } from "../../../assets/icons/ValidIcon";
import { ErrorIcon } from "../../../assets/icons/ErrorIcon";
import { userProfilUpdateSchema } from "../../../services/validationSchemaService";

function ProfilContent({ profil, getProfilLoad, setIsOpen }) {
  const file = createRef();
  const [sites, setSite] = useState([]);
  let workSite = "";
  const [updated, setUpdated] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const [defaultPicture, setDefaultPicture] = useState(profil.picture);
  const fileInput = useRef(null);
  const MAX_IMAGE_SIZE_MB = 2;

  /**
   * Méthode permettant de charger les informations du profil
   * utilisant le matricule pour la recherche
   */
  const getSiteAfpa = async () => {
    const data = await siteService.getAll();
    const sitesVisibled = data.filter((item) => item.visibility === true);
    setSite(sitesVisibled);
  };

  useEffect(() => {
    getSiteAfpa();
  }, []);

  /**
   * Méthode qui recupere la varibale du composant DropDownInputFieldSearch
   * et l'inclut dans formik
   *  @param {*} value
   */
  const handleDropDownInput = (value) => {
    formik.values.workSite = value;
  };

  //Utilisation d'un schema qui permet de faire des comparaison avec userInfos
  const validationSchema = userProfilUpdateSchema(profil);

  /**
   * méthode permettant de mettre à jour l'email, le numéro de téléphone ainsi que le site afpa de l'utilisateur
   * @param {*} matricule matricule de l'utilisateur à mettre à jour
   * @param {*} profilDto données à envoyer au back
   */
  const profilUpdate = async (matricule, profilDto) => {
    await userService;
    userService
      .updateUser(matricule, profilDto)
      .then((res) => {
        setToken(res);
        setUpdated(true);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setUpdated(false);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 5000);
      })
      .finally(() => {
        getProfilLoad();
        setIsOpen(false)
      });
  };

   /**
   * méthode gérant le changement de l'image
   * @param {*} e
   */
   const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
        alert(
          "L'image sélectionnée dépasse la taille maximale autorisée (2 Mo)."
        );
        e.target.value = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          formik.setFieldValue("file", selectedFile); // Utilisez setFieldValue de formik ici
          setDefaultPicture(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: profil.firstName,
      lastName: profil.lastName,
      phone: profil.phone,
      mail: profil.mail,
      matricule: profil.matricule,
      workSite: profil.site ? profil.site.town : "",
      password: "",
      picture: profil.picture,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("Formulaire soumis avec les valeurs :", values);
      const formData = new FormData();
      formData.append("matricule", profil.matricule);
      formData.append("file", values.file);
      if (defaultPicture.startsWith("http")) {
        profilUpdate(profil.matricule, values);
      } else {
        try {
          await userService.updateUserWithFile(formData);
        } catch (error) {
          console.log("Erreur lors de la odification de la photo :", error);
        } finally {
          profilUpdate(profil.matricule, values);
        }
      }
    },
  });

  return (
    <div className="flex flex-col p-12">
      <div
        className={isVisible ? "self-center flex h-1/4 rounded-full" : "hidden"}
      >
        <div
          className={
            updated
              ? "h-full w-[5px] bg-green-afpa-alert"
              : "h-full w-[5px] bg-red-alert"
          }
        ></div>
        <div
          className={
            updated
              ? "grow h-full bg-green-afpa-alert/20 pt-10 pl-10 flex"
              : "grow h-full bg-red-alert/20 pt-10 pl-10 flex"
          }
        >
          <div className="flex flex-col">
            {updated ? (
              <ValidIcon width="30px" height="30px" />
            ) : (
              <ErrorIcon width="30px" height="30px" />
            )}
          </div>
          <div className="flex flex-col">
            {updated ? (
              <p className="font-jakartaSans text-green-afpa-alert font-bold ml-8">
                Le profil a été mis à jour.
              </p>
            ) : (
              <div>
                <p className="font-jakartaSans text-red-alert-dark font-bold ml-8">
                  Échec lors de la mise à jour du profil.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 rounded-full flex justify-end items-end">
            <img
              src={defaultPicture}
              alt="image de profil utilisateur"
              className=" rounded-full w-18 h-18"
            />
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-green-afpa absolute flex justify-center items-center"
              onClick={() => fileInput.current.click()}
            ></button>
            <input
              type="file"
              accept="image/*"
              name="file"
              id="file"
              onChange={(event) => {
                handleImageChange(event);
              }}
              style={{ display: "none" }}
              ref={fileInput}
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="w-56">
            <label
              htmlFor="firstName"
              className="ml-3 font-jakartaSans text-grey-afpa text-xs"
            >
              Prénom
            </label>
            <FormTextInput
              disabled
              name="firstName"
              id="firstName"
              className="w-40 focus:outline-none bg-grey-afpa-light"
              placeholder="Nom d'usage"
              defaultValue={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="w-56">
            <label
              htmlFor="lastName"
              className="ml-3 font-jakartaSans text-grey-afpa text-xs"
            >
              Nom
            </label>
            <FormTextInput
              disabled
              name="lastName"
              id="lastName"
              className="w-40 focus:outline-none bg-grey-afpa-light"
              placeholder="Prénom"
              defaultValue={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error">{formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="ml-3 font-jakartaSans text-grey-afpa text-xs"
          >
            Numéro de mobile
          </label>
          <FormTextInput
            name="phone"
            id="phone"
            className="w-96 focus:outline-none bg-grey-afpa-light"
            placeholder="06 00 00 00 00"
            defaultValue={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="mail"
            className="ml-3 font-jakartaSans text-grey-afpa text-xs"
          >
            Email
          </label>
          <FormTextInput
            name="mail"
            id="mail"
            className="w-96 focus:outline-none bg-grey-afpa-light"
            placeholder="xxxxx@xxxxx.com"
            defaultValue={formik.values.mail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mail && formik.errors.mail ? (
            <div className="error">{formik.errors.mail}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="matricule"
            className="ml-3 font-jakartaSans text-grey-afpa text-xs"
          >
            Numéro matricule Afpa
          </label>
          <FormTextInput
            name="matricule"
            id="matricule"
            className="w-96 focus:outline-none bg-grey-afpa-light"
            placeholder="Matricule Afpa"
            defaultValue={formik.values.matricule}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
          />
          {formik.touched.matricule && formik.errors.matricule ? (
            <div className="error">{formik.errors.matricule}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="workSite"
            className="ml-3 font-jakartaSans text-grey-afpa text-xs"
          >
            Site de travail régulier
          </label>
          {/* <DropDownInputFieldSearch
            placeholder={profil.site ? profil.site.town : ""}
            data={sites}
            passInput={handleDropDownInput}
          /> */}
          <select
            id="workSite"
            value={formik.values.workSite}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full focus:outline-none bg-grey-afpa-light rounded-3xl px-3 py-2 border border-gray-300 appearance-none focus:border-blue-400"
          >
            <option value="" disabled>
              {workSite}
            </option>
            {sites.map((el) => (
              <option key={el.id} value={el.town}>
                {el.town}
              </option>
            ))}
          </select>
          {formik.touched.workSite && formik.errors.workSite ? (
            <div className="error">{formik.errors.workSite}</div>
          ) : null}
        </div>
        <div className="flex justify-center items-center mt-8">
          <GreenButton
            type="submit"
            cas="isCO"
            id="bouton_modification_profil_user"
          >
            Enregistrer
          </GreenButton>
        </div>
      </form>
    </div>
  );
}

export default ProfilContent;
