import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

function ProjectDetails() {
  const boxes = [
    {
      id: 1,
      name: "Box A",
      dependencies: ["Dependency A"],
      methods: ["Method A"],
    },
    {
      id: 2,
      name: "Box B",
      dependencies: ["Dependency B"],
      methods: ["Method B"],
    },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Entity Name:</th>
            <th>Methods:</th>
            <th>Dependencies:</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box) => (
            <tr key={box.id}>
              <td>{box.name}</td>
              <td>
                <ul>
                  {box.methods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {box.dependencies.map((dependency, index) => (
                    <li key={index}>{dependency}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

test("ProjectDetails renders Entity name, Methods, Dependencies", () => {
  const { getByText } = render(<ProjectDetails />);

  // Assert the presence of table headers
  expect(getByText("Entity Name:")).toBeInTheDocument();
  expect(getByText("Methods:")).toBeInTheDocument();
  expect(getByText("Dependencies:")).toBeInTheDocument();

  // Assert the presence of box names
  expect(getByText("Box A")).toBeInTheDocument();
  expect(getByText("Box B")).toBeInTheDocument();

  // Assert the presence of dependencies
  expect(getByText("Dependency A")).toBeInTheDocument();
  expect(getByText("Dependency B")).toBeInTheDocument();

  // Assert the presence of methods
  expect(getByText("Method A")).toBeInTheDocument();
  expect(getByText("Method B")).toBeInTheDocument();
});
