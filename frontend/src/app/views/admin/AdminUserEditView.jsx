import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import FormTextInput from "../../components/form/FormTextInput";
import userService from "../../services/userService";
import { createValidationSchema } from "../../services/validationSchemaService";
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { ValidIcon } from "../../assets/icons/ValidIcon";
import UserUpdate from "../../models/UserUpdate";
import GreenButton from "../../components/utils/button/GreenButton";
import WhiteWithGreenBorderButton from "../../components/utils/button/WhiteWithGreenBorderButton";
import siteService from "../../services/siteService";

function AdminUserEditView() {
  const handleBack = () => {
    navigate(-1);
  };

  //constantes
  const { matricule } = useParams();
  const [userInfos, setUserInfos] = useState([]);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const [isValid, setValid] = useState(false);
  const [defaultPicture, setDefaultPicture] = useState(null);
  const [workSite, setWorkSite] = useState("");
  const [sites, setSites] = useState([]);
  const fileInput = useRef(null);
  const MAX_IMAGE_SIZE_MB = 2;

  //Utilisation d'un schema qui permet de faire des comparaison avec userInfos
  const validationSchema = createValidationSchema(userInfos);

  const updateProfil = (matricule, user) => {
    userService
      .updateUser(matricule, user)
      .then((res) => {
        setVisible(true);
        setValid(true);
        setTimeout(() => {
          setVisible(false);
        }, 5000);
      })
      .catch((err) => {
        setVisible(true);
        setValid(false);
        setTimeout(() => {
          setVisible(false);
        }, 5000);
      });
  };

  //Données relatives à formik
  const formik = useFormik({
    initialValues: {
      firstName: userInfos.firstName,
      lastName: userInfos.lastName,
      phone: userInfos.phone,
      mail: userInfos.mail,
      matricule: userInfos.matricule,
      picture: userInfos.picture,
      newPassword: "",
      confirmPassword: "",
      workSite: workSite || "",
      file: null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const user = new UserUpdate(
        values.firstName,
        values.lastName,
        values.phone,
        values.matricule,
        values.mail,
        values.picture,
        values.newPassword,
        values.workSite
      );
      const formData = new FormData();
      formData.append("matricule", matricule);
      formData.append("file", values.file);

      if (defaultPicture.startsWith("http")) {
        updateProfil(matricule, user);
      } else {
        updateProfil(matricule, user);
        userService.updateUserWithFile(formData);
      }
    },
  });

  /**
   * Méthode permettant de charger les informations du profil
   * utilisant le matricule pour la recherche
   */
  async function getProfilLoad() {
    await userService.getUserByEmailOrMatricule(matricule).then((res) => {
      if (res.site) {
        setWorkSite(res.site.town);
      }
      setUserInfos(res);
      setDefaultPicture(res.picture.url);
    });
  }

  /**
   * Méthode permettant de charger la liste des site afpa
   */
  async function getSiteAfpa() {
    await siteService.getAll().then((res) => {
      setSites(res);
    });
  }

  //Fonction se lançant au démarrage du composant
  useEffect(() => {
    getProfilLoad();
    getSiteAfpa();
    return () => {};
  }, []);

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

  return (
    <>
      <div className="mt-10 w-full h-full flex justify-center">
        <div className="w-3/4 flex flex-col">
          <div className="flex mt-2">
            <div className="flex  mx-[5%] absolute">
              <div className="w-24 h-24 relative flex mx-auto">
                <img
                  src={defaultPicture}
                  alt="image de profil utilisateur"
                  className=" rounded-full w-18 h-18"
                />
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
                <button
                  className="w-8 h-8 rounded-full bg-green-afpa absolute  bottom-2 right-0  flex justify-center items-center"
                  onClick={() => fileInput.current.click()}
                ></button>
              </div>
            </div>

            <div className="w-[50%] flex mx-auto mt-2">
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="ml-3 font-jakartaSans text-grey-afpa text-xs"
                >
                  Nom
                </label>
                <FormTextInput
                  name="lastName"
                  id="last_name"
                  className="w-full focus:outline-none bg-grey-afpa-light"
                  placeholder="Nom d'usage"
                  defaultValue={userInfos.lastName}
                  onChange={formik.handleChange}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="error">{formik.errors.lastName}</div>
                )}
              </div>
              <div className="w-1/2 ml-5">
                <label
                  htmlFor="firstName"
                  className="ml-3 font-jakartaSans text-grey-afpa text-xs"
                >
                  Prénom
                </label>
                <FormTextInput
                  name="firstName"
                  id="first_name"
                  className="w-full focus:outline-none bg-grey-afpa-light"
                  placeholder="Prénom"
                  defaultValue={userInfos.firstName}
                  onChange={formik.handleChange}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="error">{formik.errors.firstName}</div>
                )}
              </div>
            </div>
          </div>

          <div className="w-[90%] flex mx-auto mt-2">
            <div className="w-1/2">
              <label
                htmlFor="phone"
                className="ml-3 font-jakartaSans text-grey-afpa text-xs"
              >
                Numéro de mobile
              </label>
              <FormTextInput
                name="phone"
                id="phone"
                className="w-full focus:outline-none bg-grey-afpa-light"
                placeholder="06 00 00 00 00"
                defaultValue={userInfos.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error">{formik.errors.phone}</div>
              )}
            </div>
            <div className="w-1/2 ml-5">
              <label
                htmlFor="matricule"
                className="ml-3 font-jakartaSans text-grey-afpa text-xs"
              >
                Numéro matricule Afpa
              </label>
              <FormTextInput
                name="matricule"
                id="matricule"
                className="w-full focus:outline-none bg-grey-afpa-light"
                placeholder="Matricule AFPA"
                defaultValue={userInfos.matricule}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="w-[90%] flex mx-auto  mt-2">
            <div className="w-1/2">
              <label
                htmlFor="mail"
                className="ml-3 font-jakartaSans text-grey-afpa text-xs"
              >
                Email
              </label>
              <FormTextInput
                name="mail"
                id="mail"
                className="w-full focus:outline-none bg-grey-afpa-light"
                placeholder="xxxxx@xxxxx.com"
                defaultValue={userInfos.mail}
                onChange={formik.handleChange}
              />
              {formik.touched.mail && formik.errors.mail && (
                <div className="error">{formik.errors.mail}</div>
              )}
            </div>
            <div className="w-1/2 ml-5">
              <label
                htmlFor="workSite"
                className="ml-3 font-jakartaSans text-grey-afpa text-xs"
              >
                Site de travail régulier
              </label>
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
              {formik.touched.workSite && formik.errors.workSite && (
                <div className="error">{formik.errors.workSite}</div>
              )}
            </div>
          </div>
          <div className="w-[90%] flex mx-auto mt-2">
            <div className="w-1/2">
              <label
                htmlFor="newPassword"
                className="ml-3 font-jakartaSans text-grey-afpa text-xs"
              >
                Nouveau mot de passe
              </label>
              <div className="relative flex flex-col justify-center">
                <input
                  type="password"
                  id="newPassword"
                  className="signupInput px-3 py-2 placeholder-gray-400 outline-none border-none"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Mot de passe"
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="error">{formik.errors.newPassword}</div>
                )}
              </div>
            </div>
            <div className="w-1/2 ml-5">
              <label
                htmlFor="confirmPassword"
                className="ml-3 font-jakartaSans text-grey-afpa text-xs"
              >
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative flex flex-col justify-center">
                <input
                  type="password"
                  id="confirmPassword"
                  className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirmer le mot de passe"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  )}
              </div>
            </div>
          </div>
          <div className="w-full flex mt-10">
            <div className="w-1/2 flex justify-end">
              <WhiteWithGreenBorderButton
                onClick={handleBack}
                id="bouton_retour_admin_user_edit"
                type="button"
              >
                <span>Retour</span>
              </WhiteWithGreenBorderButton>
            </div>
            <div className="w-1/2 flex ml-5 justify-start">
              <GreenButton
                type="submit"
                onClick={formik.handleSubmit}
                id="admin_user_edit_save"
              >
                Enregistrer
              </GreenButton>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          isVisible
            ? "self-center flex w-1/2 h-1/4 rounded-t-3xl overflow-hidden"
            : "hidden"
        }
      >
        <div
          className={
            isValid
              ? "h-full w-[5px] bg-green-afpa-alert"
              : "h-full w-[5px] bg-red-alert"
          }
        ></div>
        <div
          className={
            isValid
              ? "grow h-full bg-green-afpa-alert/20 pt-10 pl-10 flex"
              : "grow h-full bg-red-alert/20 pt-10 pl-10 flex"
          }
        >
          <div className="flex flex-col">
            {isValid ? (
              <ValidIcon width="30px" height="30px" />
            ) : (
              <ErrorIcon width="30px" height="30px" />
            )}
          </div>
          <div className="flex flex-col">
            {isValid ? (
              <p className="font-jakartaSans text-green-afpa-alert font-bold ml-8">
                Les informations ont été modifiées avec succès.
              </p>
            ) : (
              <div>
                <p className="font-jakartaSans text-red-alert-dark font-bold ml-8">
                  Échec de modification de l'utilisateur
                </p>
                <p className="font-jakartaSans text-red-alert-dark ml-8 mt-3">
                  Veuillez vérifier les informations fournies et réessayer.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUserEditView;
