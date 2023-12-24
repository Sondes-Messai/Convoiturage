// Importez le composant CarInfo
import CarInfo from "./CarInfo";
import React, { useState } from "react";

const CarList = ({ cars }) => {
  const [carList,setCarList] = useState(cars)
  console.log("carList", carList);
  return (
    <div className="flex flex-col items-center">
      {carList.map((car, index) => (
        <div key={index} className="mb-4">
          <CarInfo car={car} setCarList={setCarList}/>
        </div>
      ))}
    </div>
  );
};

export default CarList;
