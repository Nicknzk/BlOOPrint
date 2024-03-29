import { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Auth from "../../firebase.tsx";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
  listAll,
  deleteObject,
} from "firebase/storage";
import { Button } from "react-bootstrap";

export default function HomePage() {
  const [projects, setProjects] = useState<
    { id: string; downloadURL: string }[]
  >([]);

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
        const checkDuplicateName = (name: string, index: number) => {
          const fileName = index === 0 ? name : `${name} (${index})`;
          const newStorageRef = ref(
            storage,
            `Uploads/${email}/Projects/${fileName}.csv`
          );

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
                      console.log(
                        "CSV file uploaded successfully. Download URL:",
                        downloadURL
                      );
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
      } else {
        reject(new Error("User not logged in")); // Reject the promise if the user is not logged in
      }
    });
  }

  async function deleteFile(storagePath: string) {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, storagePath);

      // Delete the file
      await deleteObject(fileRef);
      window.location.reload();
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to left, #054A91, #007bff)",
          minHeight: "100vh",
          paddingBottom: "100px",
        }}
      >
        <Typography
          variant="h1"
          style={{
            marginLeft: "150px",
            paddingTop: "30px",
            fontSize: "120px",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textShadow: "8px 4px 2px rgba(0, 0, 0, 0.5)",
            marginBottom: "40px",
          }}
        >
          BLOOPrint Homepage
        </Typography>
        <div className="Mindmap-instructions">
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TableContainer
                component={Paper}
                style={{
                  marginTop: "3.5vh",
                  borderRadius: "2vh",
                  paddingLeft: "1%",
                  paddingRight: "1%",

                  clear: "both",
                  width: "66.6%",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={2}>
                        <Typography
                          variant="h4"
                          style={{ marginLeft: "auto", marginRight: "auto" }}
                        >
                          Instructions:
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="h6">
                          Click "Go to Mindmap" to start a new project
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="h6">
                          Download save files and upload in "Go to Mindmap" to
                          render entities
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "6.5vh",
                  marginTop: "2vh",
                }}
              >
                Go to Mindmap:
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <nav>
                  <Link
                    to={`/NewProjectTemplate`}
                    onClick={() => {
                      createNewCsv()
                        .then((csvId) => {
                          console.log("CSV ID:", csvId);
                          // Perform any further actions with the CSV ID
                        })
                        .catch((error) => {
                          console.log("Error creating CSV file:", error);
                        });
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="add"
                      style={{
                        width: "150px",
                        height: "150px",
                        backgroundColor: "#ECA400",
                      }}
                    >
                      <AddIcon
                        style={{ fontSize: "100px", color: "#FFFFFF" }}
                      />
                    </IconButton>
                    <Typography
                      variant="h5"
                      style={{
                        color: "#FFFFFF",
                        marginTop: "10px",
                        justifyContent: "center",
                        marginLeft: "20px",
                      }}
                    >
                      Click Here!
                    </Typography>
                  </Link>
                </nav>
              </div>
            </Grid>
          </Grid>
        </div>
        <Typography
          variant="h4"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            fontSize: "6.5vh",
            marginTop: "5vh",
          }}
        >
          Previous Saves (CSV files)
        </Typography>
        <div
          style={{
            border: "2px solid white",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {projects.map((project) => (
              <Card key={project.id} style={{ width: "300px", margin: "10px" }}>
                <CardContent>
                  <div style={{ float: "left" }}>
                    <Typography variant="h5" style={{ wordWrap: "break-word" }}>
                      {project.id}
                    </Typography>
                    <a
                      href={project.downloadURL}
                      download={`${project.id}.csv`}
                    >
                      <Typography variant="h6">Download</Typography>
                    </a>
                  </div>

                  <Button
                    style={{
                      color: "black",
                      background: "red",
                      marginTop: "10px",
                      marginLeft: "30px",
                    }}
                    onClick={() =>
                      deleteFile(
                        `Uploads/${Auth.currentUser?.email}/Projects/${project.id}.csv`
                      )
                    }
                  >
                    <Typography variant="h6">Delete</Typography>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
