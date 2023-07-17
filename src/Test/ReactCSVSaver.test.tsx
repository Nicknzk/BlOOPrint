import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

interface Box {
  id: number;
  name: string;
  dependencies: string[];
  methods: string[];
}

export default function ReactCSVSaver({ boxes }: { boxes: Box[] }) {
  const [boxName, setBoxName] = useState("");

  const handleNewBoxNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBoxName(event.target.value);
  };

  console.log(boxes);

  const handleDownload = () => {
    // Simulate file upload logic
    console.log(`Uploading ${boxName}.csv`);
  };

  return (
    <div>
      <input
        type="text"
        value={boxName}
        onChange={handleNewBoxNameChange}
        placeholder="Type File Name Here"
      />
      <button onClick={handleDownload}>Save</button>
    </div>
  );
}

test('Clicking "Save" button triggers file upload', () => {
  const { getByPlaceholderText, getByText } = render(
    <ReactCSVSaver boxes={[]} />
  );

  // Enter file name in the text field
  const fileNameInput = getByPlaceholderText("Type File Name Here");
  fireEvent.change(fileNameInput, { target: { value: "TestFile" } });

  // Capture the console.log output
  const consoleLogSpy = jest.spyOn(console, "log");
  consoleLogSpy.mockImplementation(() => {});

  // Simulate a click on the "Save" button
  const saveButton = getByText("Save");
  fireEvent.click(saveButton);

  // Assert that the console.log output matches the expected value
  expect(consoleLogSpy).toHaveBeenCalledWith("Uploading TestFile.csv");

  // Restore the original console.log implementation
  consoleLogSpy.mockRestore();
});
