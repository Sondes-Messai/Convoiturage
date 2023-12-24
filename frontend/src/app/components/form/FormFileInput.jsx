import React, { useRef, useState } from "react";
import img from "../../assets/img/dl.svg";
import FileUploadComponent from "../utils/FileUploadComponent";

function FormFileInput() {
  const [isFocus, setFocus] = useState(false);
  const [file, setFile] = useState(null);

  const uploadFile = (
    <img
      onClick={() => {
        console.log("rajouter la fonction d'ajout d'une pièce jointe");
      }}
      alt="ajouter pièce jointe"
      src={img}
    />
  );

  return (
    <div
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="h-11 w-full py-2 pl-5 bg-grey-afpa-light rounded-3xl flex justify-center box-border focus-within:border-green-afpa focus-within:border-2"
    >
      <FileUploadComponent
        children={uploadFile}
        setFile={setFile}
      />
      <span className="ml-3">Ajouter un fichier</span>
    </div>
  );
}

export default FormFileInput;
