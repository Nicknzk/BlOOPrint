//requires react-dropzone

import React, { useState } from "react";
import "./DragDrop.css";
import { useDropzone } from "react-dropzone";

const DragDrop: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>("");

  const handleDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
    };

    reader.readAsText(acceptedFiles[0]);
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
          <h3>File Content:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
