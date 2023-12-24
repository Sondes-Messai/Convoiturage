import React, { useState } from "react";
import { useFormik } from "formik";
import userService from "../../../services/userService";
import { NEW_PASSWORD_SCHEMA } from "../../../services/validationSchemaService";
import GreenButton from "../../utils/button/GreenButton";
import { ValidIcon } from "../../../assets/icons/ValidIcon";
import { ErrorIcon } from "../../../assets/icons/ErrorIcon";

const PasswordContent = ({ matricule, setIsOpen }) => {
  //initialisation des variables
  const [goodPass, setGoodPass] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const validationSchema = NEW_PASSWORD_SCHEMA;

  /**
   * méthode permettant de mettre à jour le mot de passe de l'utilisateur
   * @param {*} changePasswordDto donnée à envoyer au back
   */
  const passwordUpdate = async (changePasswordDto) => {
    await userService
      .updatePassword(changePasswordDto)
      .then((res) => {
        if (res === true) {
          window.location.reload(); // Recharge la page si la mise à jour du mot de passe réussit
        } else {
          setGoodPass(true);
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 5000);
          setIsOpen(false)
        }
      })
      .catch((err) => {
        console.log(err);
        setGoodPass(false);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 5000);
      });
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      let changePasswordDto = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        matricule: matricule,
      };
      passwordUpdate(changePasswordDto).then(formik.resetForm());
    },
  });

  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{ marginTop: "10%" }}
    >
      <div className="w-8/12 mt-4 relative flex flex-col justify-center">
        <input
          type="password"
          id="oldPassword"
          className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ancien mot de passe*"
        />
        {formik.touched.oldPassword && formik.errors.oldPassword && (
          <div className="error">{formik.errors.oldPassword}</div>
        )}
      </div>
      <div className="mt-4 relative flex flex-col justify-center w-8/12">
        <input
          type="password"
          id="newPassword"
          className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Mot de passe*"
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div className="error">{formik.errors.newPassword}</div>
        )}
      </div>
      <div className="my-4 relative flex flex-col justify-center w-8/12">
        <input
          type="password"
          id="confirmPassword"
          className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirmer le mot de passe*"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="error">{formik.errors.confirmPassword}</div>
        )}
      </div>
      <GreenButton
        type="submit"
        id="bouton_confirmation_changement_password"
        onClick={formik.handleSubmit}
      >
        Confirmer
      </GreenButton>
      <div
        className={
          isVisible ? "self-center flex w-1/2 h-1/4 rounded-full" : "hidden"
        }
      >
        <div
          className={
            goodPass
              ? "h-full w-[5px] bg-green-afpa-alert"
              : "h-full w-[5px] bg-red-alert"
          }
        ></div>
        <div
          className={
            goodPass
              ? "grow h-full bg-green-afpa-alert/20 pt-10 pl-10 flex"
              : "grow h-full bg-red-alert/20 pt-10 pl-10 flex"
          }
        >
          <div className="flex flex-col">
            {goodPass ? (
              <ValidIcon width="30px" height="30px" />
            ) : (
              <ErrorIcon width="30px" height="30px" />
            )}
          </div>
          <div className="flex flex-col">
            {goodPass ? (
              <p className="font-jakartaSans text-green-afpa-alert font-bold ml-8">
                Le mot de passe a été changé.
              </p>
            ) : (
              <div>
                <p className="font-jakartaSans text-red-alert-dark font-bold ml-8">
                  Échec de la modification du mot de passe.
                </p>
                {!goodPass && (
                  <div className="error">
                    Le mot de passe ne corréspond pas a l'ancien
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordContent;
