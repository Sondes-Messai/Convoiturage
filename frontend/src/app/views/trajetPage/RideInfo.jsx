import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRide, updateRide } from "../../redux-store/rideSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Counter from "../../components/counter/Counter";

const RideInfo = () => {
  //initialisation des constantes
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const myRide = useSelector(selectRide);
  const dispatch = useDispatch();
  const toggleTextareaSize = () => {
    setIsExpanded(!isExpanded);
  };

  //validation scheme
  const validationSchema = Yup.object({
    place: Yup.number()
      .min(1, "Le nombre de places disponibles doit être au moins 1")
      .max(myRide.car.placeNumber-1, `Le nombre de places disponibles doit être au maximum ${myRide.car.placeNumber-1}`),
    message: Yup.string().max(
      255,
      "Le message aux passagers doit avoir au maximum 255 caractères"
    ),
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h5 className="text-center">Les informations supplémentaires</h5>
      <Formik
        initialValues={{
          place: myRide.place || 0,
          message: myRide.message || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(updateRide(values));
          console.log(myRide);
          navigate("/post-ride");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <p className="mt-2">Le nombre de places disponibles</p>
                <Field
                  name="place"
                  type="number"
                  component={() => <Counter seats={myRide.car.placeNumber-1} />}
                />
              </div>
              <ErrorMessage
                name="place"
                component="div"
                className="text-red-500"
              />

              <h6 className="mt-4">Mon message aux passagers (optionnel)</h6>
              <Field
                name="message"
                as="textarea"
                placeholder="Message..."
                className={`flex items-center px-1 py-1 border-gradient-white-simple mt-2 text-left
                ${isExpanded ? "expanded" : ""}`}
                style={{
                  borderRadius: "45px 45px",
                  overflow: "auto",
                  backgroundColor: "white",
                  padding: "15px",
                }}
                onClick={toggleTextareaSize}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500"
              />
              <div className="mt-24">
                <div className="flex justify-center">
                  <button
                    className="rounded-full duration-300 transition-all border-2 border-green-afpa text-center shadow-lg shadow-green text-green-afpa hover:bg-green-afpa hover:text-white font-bold py-2 px-9"
                    onClick={() => navigate(-1)}
                  >
                    Retour
                  </button>
                  <button
                    className="btnKawaaGreen text-center shadow-lg shadow-green text-white font-bold py-2 px-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RideInfo;
