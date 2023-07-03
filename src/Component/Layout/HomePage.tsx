import { useState, useEffect } from "react";
import { Typography, IconButton, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Auth from "../../firebase.tsx";
import { getDownloadURL, ref, uploadBytes, getStorage, listAll } from "firebase/storage";

export default function HomePage() {
  const [projects, setProjects] = useState<{ id: string; downloadURL: string; }[]>([]);

  useEffect(() => {
    const user = Auth.currentUser;
    if (user) {
      const email = user.email;
      const storage = getStorage();
      const storageRef = ref(storage, `Uploads/${email}/Projects`);

      listAll(storageRef)
        .then((res) => {
          const promises = res.items.map((item) =>
            getDownloadURL(item).then((downloadURL) => ({
              id: item.name.replace(".csv", ""),
              downloadURL,
            }))
          );
          Promise.all(promises)
            .then((results) => {
              setProjects(results);
            })
            .catch((error) => {
              console.log("Error getting CSV download URLs:", error);
            });
        })
        .catch((error) => {
          console.log("Error listing CSV files:", error);
        });
    }
  }, []);


  function createNewCsv() {
    return new Promise((resolve, reject) => {
      const user = Auth.currentUser;
      const storage = getStorage();
  
      if (user) {
        const email = user.email;
        const storageRef = ref(storage, `Uploads/${email}/Projects`);
  
        const checkDuplicateName = (name:string, index:number) => {
          const fileName = index === 0 ? name : `${name} (${index})`;
          const newStorageRef = ref(storage, `Uploads/${email}/Projects/${fileName}.csv`);
  
          getDownloadURL(newStorageRef)
            .then(() => {
              // File with the same name exists, try with the next index
              checkDuplicateName(name, index + 1);
            })
            .catch(() => {
              // File with the same name does not exist, use this name
              resolve(fileName);
  
              const CsvId = Date.now().toString();
              const CsvData = CsvId;
              const blob = new Blob([CsvData], { type: "text/csv" });
  
              uploadBytes(newStorageRef, blob)
                .then(() => {
                  getDownloadURL(newStorageRef)
                    .then((downloadURL) => {
                      console.log("CSV file uploaded successfully. Download URL:", downloadURL);
                    })
                    .catch((error) => {
                      console.log("Error getting download URL:", error);
                    });
                })
                .catch((error) => {
                  console.log("Error uploading CSV file:", error);
                });
            });
        };
  
        // Prompt for CSV name
        let csvName = prompt("Enter a name for the CSV:") || "Untitled";
  
        // Check for duplicate names
        checkDuplicateName(csvName, 0);
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {projects.map((project) => (
          <Card key={project.id} style={{ width: "200px", margin: "10px" }}>
            <CardContent>
              <Typography variant="h5">{project.id}</Typography> 
              <Link to={`/NewProjectTemplate`}>
                View Project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>


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
