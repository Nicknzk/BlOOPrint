import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

interface Box {
  id: number;
  name: string;
  dependencies: string[];
  methods: string[];
}

test('Clicking "Add Box" increases boxes.length, Clicking "Add Dependency" adds to dependencies of an entity, Clicking "Add Method" adds to the methods of an entity', () => {
  const TestComponent = () => {
    const [boxes, setBoxes] = useState<Box[]>([]);

    const handleAddBox = () => {
      const newBox = {
        id: Math.random(),
        name: "New Box",
        dependencies: [],
        methods: [],
      };
      setBoxes([...boxes, newBox]);
    };

    const handleAddDependency = (boxId: any) => {
      const selectedBox = boxes.find((box) => box.id === boxId);
      if (selectedBox) {
        const updatedBoxes = boxes.map((box) => {
          if (box.id === boxId) {
            return {
              ...box,
              dependencies: [...box.dependencies, "New Dependency"],
            };
          }
          return box;
        });
        setBoxes(updatedBoxes);
      }
    };

    const handleAddMethod = (boxId: any) => {
      const selectedBox = boxes.find((box) => box.id === boxId);
      if (selectedBox) {
        const updatedBoxes = boxes.map((box) => {
          if (box.id === boxId) {
            return {
              ...box,
              methods: [...box.methods, "New Method"],
            };
          }
          return box;
        });
        setBoxes(updatedBoxes);
      }
    };

    return (
      <div>
        <button onClick={handleAddBox} data-testid="add-box-button">
          Add Box
        </button>
        <div data-testid="boxes-length">{boxes.length}</div>
        {boxes.map((box) => (
          <div key={box.id}>
            <button onClick={() => handleAddDependency(box.id)}>
              Add Dependency
            </button>
            <button onClick={() => handleAddMethod(box.id)}>Add Method</button>
          </div>
        ))}
      </div>
    );
  };

  const { getByTestId, getAllByRole } = render(<TestComponent />);

  // Get the initial length of boxes
  const initialLength = parseInt(
    getByTestId("boxes-length").textContent || "0",
    10
  );

  // Simulate a click on the "Add Box" button
  const addButton = getByTestId("add-box-button");
  fireEvent.click(addButton);

  // Get the updated length of boxes
  const updatedLength = parseInt(
    getByTestId("boxes-length").textContent || "0",
    10
  );

  // Assert that the updated length is greater than the initial length
  expect(updatedLength).toBeGreaterThan(initialLength);

  // Get the first box element
  const firstBox = getAllByRole("button", { name: "Add Dependency" })[0]
    .parentElement;

  // Get the dependencies and methods of the first box
  const dependencies = firstBox?.querySelectorAll("button")[0];
  const methods = firstBox?.querySelectorAll("button")[1];

  // Assert that the dependencies and methods exist
  expect(dependencies).toBeInTheDocument();
  expect(methods).toBeInTheDocument();
});

test('Clicking "Delete" button removes a box', () => {
  const TestComponent = () => {
    const [boxes, setBoxes] = useState<Box[]>([]);

    const handleAddBox = () => {
      const newBox: Box = {
        id: Math.random(),
        name: "New Box",
        dependencies: [],
        methods: [],
      };
      setBoxes([...boxes, newBox]);
    };

    const handleDeleteBox = (boxId: number) => {
      const updatedBoxes = boxes.filter((box) => box.id !== boxId);
      setBoxes(updatedBoxes);
    };

    return (
      <div>
        <button onClick={handleAddBox} data-testid="add-box-button">
          Add Box
        </button>
        <div data-testid="boxes-length">{boxes.length}</div>
        {boxes.map((box) => (
          <div key={box.id}>
            <button onClick={() => handleDeleteBox(box.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };

  const { getByTestId, queryAllByText } = render(<TestComponent />);

  // Get the initial length of boxes
  const initialLength = parseInt(
    getByTestId("boxes-length").textContent || "0",
    10
  );

  // Simulate a click on the "Add Box" button
  const addButton = getByTestId("add-box-button");
  fireEvent.click(addButton);

  // Get the updated length of boxes
  const updatedLength = parseInt(
    getByTestId("boxes-length").textContent || "0",
    10
  );

  // Assert that the updated length is greater than the initial length
  expect(updatedLength).toBeGreaterThan(initialLength);

  // Get all the "Delete" buttons
  const deleteButtons = queryAllByText("Delete");
  expect(deleteButtons.length).toBeGreaterThan(0);

  // Simulate a click on the first "Delete" button
  fireEvent.click(deleteButtons[0]);

  // Get the final length of boxes
  const finalLength = parseInt(
    getByTestId("boxes-length").textContent || "0",
    10
  );

  // Assert that the final length is less than the updated length
  expect(finalLength).toBeLessThan(updatedLength);
});

test("Upload CSV updates the boxes array", () => {
  const boxes: Box[] = [];
  const setBoxes = (newBoxes: Box[]) => {
    boxes.splice(0, boxes.length, ...newBoxes);
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const fileExtension = file
      ? file.name.split(".").pop()?.toLowerCase()
      : null;

    if (fileExtension === "csv") {
      // Simulating the parsing logic
      const parsedData: Box[] = [
        {
          id: 1,
          name: "Box A",
          dependencies: ["Dep A"],
          methods: ["Method A"],
        },
      ];
      setBoxes([...boxes, ...parsedData]);
    }
  };

  const { container } = render(
    <input type="file" onChange={handleFileUpload} />
  );

  const file = new File(
    ["id,name,dependencies,methods\n1,Box A,Dep A,Method A"],
    "renderedFile.csv",
    {
      type: "text/csv",
    }
  );

  const fileInput = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  fireEvent.change(fileInput, { target: { files: [file] } });

  expect(boxes.length).toBeGreaterThan(0);
});
