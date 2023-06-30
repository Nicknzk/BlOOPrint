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
    box.attributes.join(", "),
  ]);
  const data = [
    ["id", "name", "dependencies", "methods", "attributes"],
    ...arrayBoxes,
  ];
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
      <div className="react-csv">
        <input
          type="text"
          value={boxName}
          onChange={handleNewBoxNameChange}
          placeholder="Type File Name Here"
        />
        <div className="download-csv">
          <CSVLink
            data={data}
            filename={boxName}
            target="_Blank"
            style={{ color: "black" }}
            onClick={handleSubmit}
          >
            <Typography variant="h5">Download</Typography>
          </CSVLink>
        </div>
      </div>
    </>
  );
}
