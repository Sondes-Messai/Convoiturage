import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { BlablaIcon } from "../../assets/icons/BlablaIcon";
import { MaskIcon } from "../../assets/icons/MaskIcon";
import { MusicIcon } from "../../assets/icons/MusicIcon";
import { SmokerIcon } from "../../assets/icons/SmokerIcon";
import userService from "../../services/userService";
import { ADD_PREFERENCE } from "../../services/validationSchemaService";

import GreenButton from "../../components/utils/button/GreenButton";
import WhiteWithGreenBorderButton from "./../../components/utils/button/WhiteWithGreenBorderButton";

const SignupPage3 = ({ onNext, onBack, user }) => {
  const [preferences, setPreferences] = useState([]);
  const PreferenceSchema = ADD_PREFERENCE;

  function inpreferences(value) {
    if (user.preferenceLabels) {
      return user.preferenceLabels.indexOf(value) == -1;
    } else {
      return false;
    }
  }

  const formik = useFormik({
    initialValues: {
      smoking: inpreferences("smoking") || "",
      chatting: inpreferences("chatting") || "",
      music: inpreferences("music") || "",
      mask: inpreferences("mask") || "",
    },
    validationSchema: PreferenceSchema,
    onSubmit: (values) => {
      const preferenceLabels = Object.keys(values).filter(
        (key) => values[key] === "true"
      );
      console.log(preferenceLabels);
      formik.values.addPreferences === "false"
        ? onNext(values)
        : onNext(values, preferenceLabels);
    },
  });

  const handleBack = () => {
    onBack();
  };

  //A completer quand on aura les images des préférences
  useEffect(() => {
    const fetchData = async () => {
      try {
        const preferences = await userService.getAllPreferences();
        setPreferences(preferences);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des préférences :",
          error
        );
      }
    };

    if (formik.values.addPreferences === "true") {
      fetchData(); // Appel de la fonction fetchData une seule fois lors du rendu initial
    }
  }, []);

  const renderPreferenceForm = () => {
    if (formik.values.addPreferences === "true") {
      return (
        <div className="grid grid-cols-1 gap-4 w-5/12 formPreferences">
          <p className="font-bold">Dans la voiture je suis plutot:</p>
          <div className="flex items-center w-full choixContainer">
            <div className="choixText w-4/12">
              <img
                className="choixIcon"
                src={SmokerIcon}
                alt="logo fumeur"
              ></img>
              <p className="mr-2">Fumeur :</p>
            </div>
            <div className="flex items-center choixRadio w-3/12">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="smoking"
                  value="true"
                  checked={formik.values.smoking === "true"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Oui</p>
                </div>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="smoking"
                  value="false"
                  checked={formik.values.smoking === "false"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Non</p>
                </div>
              </label>
            </div>
          </div>
          {formik.touched.smoking && formik.errors.smoking && (
            <div className="error">{formik.errors.smoking}</div>
          )}
          <div className="choixBorder"></div>
          <div className="flex items-center w-full choixContainer">
            <div className="choixText w-4/12">
              <img
                className="choixIcon"
                src={BlablaIcon}
                alt="logo blabla"
              ></img>
              <p className="mr-2">Blabla :</p>
            </div>
            <div className="flex items-center choixRadio w-3/12">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="chatting"
                  value="true"
                  checked={formik.values.chatting === "true"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Oui</p>
                </div>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="chatting"
                  value="false"
                  checked={formik.values.chatting === "false"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Non</p>
                </div>
              </label>
            </div>
          </div>
          {formik.touched.chatting && formik.errors.chatting && (
            <div className="error">{formik.errors.chatting}</div>
          )}
          <div className="choixBorder"></div>
          <div className="flex items-center w-full choixContainer">
            <div className="choixText w-4/12">
              <img
                className="choixIcon"
                src={MusicIcon}
                alt="logo musique"
              ></img>
              <p className="mr-2">Musique :</p>
            </div>
            <div className="flex items-center choixRadio w-3/12">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="music"
                  value="true"
                  checked={formik.values.music === "true"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Oui</p>
                </div>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="music"
                  value="false"
                  checked={formik.values.music === "false"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Non</p>
                </div>
              </label>
            </div>
          </div>
          {formik.touched.music && formik.errors.music && (
            <div className="error">{formik.errors.music}</div>
          )}
          <div className="choixBorder"></div>
          <div className="flex items-center w-full choixContainer">
            <div className="choixText w-4/12">
              <img className="choixIcon" src={MaskIcon} alt="logo mask"></img>
              <p className="mr-2">Masque :</p>
            </div>
            <div className="flex items-center choixRadio w-3/12">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="mask"
                  value="true"
                  checked={formik.values.mask === "true"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Oui</p>
                </div>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="mask"
                  value="false"
                  checked={formik.values.mask === "false"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <div className="radioText">
                  <span className="ml-2"></span>
                  <p>Non</p>
                </div>
              </label>
            </div>
          </div>
          {formik.touched.mask && formik.errors.mask && (
            <div className="error">{formik.errors.mask}</div>
          )}
          <div className="choixBorder"></div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Choisir mes préférences</h1>
      <div className="grid grid-cols-1 gap-4 w-5/12 firstChoice">
        <div className="flex items-center w-full choixContainer">
          <div className="choixText w-8/12">
            <p className="mr-2">
              <span className="font-bold">Je veux ajouter une préférences</span>{" "}
              (optionnel) :
            </p>
          </div>
          <div className="flex items-center choixRadio w-3/12">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="addPreferences"
                value="true"
                checked={formik.values.addPreferences === "true"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-radio"
              />
              <span className="ml-2">Oui</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="addPreferences"
                value="false"
                checked={formik.values.addPreferences === "false"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-radio"
              />
              <span className="ml-2">Non</span>
            </label>
          </div>
        </div>
      </div>
      {renderPreferenceForm()}
      <div className="bottomChoix">
        <GreenButton
          type="submit"
          onClick={formik.handleSubmit}
          id="bouton_suivant_signup3"
        >
          Suivant
        </GreenButton>
        <WhiteWithGreenBorderButton
          type="button"
          onClick={handleBack}
          id="bouton_retour_signup3"
        >
          <span>Retour</span>
        </WhiteWithGreenBorderButton>
      </div>
    </div>
  );
};

export default SignupPage3;
