import React, { useCallback, useState, forwardRef, useImperativeHandle, } from 'react';
import { useDropzone } from 'react-dropzone';
;

const FileUploadComponent = forwardRef(({ children, setFile}, ref) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setFile(file)
    
  }, []);

  useImperativeHandle(ref, () => ({
    removeFileRef() {
      
    setUploadedFile(null);
    }
   
  }));

  const removeFile = (e) => {
   
    e.stopPropagation(); // Empêche la propagation de l'événement du bouton vers l'élément de dropzone
    setUploadedFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {uploadedFile ? (
          <div>
            {/* <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Aperçu de l'image"
              style={{ maxWidth: '100%' }}
            /> */}
            <span className='mr-16'>{uploadedFile.name}</span>
            <button onClick={removeFile}>X</button>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
});

export default FileUploadComponent;
