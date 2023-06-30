import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DragDrop from "./DragDrop";
import FlowMindMap from "./FlowMindMap";
import ReactCSVDownloader from "./ReactCSVDownloader";
import Papa from "papaparse";
import parseFiles from "./Auth/parser";
import { Link } from "react-router-dom";

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
    setReRenderCount((prevCount) => prevCount + 1);
  }, [boxes]);

  return (
    <>
      <div>
        <Typography variant="h2">New Project Page</Typography>
        <div>
          <div style={{ height: "500px", margin: "50px" }}>
            <FlowMindMap key={reRenderCount} boxes={boxes} />
          </div>
          <button
            className="contained"
            onClick={handleClearAll}
            style={{ color: "cyan", backgroundColor: "blue" }}
          >
            Clear All
          </button>
          <div>
            <DragDrop />
          </div>
        </div>
        <ReactCSVDownloader key={reRenderCount} boxes={boxes} />
        <Typography variant="h5">Upload CSV or JavaScript code</Typography>
        <input type="file" multiple onChange={handleFileUpload} />
        {data.length > 0 && <>{handleSetData()}</>}
        {parserData.length > 0 && <>{handleSetParserData()}</>}

        <nav>
          <Link
            className="ProjectDetails"
            to={{
              pathname: "/ProjectDetails",
              search: `?boxes=${encodeURIComponent(JSON.stringify(boxes))}`, // Pass boxes as a search parameter
            }}
          >
            <Typography variant="h5">View Project Details</Typography>
          </Link>
        </nav>
      </div>
      <div className="Container">
        <div>
          <input //this is the Name text box
            type="text"
            value={newBoxName}
            onChange={handleNewBoxNameChange}
            placeholder="Enter box name"
          />
          <button onClick={handleAddBox}>
            <Typography variant="h5">Add Box</Typography>
          </button>
        </div>
        {boxes.map((box) => (
          <div key={box.id} className="Box">
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
                onChange={(event) => setNewDependency(event.target.value)}
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
                    handleDependencyChange(box.id, index, event.target.value)
                  }
                />
                <button
                  onClick={() => handleDeleteDependency(box.id, dependency)}
                >
                  <Typography variant="h5">Delete Dependency</Typography>
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
                    handleMethodChange(box.id, index, event.target.value)
                  }
                />
                <button onClick={() => handleDeleteMethod(box.id, method)}>
                  <Typography variant="h5">Delete Method</Typography>
                </button>
              </div>
            ))}
            <button onClick={() => handleDeleteBox(box.id)}>
              <Typography variant="h5">Delete</Typography>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
