import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useFormik } from "formik";
import CurrentPageBar from "../../components/utils/CurrentPageBar";
import CarDto from "./../../models/Car";
import carService from "../../services/CarService";
import { NEW_VEHICULE_SCHEMA } from "../../services/validationSchemaService";
import { getEmail } from "../../services/tokenServices";
import GreenButton from "../../components/utils/button/GreenButton";
import { URL_PROFIL } from "../../constants/urls/urlFrontEnd";
import carData from "../../../../cars.json";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "44px",
    borderRadius: "100px",
    backgroundColor: state.isFocused ? "white" : "#E6E6E6",
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

const AddCar2 = ({ user }) => {
  //initialisation des constantes
  const email = getEmail();
  const [cars, setCars] = useState([]);
  const [searchBrandValue, setSearchBrandValue] = useState("");
  const [searchModelValue, setSearchModelValue] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const vehicleSchema = NEW_VEHICULE_SCHEMA;
  const carDto = user?.CarDto || {};
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      brandName: carDto ? carDto.brandName : "",
      modelName: carDto ? carDto.modelName : "",
      color: carDto ? carDto.color : "",
      matriculation: carDto ? carDto.matriculation : "",
      seats: carDto ? carDto.seats : "",
      baggage: false,
    },
    validationSchema: vehicleSchema,
    onSubmit: async (values) => {
      console.log("submit");
      const carDto = new CarDto();
      carDto.brandLabel = values.brandName;
      carDto.modelLabel = values.modelName;
      carDto.color = values.color;
      carDto.licensePlate = values.matriculation;
      carDto.placeNumber = values.seats;
      carDto.luggage = values.baggage;
      addCar(email, carDto);
    },
  });

  /**
   * méthode permettant d'ajouter une voiture à un utilisateur
   * @param {*} email email de l'utilisateur
   * @param {*} carDto information relative à sa voiture
   */
  const addCar = async (email, carDto) => {
    try {
      const createCar = await carService.createCar(email, carDto);
      console.log("Véhicule enregistré :", createCar);
      setCars((prevCars) => [...prevCars, createCar]);
      navigate(URL_PROFIL);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du véhicule :", error);
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
    fetchDataBrand(searchBrandValue);
  }, [searchBrandValue]);

  useEffect(() => {
    fetchDataModel(searchModelValue);
  }, [selectedBrand, searchModelValue]);

  useEffect(() => {
    fetchDataColor();
  }, []);

  return (
    <div className="h-full ">
      <CurrentPageBar text={"Mon vehicule"} />

      <Link
        to={URL_PROFIL}
        className="underline connexionLinks text-[18px] ml-32 mt-44"
      >
        &#60; Retour
      </Link>
      <p className="text-right mr-96"> * Champs obligatoire</p>

      <div>
        <div className="grid grid-cols-1 gap-4 w-1/3 mx-auto">
          <Select
            styles={customStyles}
            isSearchable={true}
            name="brandName"
            placeholder="Marque"
            value={brands.find(
              (option) => option.value === formik.values.brandName
            )}
            options={brands}
            onInputChange={(inputValue) => setSearchBrandValue(inputValue)}
            onChange={(selectedOption) => {
              const selectedBrandValue = selectedOption.value;
              formik.setFieldValue("brandName", selectedBrandValue);
              console.log("selectedBrandValue", selectedBrandValue);
              console.log("selectedBrand", selectedBrand);
              if (selectedBrandValue !== selectedBrand) {
                console.log("dans la condition");
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
                onInputChange={(inputValue) => setSearchModelValue(inputValue)}
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
          <div id="my-radio-group">Bagages* :</div>
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
          <GreenButton
            type="submit"
            id="car_save-admin"
            cas="isCO"
            onClick={formik.handleSubmit}
          >
            Enregistrer
          </GreenButton>
        </div>
      </div>
    </div>
  );
};
export default AddCar2;
