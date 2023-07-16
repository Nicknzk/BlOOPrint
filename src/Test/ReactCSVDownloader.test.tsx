/*
import { render, screen, fireEvent } from "@testing-library/react";
import ReactCSVDownloader from "../Component/ReactCSVDownloader";

describe("ReactCSVDownloader", () => {
  it("should render the component with initial boxName value", () => {
    render(<ReactCSVDownloader boxes={[]} />);
    const inputElement = screen.getByPlaceholderText("Type File Name Here");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("should update the boxName value on input change", () => {
    render(<ReactCSVDownloader boxes={[]} />);
    const inputElement = screen.getByPlaceholderText("Type File Name Here");
    fireEvent.change(inputElement, { target: { value: "MyProject" } });
    expect(inputElement).toHaveValue("MyProject");
  });

  it("should call the handleSubmit function on CSVLink click", () => {
    const mockHandleSubmit = jest.fn();
    render(<ReactCSVDownloader boxes={[]} />);
    const csvLinkElement = screen.getByText("Download");
    csvLinkElement.addEventListener("click", mockHandleSubmit);
    fireEvent.click(csvLinkElement);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
*/
