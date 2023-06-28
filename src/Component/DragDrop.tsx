import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useDropzone } from "react-dropzone"; //requires react-dropzone
import { getStorage, ref, uploadBytes } from "firebase/storage";

const DragDrop: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>("");
  const storage = getStorage();

  const handleDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const storageRef = ref(storage, "Uploads/");

    try {
      await uploadBytes(storageRef, file);
      console.log("file uploaded");
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("error uploading", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div className="container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="h5">Drop the file here...</Typography>
        ) : (
          <Typography variant="h5">
            Drag and drop a file here, or click to select a file
          </Typography>
        )}
      </div>
      {fileContent && (
        <div className="file-content">
          <Typography variant="h5">File Content:</Typography>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
