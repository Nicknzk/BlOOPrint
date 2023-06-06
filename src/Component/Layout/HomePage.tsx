import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../../CSS-Folder/HomePage.css";
import MindMap from "../Images/MindMap.webp";

export default function HomePage() {
  return (
    <>
      <p className="HomePage-welcome">BLOOPrint Homepage</p>
      <div>
        <Typography variant="h2">Create new project</Typography>
        <nav>
          <Link to={"/NewProjectTemplate"}>
            <img
              src="src/Component/Images/button-plus-icon-vector-better.png"
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
            src={MindMap}
            alt="Picture for previously made project"
            className="projectPicture"
          />
        </Link>
      </nav>
    </>
  );
}
