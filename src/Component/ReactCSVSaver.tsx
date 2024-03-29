import { useState } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import Papa from "papaparse";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Auth from "../firebase.tsx";

interface ReactCSVSaverProps {
  boxes: Box[];
}

interface Box {
  id: number;
  name: string;
  dependencies: string[];
  methods: string[];
}

export default function ReactCSVSaver({ boxes }: ReactCSVSaverProps) {
  const arrayBoxes = boxes.map((box) => [
    box.id,
    box.name,
    box.dependencies.join(", "),
    box.methods.join(", "),
  ]);
  const csvData = [["id", "name", "dependencies", "methods"], ...arrayBoxes];
  const [boxName, setBoxName] = useState("");

  const handleNewBoxNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBoxName(event.target.value);
  };

  const handleSubmit = () => {
    if (boxName.trim() === "") {
      setBoxName("Project");
    }
  };

  const uploadCSVToFirebase = async (csvData: string, filename: string) => {
    try {
      const user = Auth.currentUser;
      if (user) {
        const email = user.email;
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `Uploads/${email}/Projects/${filename}`
        );
        const blob = new Blob([csvData], { type: "text/csv" });
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(
          "CSV file uploaded successfully. Download URL:",
          downloadURL
        );
        // Perform any further actions with the download URL
        window.alert("CSV file saved and uploaded successfully!");
      } else {
        throw new Error("User not logged in");
      }
    } catch (error) {
      console.error("Error uploading CSV file:", error);
    }
  };

  const handleDownload = () => {
    handleSubmit();
    const csvDataString = Papa.unparse(csvData);
    const csvFilename = `${boxName}.csv`;
    uploadCSVToFirebase(csvDataString, csvFilename);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography
            variant="h3"
            style={{
              marginRight: "10px",
              color: "white",
              marginLeft: "100px",
              marginTop: "30px",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Project Name:
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: "30px" }}>
          <TextField
            type="text"
            value={boxName}
            onChange={handleNewBoxNameChange}
            placeholder="Type File Name Here"
            style={{
              fontSize: "2.0rem",
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "8px",
              width: "300px",
            }}
          />
        </Grid>
        <Grid item style={{ marginTop: "30px" }}>
          <Button
            onClick={handleDownload}
            style={{
              backgroundColor: "white",
              color: "black",
              textTransform: "none",
              borderRadius: "4px",
            }}
          >
            <Typography variant="h5">Save</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
