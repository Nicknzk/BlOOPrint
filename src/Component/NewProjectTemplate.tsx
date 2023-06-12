//location of samuel app.tsx

import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { ArcherContainer, ArcherElement } from "react-archer";
import DragDrop from "./DragDrop";
//import { Padding } from "@mui/icons-material";
//React Flow
import FlowMindMap from "./FlowMindMap";
import ReactCSVDownloader from "./ReactCSVDownloader";
import Papa from "papaparse";

//for the archer
//const rootStyle = { display: "flex", justifyContent: "center" }; //supposedly they use this as the center

/*
const roleStyle = {
  margin: "200px 0",
  display: "flex",
  justifyContent: "space-between",
};
const boxStyle = { padding: "10px", border: "1px solid black" };
*/
export interface Box {
  id: number;
  name: string;
  dependencies: string[];
}

interface CSVRow {
  id: number;
  name: string;
  dependencies: string;
}

/*
uploadedBoxes: Box[] = []
if (uploadedBoxes.length > 0) {
    //if argument has something, it will update the system
    setBoxes([...boxes, ...uploadedBoxes]);
  }
*/

export default function NewProjectTemplate() {
  const [boxes, setBoxes] = useState<Box[]>([]); //array of boxes
  const [newBoxName, setNewBoxName] = useState(""); //variable to allow names to be added
  const [newDependency, setNewDependency] = useState(""); //variable to allow new dependencies to be added
  const [reRenderCount, setReRenderCount] = useState(0);

  const [data, setData] = useState<Box[]>([]); //parsing

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results: Papa.ParseResult<CSVRow>) => {
        const parsedData = results.data.map((row) => {
          const dependencies = row.dependencies.split(","); // Split dependencies by commas
          return {
            id: row.id,
            name: row.name,
            dependencies: dependencies,
          };
        });
        setData(parsedData);
      },
    });
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

  const handleIncrementReRenderCount = () => {
    setReRenderCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    setReRenderCount((prevCount) => prevCount + 1);
  }, [boxes]);

  return (
    <>
      <Typography variant="h2">New Project Page</Typography>
      <div className="Container">
        <div>
          <input //this is the Name text box
            type="text"
            value={newBoxName}
            onChange={handleNewBoxNameChange}
            placeholder="Enter box name"
          />
          <button onClick={handleAddBox}>Add Box</button>
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
                Add Dependency
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
                  Delete Dependency
                </button>
              </div>
            ))}
            <button onClick={() => handleDeleteBox(box.id)}>Delete</button>
          </div>
        ))}
        <button
          className="contained"
          onClick={handleIncrementReRenderCount}
          style={{ color: "cyan", backgroundColor: "blue" }}
          //this is incase it doesnt rerender
        >
          Increment ReRender Count
        </button>
        <div style={{ height: "500px", margin: "50px" }}>
          <FlowMindMap key={reRenderCount} boxes={boxes} />
        </div>
        <div>
          <DragDrop />
        </div>
      </div>
      <ReactCSVDownloader key={reRenderCount} boxes={boxes} />
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {console.log(data.length ? data : null)}
      {data.length ? handleSetData() : null}
    </>
  );
}

/*
          <ArcherContainer>
            {boxes.map((box) =>
              box.dependencies.map((dependency) => (
                <div key={dependency}>
                  <div style={roleStyle}>
                    <ArcherElement
                      id={box.name}
                      relations={[
                        {
                          targetId: dependency,
                          targetAnchor: "top",
                          sourceAnchor: "bottom",
                          style: { strokeDasharray: "5,5" },
                        },
                      ]}
                    >
                      <div style={boxStyle}>{box.name}</div>
                    </ArcherElement>
                  </div>
                </div>
              ))
            )}
          </ArcherContainer>
          //
*/
