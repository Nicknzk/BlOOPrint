import { Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import examplechart from '../Images/colorful-circles-flowchart.png';
import Auth from "../../firebase.tsx";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";

export default function HomePage() {
  function createNewCsv() {
    return new Promise((resolve, reject) => {
      const CsvId = Date.now().toString();
      const user = Auth.currentUser;
      const storage = getStorage();

      if (user) {
        const email = user.email;
        const CsvData = "Email:" + email;
        const storageRef = ref(storage, `Uploads/${email}/${CsvId}.csv`);
        const blob = new Blob([CsvData], { type: "text/csv" });

        uploadBytes(storageRef, blob)
          .then(() => {
            getDownloadURL(storageRef)
              .then((downloadURL) => {
                console.log("CSV file uploaded successfully. Download URL:", downloadURL);
                resolve(CsvId); // Resolve the promise with the CSV ID
              })
              .catch((error) => {
                console.log("Error getting download URL:", error);
                reject(error); // Reject the promise if there is an error
              });
          })
          .catch((error) => {
            console.log("Error uploading CSV file:", error);
            reject(error); // Reject the promise if there is an error
          });
      } else {
        reject(new Error("User not logged in")); // Reject the promise if the user is not logged in
      }
    });
  }

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
          <Link to={`/NewProjectTemplate`} onClick={() => { createNewCsv()
                .then((csvId) => {
                  console.log("CSV ID:", csvId);
                  // Perform any further actions with the CSV ID
                })
                .catch((error) => {
                  console.log("Error creating CSV file:", error);
                })

          }}>
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
