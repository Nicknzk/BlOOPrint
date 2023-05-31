import { Typography } from "@mui/material";
import "../CSS-Folder/HomePage.css";

export default function ProjectTemplate() {
  return (
    <>
      <Typography variant="h2">Project Template</Typography>
      <img
        src="src/Component/Images/MindMap.webp"
        alt="Project Picture"
        className="project-picture"
      />
    </>
  );
}