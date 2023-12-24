import React, { useState } from "react";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";
import SignupPage4 from "./SignupPage4";
import User from "../../models/User";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import userService from "../../services/userService";

const SignupForm = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(new User());
  const [myPhoto, setMyPhoto] = useState(null);

  const handleNext = (values, preferenceLabels, CarDto) => {
    setUser((prevUser) =>
      updateUser(prevUser, values, preferenceLabels, CarDto)
    );
    setPage((prevPage) => prevPage + 1);
  };

  const updateUser = (prevUser, values, preferenceLabels, CarDto) => {
    const updatedUser = { ...prevUser };
    if (values.picture) {
      setMyPhoto(values.picture);
    }
    console.log(values, CarDto);

    // Mettre à jour les valeurs existantes
    Object.keys(values).forEach((key) => {
      if (updatedUser.hasOwnProperty(key)) {
        updatedUser[key] = values[key];
      }
    });

    // Mettre à jour les préférences
    if (page === 3) {
      updatedUser.preferenceLabels = preferenceLabels;
    }

    if (page === 4) {
      updatedUser.carDto = CarDto;
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      updatedUser.createdDate = new Date()
        .toLocaleDateString("fr-FR", options)
        .replace(/\//g, "-")
        .replace(" ", " ");
      console.log(updatedUser);
      handleComplete(updatedUser);
    }
    return updatedUser;
  };

  const handleComplete = async (updatedUser) => {
    try {
      console.log("updatedUser : ", updatedUser);
      await authService.register(updatedUser);
      navigate("/confirm/inscription");
    } catch (error) {
      console.log("Erreur lors de la création de l'utilisateur :", error);
    } finally {
      //ajout de la photo si l'utilisateur en choisi une
      if (myPhoto != null) {
        const formData = new FormData();
        formData.append("matricule", user.matricule);
        formData.append("file", myPhoto);
        try {
          userService.updateUserWithFile(formData);
          console.log("Mise à jour réussie !");
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour photo de l'utilisateur :",
            error
          );
        }
      }
    }
  };

  const handleBack = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="w-4/5 m-auto white">
      {page != 1 && page < 4 ? (
        <div className="progress-bar">
          <div className={`circle ${page >= 2 ? "active" : ""}`}>
            {page >= 2 ? <span className="check-mark">✔️</span> : null}
            <span className="step-label">Étape 1</span>
          </div>
          <div className={`line ${page >= 2 ? "active" : ""}`} />
          <div
            className={`circle ${page >= 3 ? "active" : ""}`}
            style={{
              borderColor: page >= 2 ? "#87BB34" : "gray",
              backgroundColor: page > 2 ? "#87BB34" : "transparent",
            }}
          >
            {page >= 3 ? <span className="check-mark">✔️</span> : null}
            <span className="step-label">Étape 2</span>
            <div
              className={`mid-point ${page == 2 ? "active" : ""}`}
              style={{ display: page > 2 ? "none" : "block" }}
            />
          </div>
          <div className={`line ${page >= 3 ? "active" : ""}`} />
          <div
            className={`circle ${page >= 4 ? "active" : ""}`}
            style={{
              borderColor: page >= 3 ? "#87BB34" : "gray",
              backgroundColor: page > 3 ? "#87BB34" : "transparent",
            }}
          >
            {page >= 4 ? <span className="check-mark">✔️</span> : null}
            <span className="step-label">Étape 3</span>
            <div
              className={`mid-point ${page == 3 ? "active" : ""}`}
              style={{ display: page > 3 ? "none" : "block" }}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {page === 1 && <SignupPage1 onNext={handleNext} user={user} />}
      {page === 2 && (
        <SignupPage2 onNext={handleNext} onBack={handleBack} user={user} />
      )}
      {page === 3 && (
        <SignupPage3 onNext={handleNext} onBack={handleBack} user={user} />
      )}
      {page === 4 && (
        <SignupPage4 onNext={handleNext} onBack={handleBack} user={user} />
      )}
    </div>
  );
};

export default SignupForm;
