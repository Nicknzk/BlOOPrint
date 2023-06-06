import { Typography } from "@mui/material";
import "../CSS-Folder/HomePage.css";
import mindmap from "./Images/MindMap.webp";

export default function ProjectTemplate() {
  return (
    <>
      <Typography variant="h2">Project Template</Typography>
      <img src={mindmap} alt="Project Picture" className="project-picture" />
    </>
  );
}
