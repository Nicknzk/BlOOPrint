import { CSVLink } from "react-csv";
import { Box } from "./NewProjectTemplate";
import { useState } from "react";
import { Typography } from "@mui/material";

export default function ReactCSVDownloader({ boxes }: { boxes: Box[] }) {
  const arrayBoxes = boxes.map((box) => [
    box.id,
    box.name,
    box.dependencies,
    box.methods.join(", "),
  ]);
  const data = [["id", "name", "dependencies", "methods"], ...arrayBoxes];
  const [boxName, setBoxName] = useState("");

  const handleNewBoxNameChange = (event: any) => {
    event.preventDefault();
    setBoxName(event.target.value);
  };

  const handleSubmit = () => {
    if (boxName.trim() === "") {
      setBoxName("Project");
    }
    setTimeout(() => {
      //clear name of file after download
      setBoxName("");
    }, 10); // Adjust the delay (in milliseconds) as needed
  };

  return (
    <>
      <div
        className="react-csv"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "5px",
          textDecoration: "none",
          backgroundColor: "blue",
          padding: "4px",
          borderRadius: "5px",
        }}
      >
        <input
          type="text"
          value={boxName}
          onChange={handleNewBoxNameChange}
          placeholder="Type File Name Here"
          style={{ textDecoration: "none" }}
        />
        <div className="download-csv">
          <CSVLink
            data={data}
            filename={boxName}
            target="_Blank"
            style={{ color: "black", textDecoration: "none" }}
            onClick={handleSubmit}
          >
            <Typography
              variant="h5"
              style={{
                marginLeft: "5px",
                textDecoration: "none",
                borderRadius: "5px",
                color: "white",
              }}
            >
              Download
            </Typography>
          </CSVLink>
        </div>
      </div>
    </>
  );
}
