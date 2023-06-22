import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <p className="HomePage-welcome">BLOOPrint Homepage</p>
      <div>
        <Typography variant="h2">Create new project</Typography>
        <nav>
          <Link to={"/NewProjectTemplate"}>
            <img
              //src={}
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
            //src={}
            alt="Picture for previously made project"
            className="projectPicture"
          />
        </Link>
      </nav>
    </>
  );
}
