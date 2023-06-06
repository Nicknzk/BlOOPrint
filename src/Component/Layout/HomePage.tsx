import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../../CSS-Folder/HomePage.css";
import mindmap from "../Images/MindMap.webp";
import buttonvector from "../Images/button-plus-icon-vector-better.png";

export default function HomePage() {
  return (
    <>
      <p className="HomePage-welcome">BLOOPrint Homepage</p>
      <div>
        <Typography variant="h2">Create new project</Typography>
        <nav>
          <Link to={"/NewProjectTemplate"}>
            <img
              src={buttonvector}
              alt="Picture for new project"
              className="newProjectPicture"
            />
          </Link>
        </nav>
      </div>

      <Typography variant="h2">Work on project</Typography>
      <nav>
        <Link to={"/ProjectTemplate"}>
          <img
            src={mindmap}
            alt="Picture for previously made project"
            className="projectPicture"
          />
        </Link>
      </nav>
    </>
  );
}
