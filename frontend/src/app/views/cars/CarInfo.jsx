import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import carIcon from "../../assets/img/car.svg";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { ArchiveIconWhite } from "../../assets/icons/ArchiveIconWhite";
import { EditIconWhite } from "../../assets/icons/EditIconWhite";
import CarDto from "./../../models/Car";
import carService from "../../services/CarService";
import { updateCar } from "../../services/validationSchemaService";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { URL_PROFIL } from "../../constants/urls/urlFrontEnd";
import carData from "../../../../cars.json";
import { el } from "date-fns/locale";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "44px",
    borderRadius: "100px",
    backgroundColor: state.isFocused ? "white" : "white",
    borderColor: state.isFocused ? "#87BB34" : "#E6E6E6",
    boxShadow: state.isFocused ? "0 0 2px #87BB34" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#87BB34" : "#E6E6E6",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#87BB34" : "transparent",
    color: state.isSelected ? "#FFF" : "#000",
    "&:hover": {
      backgroundColor: state.isSelected ? "#87BB34" : "#E2E8F0",
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#87BB34" : "#000",
    "&:hover": {
      color: state.isFocused ? "#87BB34" : "#000",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#000",
    backgroundColor: "transparent",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "0",
    borderRadius: "0",
  }),
};

const CarInfo = ({ car, setCarList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [matriculation, setMatriculation] = useState(car.licensePlate);
  const [isfocus, setIsfocus] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const vehicleSchema = updateCar(car);
  const navigate = useNavigate();
  const [carInfo, setCarInfo] = useState(car);

  const formik = useFormik({
    initialValues: {
      brandName: carInfo.brandLabel,
      modelName: carInfo.modelLabel,
      color: carInfo.color.label,
      matriculation: carInfo.licensePlate,
      seats: carInfo.placeNumber,
      baggage: carInfo.luggage || false,
    },
    validationSchema: vehicleSchema,
    onSubmit: async (values) => {
      setCarInfo((prevCarInfo) => ({
        ...prevCarInfo,
        brandLabel: values.brandName,
        modelLabel: values.modelName,
        color: values.color,
        matriculation: values.matriculation,
        seats: values.seats,
        baggages: values.baggage,
      }));
      const carDto = new CarDto();
      carDto.id = car.id;
      carDto.brandLabel = values.brandName;
      carDto.modelLabel = values.modelName;
      carDto.color = values.color;
      carDto.licensePlate = values.matriculation;
      carDto.placeNumber = values.seats;
      carDto.luggage = values.baggage;
      console.log("carDto : ", carDto);
      try {
        handleUpdateCar(carDto);
      } catch (error) {
        console.error("Erreur lors de la modification du véhicule :", error);
      }
    },
  });

  const handleDeleteCar = async () => {
    await carService.deleteCar(matriculation);
  };

  const handleUpdateCar = async (carDto) => {
    await carService.updateCar(matriculation, carDto);
    setTimeout(() => {
      navigate(URL_PROFIL);
    }, 1000);
  };

  const onConfirm = async () => {
    try {
      await handleDeleteCar();
      setCarList([]);
    } catch (error) {
      console.log("Erreur lors de la suppression du véhicule :", error);
    } finally {
      setTimeout(() => {
        navigate(URL_PROFIL);
      }, 1000);
    }
  };

  /**
   * méthode permettant de récupérer toutes les marques de voiture depuis cars.json
   * @param {*} search
   */
  const fetchDataBrand = async (search = "") => {
    try {
      const filteredBrands = carData
        .filter((car) =>
          car.marque.toString().toLowerCase().includes(search.toLowerCase())
        )
        .map((car) => ({ label: car.marque, value: car.marque }));

      const uniqueBrands = Array.from(
        new Set(filteredBrands.map((car) => car.value))
      );

      setBrands(uniqueBrands.map((brand) => ({ label: brand, value: brand })));
    } catch (error) {
      console.error("erreur lors de la récupération des marques : ", error);
    }
  };

  /**
   * méthode permettant de récupérer toutes les couleurs de voiture depuis la bdd
   * @param {*} search
   */
  const fetchDataColor = async () => {
    try {
      const colors = await carService.getAllColors();
      colors.forEach((element) => {
        element.label = element.value = element.color.label;
        colors[element] = element;
      });
      setColors(colors);
    } catch (error) {
      console.error("Erreur lors de la récupération des couleurs :", error);
    }
  };

  /**
   * méthode permettant de récupérer toutes les marques de voiture depuis la bdd
   * @param {*} search
   */
  const fetchDataModel = async (search = "") => {
    try {
      const filteredModels = carData
        .filter(
          (car) =>
            car.marque.toString().toLowerCase() ===
              selectedBrand.toLowerCase() &&
            car.modele.toString().toLowerCase().includes(search.toLowerCase())
        )
        .map((car) => ({ label: car.modele, value: car.modele }));

      const uniqueModels = Array.from(
        new Set(filteredModels.map((car) => car.value))
      );

      setModels(
        uniqueModels.map((modele) => ({ label: modele, value: modele }))
      );
    } catch (error) {
      console.error("erreur lors de la récupération des marques : ", error);
    }
  };

  useEffect(() => {
    // Appel de la fonction fetchDataBrand une seule fois lors du rendu initial
    fetchDataBrand(searchValue);
  }, [searchValue]);

  useEffect(() => {
    // Appel de la fonction fetchDataBrand une seule fois lors du rendu initial
    fetchDataColor();
  }, []);

  useEffect(() => {
    // Appel de la fonction fetchDataModel lorsque une valeur a été sélectionne pour la marque de la voiture
    fetchDataModel(searchValue);
  }, [selectedBrand, searchValue]);

  return (
    <div
      className={`rounded-l-full px-2 py-2  flex items-center w-96  ${
        isfocus ? "bg-grey-afpa-light " : "border-gradient-white"
      }`}
      style={{ borderRadius: "12px 12px" }}
    >
      <div className="h-7 w-7 rounded-full mr-3 flex justify-center items-center ">
        <img src={carIcon} alt="" />
      </div>
      <div className="flex flex-col">
        <div>
          <span className="text-sm text-left">
            {carInfo.brandLabel} {carInfo.modelLabel}
          </span>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-left">
              Couleur: {carInfo.color.label}
            </span>
            <button
              className="text-xs text-right ml-48"
              onClick={() => {
                setIsEditing(!isEditing);
                setIsfocus(!isfocus);
              }}
            >
              Modifier
              <ArrowIcon
                width="20px"
                height="20px"
                className="ml-2 rotate-90 group-focus-within:rotate-0 group-focus-within:fill-rose-afpa"
              />
            </button>
          </div>
        </div>
        {isEditing ? (
          <div className="grid grid-cols-1 gap-4 w-64- mx-auto mr-6">
            <Select
              styles={customStyles}
              isSearchable={true}
              name="brandName"
              placeholder="Marque"
              value={brands.find(
                (option) => option.value === formik.values.brandName
              )}
              options={brands}
              onInputChange={(inputValue) => setSearchValue(inputValue)}
              onChange={(selectedOption) => {
                const selectedBrandValue = selectedOption.value;
                formik.setFieldValue("brandName", selectedBrandValue);
                if (selectedBrandValue !== selectedBrand) {
                  formik.setFieldValue("modelName", ""); // Réinitialiser le modèle si la marque est vide
                }
                setSelectedBrand(selectedOption.value);
              }}
              onBlur={formik.handleBlur}
            />
            {selectedBrand && (
              <>
                <Select
                  styles={customStyles}
                  isSearchable={true}
                  name="modelName"
                  placeholder="Modèle*"
                  value={models.find(
                    (option) => option.value === formik.values.modelName
                  )}
                  options={models}
                  onInputChange={(inputValue) => setSearchValue(inputValue)}
                  onChange={(selectedOption) =>
                    formik.setFieldValue("modelName", selectedOption.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.modelName && formik.errors.modelName && (
                  <div className="error">{formik.errors.modelName}</div>
                )}
              </>
            )}
            <Select
              styles={customStyles}
              isSearchable={true}
              name="color"
              placeholder="Couleur"
              value={colors.find(
                (option) => option.value === formik.values.color
              )}
              options={colors}
              onChange={(selectedOption) =>
                formik.setFieldValue("color", selectedOption.value)
              }
              onBlur={formik.handleBlur}
            />
            {formik.touched.color && formik.errors.color && (
              <div className="error">{formik.errors.color}</div>
            )}
            <input
              type="text"
              name="matriculation"
              placeholder="Numéro d’immatriculation* ex:AA-001-AA"
              value={formik.values.matriculation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
            />
            {formik.touched.matriculation && formik.errors.matriculation && (
              <div className="error">{formik.errors.matriculation}</div>
            )}
            <input
              type="number"
              name="seats"
              placeholder="Nombre de places*"
              value={formik.values.seats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
            />
            {formik.touched.seats && formik.errors.seats && (
              <div className="error">{formik.errors.seats}</div>
            )}
            <div id="my-radio-group">Baggages* :</div>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <input
                  type="radio"
                  name="baggage"
                  value={true}
                  checked={formik.values.baggage === true}
                  onChange={() => formik.setFieldValue("baggage", true)}
                />
                Oui
              </label>
              <span style={{ margin: "0 10px" }}></span>
              <label>
                <input
                  type="radio"
                  name="baggage"
                  value={false}
                  checked={formik.values.baggage === false}
                  onChange={() => formik.setFieldValue("baggage", false)}
                />
                Non
              </label>
            </div>
            <button
              className="btnKawaaGreenCo w-full px-20 flex items-center text-white mt-9"
              type="submit"
              onClick={() => {
                setIsEditing(false);
                formik.handleSubmit();
              }}
            >
              <EditIconWhite width="25px" height="25px" className="mr-2" />
              enregistrer
            </button>
            <button
              className="btnKawaaRedCo w-full px-20 flex items-center text-white mt-3"
              type="button"
              style={{ backgroundColor: "red" }}
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <ArchiveIconWhite width="25px" height="25px" className="mr-2" />
              Archiver
            </button>

            <Modal
              isOpen={showDeleteConfirmation}
              onCancel={() => setShowDeleteConfirmation(false)}
              onConfirm={onConfirm}
            >
              <h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
                Voulez-vous vraiment supprimer votre véhicule ?
              </h2>
              <p className="font-jakartaSans text-sm text-grey-afpa mb-4">
                Toutes les données associées à cette voiture seront
                définitivement archivées et cette action ne pourra pas être
                annulée.
              </p>
              <p className="font-jakartaSans text-grey-afpa-dark text-sm mb-4">
                Veuillez confirmer la suppression de cette voiture.
              </p>
              <hr className="w-3/4 mb-8" />
            </Modal>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CarInfo;
