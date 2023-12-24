import React from "react";

const ImageButton = ({ handleSubmit, src, alt,id,title }) => {
  return (
    <button id={id} title={title} onClick={handleSubmit}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default ImageButton;
