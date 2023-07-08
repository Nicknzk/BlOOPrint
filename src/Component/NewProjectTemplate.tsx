import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlowMindMap from "./FlowMindMap";
import ReactCSVDownloader from "./ReactCSVDownloader";
import Papa from "papaparse";
import parseFiles from "./Auth/parser";
import { Link, useParams } from "react-router-dom";
import ReactCSVSaver from "./ReactCSVSaver";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import Auth from "../firebase.tsx";
import QuestionMark from './QuestionMark';

export interface Box {
  id: number;
  name: string;
  dependencies: string[];
  methods: string[];
}

interface CSVRow {
  id: number;
  name: string;
  dependencies: string;
  methods: string;
}

export default function NewProjectTemplate() {
  const [boxes, setBoxes] = useState<Box[]>([]); //array of boxes
  const [newBoxName, setNewBoxName] = useState(""); //variable to allow names to be added
  const [newDependency, setNewDependency] = useState(""); //variable to allow new dependencies to be added
  const [newMethod, setNewMethod] = useState("");
  const [reRenderCount, setReRenderCount] = useState(0);
  const [data, setData] = useState<Box[]>([]); //parsing for ReactCSVUploader
  const [parserData, setParserData] = useState([]); //for Parser.tsx
  const { projectName } = useParams();
  const [csvDownloadURL, setCsvDownloadURL] = useState("");

  const handleParsedData = (data: any) => {
    setParserData(data);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null; // Add null check for e.target.files
    const fileExtension = file ? file.name.split(".").pop() : null; // Add null check for file

    const multipleFiles = e.target.files ? Array.from(e.target.files) : [];

    if (fileExtension === "csv") {
      Papa.parse(file as File, {
        header: true,
        complete: (results: Papa.ParseResult<CSVRow>) => {
          const parsedData = results.data.map((row) => {
            const dependencies = row.dependencies.split(",");
            const methods = row.methods.split(",");
            return {
              id: row.id,
              name: row.name,
              dependencies: dependencies,
              methods: methods,
            };
          });
          setData(parsedData);
        },
      });
    } else {
      parseFiles(multipleFiles, handleParsedData); // Call your parseFiles function with the file and handleParsedData callback
    }
  };

  const handleSetParserData = () => {
    setBoxes([...boxes, ...parserData]);
    setParserData([]);
  };

  const handleSetData = () => {
    setBoxes([...boxes, ...data]);
    setData([]);
  };

  const handleNewBoxNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBoxName(event.target.value);
  };

  const handleAddBox = () => {
    if (newBoxName.trim() !== "") {
      const newBox: Box = {
        id: Date.now() * Math.floor(Math.random() * 1000000), //unique number generated from the system time
        name: newBoxName,
        dependencies: [], //box is initialised without dependancies first
        methods: [],
      };
      setBoxes([...boxes, newBox]); //box is added to the array of boxes
      setNewBoxName(""); //empty out the newBoxName variable
      setReRenderCount((prevCount) => prevCount + 1);
    }
  };

  const handleAddDependency = (boxId: number) => {
    //based on the box id to prevent boxes with similar name from confusing the program
    const selectedBox = boxes.find((box) => box.id === boxId);
    if (selectedBox && newDependency.trim() !== "") {
      const updatedBoxes = boxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            dependencies: [...box.dependencies, newDependency.trim()], //this portion uses a similar concept as 2 dimentional arrays to store dependancies
          };
        }
        return box;
      });
      setBoxes(updatedBoxes);
      setNewDependency(""); //empty out the newDependency variable
    }
  };

  const handleDeleteBox = (boxId: number) => {
    const updatedBoxes = boxes.filter((box) => box.id !== boxId);
    setBoxes(updatedBoxes); //empty out...
  };

  const handleDeleteDependency = (boxId: number, dependency: string) => {
    //tranverses the array of dependencies of the given box to remove a specific one
    const updatedBoxes = boxes.map((box) => {
      if (box.id === boxId) {
        return {
          ...box,
          dependencies: box.dependencies.filter((dep) => dep !== dependency),
        };
      }
      return box;
    });
    setBoxes(updatedBoxes); //empty out...
  };

  const handleAddMethod = (boxId: number) => {
    const selectedBox = boxes.find((box) => box.id === boxId);
    if (selectedBox && newMethod.trim() !== "") {
      const updatedBoxes = boxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            methods: [...box.methods, newMethod.trim()],
          };
        }
        return box;
      });
      setBoxes(updatedBoxes);
      setNewMethod("");
    }
  };

  const handleDeleteMethod = (boxId: number, method: string) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === boxId) {
        return {
          ...box,
          methods: box.methods.filter((m) => m !== method),
        };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  const handleDependencyChange = (
    boxId: number,
    index: number,
    value: string
  ) => {
    //updates the name of a dependency in a specific box
    const updatedBoxes = boxes.map((box) => {
      if (box.id === boxId) {
        const dependencies = [...box.dependencies];
        dependencies[index] = value;
        return {
          ...box,
          dependencies,
        };
      }
      return box;
    });
    setBoxes(updatedBoxes); //empty out...
  };

  const handleMethodChange = (boxId: number, index: number, value: string) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === boxId) {
        const methods = [...box.methods];
        methods[index] = value;
        return {
          ...box,
          methods,
        };
      }
      return box;
    });
    setBoxes(updatedBoxes);
  };

  const handleClearAll = () => {
    setBoxes([]);
  };

  useEffect(() => {
    const user = Auth.currentUser;
    if (user) {
      const email = user.email;
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `Uploads/${email}/Projects/${projectName}.csv`
      );

      getDownloadURL(storageRef)
        .then((downloadURL) => {
          setCsvDownloadURL(downloadURL);
        })
        .catch((error) => {
          console.log("Error getting CSV download URL:", error);
        });
    }
  }, [projectName]);

  useEffect(() => {
    setReRenderCount((prevCount) => prevCount + 1);
  }, [boxes]);

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to left, #054A91, #007bff)",
          minHeight: "100vh",
          paddingBottom: "50px",
        }}
      >
        <Typography
          variant="h1"
          style={{
            marginLeft: "50px",
            paddingTop: "0",
            fontSize: "120px",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textShadow: "12px 6px 4px rgba(0, 0, 0, 0.5)",
            marginBottom: "0",
            float: "left",
          }}
        >
          BLOOPrint
        </Typography>
        <div style={{ position: "absolute", right: "50px" }}>
          <ReactCSVSaver boxes={boxes} />
        </div>
        <div style={{}}>
          <TableContainer
            component={Paper}
            style={{
              marginTop: "20px",
              borderRadius: "30px",
              paddingLeft: "20px",
              width: "900px",
              clear: "both",
              marginLeft: "50px",
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <Typography
                      variant="h4"
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                    >
                      Instructions:
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ alignItems: "center" }}>
                    <Typography variant="h6">
                      Download CSV & Upload it to render it in the mindmap
                    </Typography>
                    <QuestionMark instructions="Hover over the question mark to see instructions." />
                  </TableCell>
                  <TableCell>
                    <Button
                      href={csvDownloadURL}
                      download={`${projectName}.csv`}
                      variant="contained"
                      style={{
                        textDecoration: "none",
                        backgroundColor: "blue",
                        color: "white",
                      }}
                    >
                      <Typography variant="h5">Existing CSV</Typography>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">
                      Upload CSV / JavaScript Code
                    </Typography>
                    <QuestionMark instructions="Hover over the question mark to see instructions." />
                  </TableCell>
                  <TableCell>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "blue",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "white",
                      }}
                    />
                    {data.length > 0 && <>{handleSetData()}</>}
                    {parserData.length > 0 && <>{handleSetParserData()}</>}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">
                      Click to download current mindmap as a CSV File
                    </Typography>
                    <QuestionMark instructions="Hover over the question mark to see instructions." />
                  </TableCell>
                  <TableCell>
                    <ReactCSVDownloader key={reRenderCount} boxes={boxes} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">
                      Click to view project details
                    </Typography>
                    <QuestionMark instructions="Hover over the question mark to see instructions." />
                  </TableCell>
                  <TableCell>
                    <nav>
                      <Button
                        className="ProjectDetails"
                        to={{
                          pathname: "/ProjectDetails",
                          search: `?boxes=${encodeURIComponent(
                            JSON.stringify(boxes)
                          )}`,
                        }}
                        component={Link}
                        variant="contained"
                        style={{
                          textDecoration: "none",
                          backgroundColor: "blue",
                          color: "white",
                        }}
                      >
                        <Typography variant="h5">
                          View Project Details
                        </Typography>
                      </Button>
                    </nav>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <div style={{ height: "500px", margin: "50px" }}>
              <FlowMindMap key={reRenderCount} boxes={boxes} />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ marginTop: "15%" }}>
              <Button
                className="contained"
                onClick={handleClearAll}
                style={{ color: "cyan", backgroundColor: "blue" }}
              >
                Clear All
              </Button>
            </div>
          </Grid>
        </Grid>
        <div
          style={{ marginTop: "15%", marginLeft: "50px" }}
          className="Container"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <input //this is the Name text box
              type="text"
              value={newBoxName}
              onChange={handleNewBoxNameChange}
              placeholder="Enter box name"
              style={{ width: "300px", height: "50px" }}
            />
            <button onClick={handleAddBox} style={{ marginLeft: "5px" }}>
              <Typography variant="h4" style={{ marginTop: "5px" }}>
                Add Box
              </Typography>
            </button>
          </div>
          <div style={{ padding: "20px" }}>
            <Grid container spacing={2}>
              {boxes.map((box) => (
                <Grid item xs={4} key={box.id}>
                  <div
                    key={box.id}
                    className="Box"
                    style={{
                      padding: "20px",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                  >
                    <input
                      type="text"
                      value={box.name}
                      onChange={(event) => {
                        const updatedBoxes = boxes.map((b) => {
                          //the b variable simply refers to an arbitrary box
                          if (b.id === box.id) {
                            return { ...b, name: event.target.value };
                          }
                          return b;
                        });
                        setBoxes(updatedBoxes); //empty out...
                      }}
                    />
                    <div>
                      <input
                        type="text"
                        value={newDependency}
                        onChange={(event) =>
                          setNewDependency(event.target.value)
                        }
                        placeholder="Enter dependency"
                      />
                      <button onClick={() => handleAddDependency(box.id)}>
                        <Typography variant="h5">Add Dependencies</Typography>
                      </button>
                    </div>
                    {box.dependencies.map((dependency, index) => (
                      <div key={dependency}>
                        <input
                          type="text"
                          value={dependency}
                          onChange={(event) =>
                            handleDependencyChange(
                              box.id,
                              index,
                              event.target.value
                            )
                          }
                        />
                        <button
                          onClick={() =>
                            handleDeleteDependency(box.id, dependency)
                          }
                        >
                          <Typography variant="h5">
                            Delete Dependency
                          </Typography>
                        </button>
                      </div>
                    ))}
                    <div>
                      <input
                        type="text"
                        value={newMethod}
                        onChange={(event) => setNewMethod(event.target.value)}
                        placeholder="Enter method"
                      />
                      <button onClick={() => handleAddMethod(box.id)}>
                        <Typography variant="h5">Add Method</Typography>
                      </button>
                    </div>
                    {box.methods.map((method, index) => (
                      <div key={method}>
                        <input
                          type="text"
                          value={method}
                          onChange={(event) =>
                            handleMethodChange(
                              box.id,
                              index,
                              event.target.value
                            )
                          }
                        />
                        <button
                          onClick={() => handleDeleteMethod(box.id, method)}
                        >
                          <Typography variant="h5">Delete Method</Typography>
                        </button>
                      </div>
                    ))}
                    <button onClick={() => handleDeleteBox(box.id)}>
                      <Typography variant="h5">Delete</Typography>
                    </button>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
