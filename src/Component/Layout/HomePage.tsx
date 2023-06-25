import { Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import examplechart from '../Images/colorful-circles-flowchart.png';

export default function HomePage() {
  return (
    <>
    <div style={{background:'#054A91', paddingBottom:"1000px"}}>
      <Typography variant="h2" style={{marginBottom:'100px'}}>Home</Typography>

      <Typography variant="h4">Existing Projects</Typography>
      <nav>
        <Link to={"/ProjectTemplate"}>
          <img
            src={examplechart}
            alt="Picture for previously made project"
            className="projectPicture"
            style={{marginBottom:'100px'}}
          />
        </Link>
      </nav>

      <div>
        <Typography variant="h4">Create new project</Typography>
        <nav>
          <Link to={"/NewProjectTemplate"}>
          <IconButton color="primary" aria-label="add" style={{fontSize: '64px', width: '100px', height: '100px'}}>
      <AddIcon style={{fontSize:"100px", color:""}} />
    </IconButton>
          </Link>
        </nav>
      </div>
      </div>
    </>
  );
}
