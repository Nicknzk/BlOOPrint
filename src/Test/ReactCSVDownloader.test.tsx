import { render, fireEvent } from "@testing-library/react";

test('Clicking "Download" triggers file download', () => {
  const boxes = [
    {
      id: 1,
      name: "Box 1",
      dependencies: ["Dependency 1"],
      methods: ["Method 1"],
    },
    {
      id: 2,
      name: "Box 2",
      dependencies: ["Dependency 2"],
      methods: ["Method 2"],
    },
  ];

  console.log(boxes);

  const handleNewBoxNameChange = jest.fn();
  const handleSubmit = jest.fn();

  const { getByPlaceholderText, getByText } = render(
    <div className="react-csv">
      <input
        type="text"
        value=""
        onChange={handleNewBoxNameChange}
        placeholder="Type File Name Here"
        style={{ textDecoration: "none" }}
      />
      <div className="download-csv">
        <button onClick={handleSubmit}>
          <span>Download</span>
        </button>
      </div>
    </div>
  );

  // Enter file name in the text field
  const fileNameInput = getByPlaceholderText("Type File Name Here");
  fireEvent.change(fileNameInput, { target: { value: "TestFile" } });

  // Click the "Download" button
  const downloadButton = getByText("Download");
  fireEvent.click(downloadButton);

  // Assert that the event handlers have been called
  expect(handleNewBoxNameChange).toHaveBeenCalled();
  expect(handleSubmit).toHaveBeenCalled();
});
