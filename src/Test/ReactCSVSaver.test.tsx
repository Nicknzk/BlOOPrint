import { render, screen, fireEvent } from "@testing-library/react";
import ReactCSVSaver from "../Component/ReactCSVSaver";
import "@testing-library/jest-dom";

jest.mock("papaparse", () => ({
  unparse: jest.fn(),
}));

describe("ReactCSVSaver", () => {
  it("should render the component with initial boxName value", () => {
    render(<ReactCSVSaver boxes={[]} />);
    const inputElement = screen.getByPlaceholderText("Type File Name Here");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("should update the boxName value on input change", () => {
    render(<ReactCSVSaver boxes={[]} />);
    const inputElement = screen.getByPlaceholderText("Type File Name Here");
    fireEvent.change(inputElement, { target: { value: "MyProject" } });
    expect(inputElement).toHaveValue("MyProject");
  });

  it("should call the handleDownload function on button click", () => {
    const mockHandleDownload = jest.fn();
    render(<ReactCSVSaver boxes={[]} />);
    const buttonElement = screen.getByText("Save");
    buttonElement.addEventListener("click", mockHandleDownload);
    fireEvent.click(buttonElement);
    expect(mockHandleDownload).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
