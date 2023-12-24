import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import GreenButton from "../utils/button/GreenButton";
import { useDispatch, useSelector } from "react-redux";
import { selectRide, updateRide } from "../../redux-store/rideSlice";
import addressService from "../../services/addressService";
import { getEmail } from "../../services/tokenServices";
import carService from "../../services/CarService";

const SimpleRide = ({ lieuArrivee, lieuDepart }) => {
  //initialisation des constantes
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + 1); // Add 1 day
  const maxDate = new Date(currentDate);
  maxDate.setMonth(currentDate.getMonth() + 2); // Add 2 months
  const [itinery, setItinery] = useState({});
  const [cars, setCars] = useState([]);

  /**
   * méthode permettant de récupérer la voiture de l'utilisateur depuis son adresse email
   */
  const fetchCarsByUserEmail = async () => {
    try {
      const response = await carService.allCarsByUserEmail(getEmail());
      setCars(response);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des voitures de l'utilisateur :",
        error
      );
    }
  };

  const getItinery = () => {
    const coordArrival = `${lieuArrivee.geometry.coordinates[0]},${lieuArrivee.geometry.coordinates[1]}`;
    const coordDeparture = `${lieuDepart.geometry.coordinates[0]},${lieuDepart.geometry.coordinates[1]}`;
    addressService
      .itinerayCalcul(coordDeparture, coordArrival)
      .then((resultItinery) => {
        console.log("resultItinery", resultItinery);
        setItinery(resultItinery);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  };

  useEffect(() => {
    getItinery();
    fetchCarsByUserEmail();
    return () => {};
  }, [lieuArrivee, lieuDepart]);

  console.log("itinery", itinery);

  // Dans un composant où vous souhaitez mettre à jour myRide
  const dispatch = useDispatch();

  // Récupération de la valeur de myRide depuis le store et affichage de sa valeur en console
  const myRide = useSelector(selectRide);
  console.log(myRide);

  //schéma de validation
  const validationSchema = isChecked
    ? Yup.object().shape({
        departureStartDate: Yup.object().required(
          "La date de départ est requise"
        ),
        arrivalStartDate: Yup.object().required(
          "La date de retour est requise"
        ),
        startTime: Yup.string()
          .matches(
            /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "L'heure de départ doit être au format HH:MM"
          )
          .required("L'heure de départ est requise"),
        endTime: Yup.string()
          .test(
            "is-greater",
            "L'heure de retour doit être supérieure à l'heure de départ",
            function (endTime) {
              const { startTime, departureStartDate, arrivalStartDate } =
                this.parent;
              // Convertir les heures en objets Date pour faciliter la comparaison
              const startDateTime = new Date(
                `${departureStartDate.startDate}T${startTime}:00.000Z`
              );
              const endDateTime = new Date(
                `${arrivalStartDate.startDate}T${endTime}:00.000Z`
              );
              // Comparer les dates et heures
              return startDateTime < endDateTime;
            }
          )
          .required("L'heure de retour est requise"),
      })
    : Yup.object().shape({
        departureStartDate: Yup.object().required(
          "La date de départ est requise"
        ),
        startTime: Yup.string()
          .matches(
            /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "L'heure de départ doit être au format HH:MM"
          )
          .required("L'heure de départ est requise"),
      });

  //formulaire formik initialisayion et méthode
  const formik = useFormik({
    initialValues: {
      departureStartDate: new Date(),
      departureEndDate: new Date(),
      arrivalStartDate: new Date(),
      arrivalEndDate: new Date(),
      startTime: "",
      endTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        let startTime = values.startTime.split(":");
        let departureStartDate = new Date(values.departureStartDate.startDate);
        departureStartDate.setHours(startTime[0], startTime[1]);
        let departureEndDate = new Date(departureStartDate);
        departureEndDate.setMinutes(
          departureEndDate.getMinutes() + itinery.duration
        );
        console.log("departureStartDate", departureStartDate);
        console.log("departureEndDate", departureEndDate);
        if (isChecked) {
          let endTime = values.endTime.split(":");
          let arrivalStartDate = new Date(values.arrivalStartDate.startDate);
          arrivalStartDate.setHours(endTime[0], endTime[1]);
          let arrivalEndDate = new Date(arrivalStartDate);
          arrivalEndDate.setMinutes(
            arrivalEndDate.getMinutes() + itinery.duration
          );
          console.log("arrivalStartDate", arrivalStartDate);
          console.log("arrivalEndDate", arrivalEndDate);
          dispatch(
            updateRide({
              departureStartDate: departureStartDate.toString(),
              departureEndDate: departureEndDate.toString(),
              arrivalStartDate: arrivalStartDate.toString(),
              arrivalEndDate: arrivalEndDate.toString(),
              lieuArrivee: lieuArrivee,
              lieuDepart: lieuDepart,
              itinery: itinery,
              type: "UNIQUE",
              car: cars[0],
            })
          );
        } else {
          dispatch(
            updateRide({
              departureStartDate: departureStartDate.toString(),
              departureEndDate: departureEndDate.toString(),
              lieuArrivee: lieuArrivee,
              lieuDepart: lieuDepart,
              itinery: itinery,
              type: "UNIQUE",
              car: cars[0],
            })
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        navigate("/ride-info");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className="rounded-l-full px-7 py-3 flex-grow border-gradient-white-simple"
        style={{ borderRadius: "25px 25px" }}
      >
        <div className="flex items-center ml-36">
          <input
            type="checkbox"
            name="checkbox"
            id="allerRetour"
            className="accent-rose-afpa w-5 h-5"
            onClick={() => {
              setIsChecked(!isChecked);
            }}
          />
          <label htmlFor="allerRetour" className="font-jakartaSans">
            Retour
          </label>
        </div>

        <div className="z-30 justify-between">
          <div className="h-auto w-auto pl-5 my-2 flex items-center z-50">
            <div className="flex flex-col items-center mr-8 ml-28">
              <Datepicker
                value={formik.values.departureStartDate}
                onChange={(date) => {
                  formik.setFieldValue("departureStartDate", date);
                }}
                asSingle={true}
                primaryColor={"green"}
                useRange={false}
                minDate={minDate}
                maxDate={maxDate}
                popoverDirection="up"
                inputClassName="signupInput w-full px-3 py-2 outline-none border-none text-center"
                placeholder={"Date de départ*"}
              />
              {formik.touched.departureStartDate &&
              formik.errors.departureStartDate ? (
                <div className="text-red-600">
                  "Veuillez sélectionner une date pour le départ"
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-center mr-8 ml-28">
              <input
                type="time"
                name="startTime"
                className={`signupInput outline-none border-none text-center w-[181px] ${
                  isChecked ? "input-slide-right slide-enter-active mr-10" : ""
                }`}
                value={formik.values.startTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startTime && formik.errors.startTime ? ( // Affichez l'erreur si elle est touchée et a des erreurs
                <div className="text-red-600">{formik.errors.startTime}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="my-4">
          {isChecked ? (
            <div className="z-30 justify-between">
              <div className="h-auto w-auto pl-5 my-2 flex items-center z-50">
                <div className="flex flex-col items-center mr-8 ml-28">
                  <Datepicker
                    value={formik.values.arrivalStartDate}
                    onChange={(date) => {
                      formik.setFieldValue("arrivalStartDate", date);
                    }}
                    asSingle={true}
                    primaryColor={"green"}
                    useRange={false}
                    minDate={formik.values.departureStartDate.startDate}
                    maxDate={maxDate}
                    popoverDirection="up"
                    inputClassName="signupInput w-full px-3 py-2 outline-none border-none text-center"
                    placeholder={"Date de retour"}
                  />
                  {formik.touched.arrivalStartDate &&
                  formik.errors.arrivalStartDate ? (
                    <div className="text-red-600">
                      "Veuillez sélectionner une date pour le retour"
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col items-center mr-8 ml-28">
                  <input
                    type="time"
                    name="endTime"
                    className="input-slide-right slide-enter-active mr-10 signupInput outline-none border-none text-center w-[181px]"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.endTime && formik.errors.endTime ? (
                    <div className="text-red-600" style={{ maxWidth: "200px" }}>
                      {formik.errors.endTime}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <GreenButton type="submit" cas="with-m-y">
          Suivant
        </GreenButton>
      </div>
    </form>
  );
};

export default SimpleRide;
