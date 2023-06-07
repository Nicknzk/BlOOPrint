import React, { useState } from "react";
import "./DragDrop.css";
import { useDropzone } from "react-dropzone";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const DragDrop: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>("");
  const auth = getAuth();
  const storage = getStorage();

  const handleDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const user = auth.currentUser;

    if (user) {
      const userEmail = user.email;
      const storageRef = ref(storage, `Uploads/${userEmail}/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        console.log("File uploaded successfully");

        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result as string;
          setFileContent(content);
        };

        reader.readAsText(file);
      } catch (error) {
        console.error("Error uploading file", error);
      }
    } else {
      console.error("User not authenticated");
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
          <p>Drop the file here...</p>
        ) : (
          <p>Drag and drop a file here, or click to select a file</p>
        )}
      </div>
      {fileContent && (
        <div className="file-content">
          <h3>File Uploaded!</h3>
         
        </div>
      )}
    </div>
  );
};

export default DragDrop;
