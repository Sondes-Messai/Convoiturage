import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Select from "react-select";

import CarDto from "./../../models/Car";
import carService from "../../services/CarService";
import { ADD_VEHICULE_SCHEMA } from "../../services/validationSchemaService";

import GreenButton from "../../components/utils/button/GreenButton";
import WhiteWithGreenBorderButton from "./../../components/utils/button/WhiteWithGreenBorderButton";
import carData from "../../../../cars.json";

const colorOptions = [
  { value: "color1", label: "Couleur 1" },
  { value: "color2", label: "Couleur 2" },
  { value: "color3", label: "Couleur 3" },
];

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

const SignupPage4 = ({ onNext, onBack, user }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);

  const vehicleSchema = ADD_VEHICULE_SCHEMA;

  const carDto = user.CarDto;

  const formik = useFormik({
    initialValues: {
      addVehicle: null,
      brandName: carDto ? carDto.brandName : "",
      modelName: carDto ? carDto.modelName : "",
      color: carDto ? carDto.color : "",
      matriculation: carDto ? carDto.matriculation : "",
    },
    validationSchema: vehicleSchema,
    onSubmit: (values) => {
      console.log("submit");
      const carDto = new CarDto();
      carDto.brandName = values.brandName;
      carDto.modelName = values.modelName;
      carDto.color = values.color;
      carDto.matriculation = values.matriculation;
      formik.values.addVehicle === "false"
        ? onNext(values)
        : onNext(values, null, carDto);
    },
  });

  const handleBack = () => {
    onBack();
  };

  /**
   * méthode permettant de récupérer toutes les marques de voiture depuis cars.json
   * @param {*} search
   */
  const fetchDataBrand = async (search = "") => {
    try {
      const filteredBrands = carData
        .filter((car) =>
          car.marque.toLowerCase().includes(search.toLowerCase())
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
            car.marque.toLowerCase() === selectedBrand.toLowerCase() &&
            car.modele.toLowerCase().includes(search.toLowerCase())
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

  const renderVehicleForm = () => {
    if (formik.values.addVehicle === "true") {
      return (
        <div className="grid grid-cols-1 gap-4 w-5/12 mt-8">
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
              formik.setFieldValue("brandName", selectedOption.value);
              setSelectedBrand(selectedOption.value);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.brandName && formik.errors.brandName && (
            <div className="error">{formik.errors.brandName}</div>
          )}
          <Select
            styles={customStyles}
            isSearchable={true}
            name="modelName"
            placeholder="Modèle"
            value={models.find(
              (option) => option.value === formik.values.modelName
            )}
            options={models}
            onInputChange={(inputValue) => setSearchValue(inputValue)}
            onChange={(selectedOption) => {
              formik.setFieldValue("modelName", selectedOption.value);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.modelName && formik.errors.modelName && (
            <div className="error">{formik.errors.modelName}</div>
          )}
          <Select
            styles={customStyles}
            isSearchable={true}
            name="color"
            placeholder="Couleur"
            value={colorOptions.find(
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
            placeholder="Plaque d'immatriculation"
            value={formik.values.matriculation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="signupInput w-full px-3 py-2 placeholder-gray-400 outline-none border-none"
          />
          {formik.touched.matriculation && formik.errors.matriculation && (
            <div className="error">{formik.errors.matriculation}</div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-12">Véhicule</h1>
      <div className="grid grid-cols-1 gap-4 w-5/12">
        <div className="flex items-center w-full choixContainer">
          <div className="choixText w-8/12">
            <p className="mr-2">
              <span className="font-bold">Je veux ajouter un véhicule</span>{" "}
              (optionnel) :
            </p>
          </div>
          <div className="flex items-center choixRadio w-3/12">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="addVehicle"
                value="true"
                checked={formik.values.addVehicle === "true"}
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                className="form-radio"
              />
              <span className="ml-2">Oui</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="addVehicle"
                value="false"
                checked={formik.values.addVehicle === "false"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-radio"
              />
              <span className="ml-2">Non</span>
            </label>
          </div>
        </div>
      </div>
      {renderVehicleForm()}
      <div className="bottomChoix">
        <GreenButton
          type="submit"
          onClick={formik.handleSubmit}
          id="bouton_soumettre_signup4"
        >
          Soumettre
        </GreenButton>
        <WhiteWithGreenBorderButton
          type="button"
          onClick={handleBack}
          id="bouton_retour_signup4"
        >
          <span>Retour</span>
        </WhiteWithGreenBorderButton>
      </div>
    </div>
  );
};

export default SignupPage4;
