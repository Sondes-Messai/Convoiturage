import React, { useState, useRef, useEffect } from "react";
import carService from "./../../services/CarService";
import { getEmail } from "../../services/tokenServices";

const CarGallery = ({ car }) => {
  const [carImages, setCarImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [newPic, setNewPic] = useState(true);
  const MAX_IMAGE_SIZE_MB = 2; // La taille maximale autorisée en mégaoctets (2 Mo)

  const fetchCarsByUserEmail = async () => {
    await carService
      .allCarsByUserEmail(getEmail())
      .then((result) => {
        const images = result[0].pictures;
        images.sort((a, b) => a.id - b.id);
        setCarImages(result[0].pictures.sort());
      })
      .catch((err) => {
        console.log("Erreur lors du chargement du profil :", err);
      });
  };

  const addingPicture = async (formData) => {
    try {
      await carService.addCarPicture(car.id, formData);
      console.log("Success du changement de l'icone pour " + car.id);
    } catch (error) {
      console.log(
        "Erreur lors du changement de l'icone de la préférence :",
        error
      );
    } finally {
      setNewPic(!newPic);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  const handleDelete = async (index, pictureId) => {
    const updatedCarImages = [...carImages];
    updatedCarImages.splice(index, 1);
    setCarImages(updatedCarImages);
    setSelectedImage(null);
    console.log(pictureId);
    await carService.deleteCarPicture(pictureId);
  };

  const handleCancel = () => {
    setSelectedImage(null);
  };

  const handleAddImage = () => {
    // Utiliser le ref pour déclencher le clic sur l'élément input file
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier si le type MIME du fichier est une image
      if (file.type.startsWith("image/")) {
        if (file.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
          // Vérifiez si la taille du fichier est supérieure à 2 Mo
          alert(
            "L'image sélectionnée dépasse la taille maximale autorisée (2 Mo)."
          );
        } else {
          const formData = new FormData();
          formData.append("file", file);
          addingPicture(formData);
        }
      } else {
        // Afficher une boîte d'alerte si le fichier n'est pas une image
        alert(
          "Le format du fichier n'est pas valide. Veuillez sélectionner une image."
        );
      }
    }
  };

  useEffect(() => {
    fetchCarsByUserEmail();
    return () => {};
  }, [newPic]);

  return (
    <div className="car-gallery">
      {carImages.length === 0 ? (
        <>
          <p>Commencez par ajouter une image de votre titine.</p>
          <button onClick={handleAddImage}>Ajouter une image</button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </>
      ) : (
        <>
          <div className="flex-container">
            {carImages.map((image, index) => (
              <div
                key={index}
                className={`image-container ${
                  selectedImage === index ? "selected" : ""
                }`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image.url}
                  alt={`Car ${index + 1}`}
                  className="car-image"
                />
                {selectedImage === index && (
                  <div className="buttons-container">
                    <button onClick={() => handleDelete(index, image.id)}>
                      Supprimer
                    </button>
                    <button onClick={handleCancel}>Annuler</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {carImages.length < 6 && (
            <>
              <button onClick={handleAddImage}>Ajouter une image</button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CarGallery;
