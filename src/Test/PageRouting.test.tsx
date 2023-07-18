import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const MockHomePage = () => {
  return <div>Mocked HomePage</div>;
};

const MockSignIn = () => {
  return <div>Mocked SignIn</div>;
};

console.log(MockHomePage);
console.log(MockSignIn);

test("Navigation to HomePage", () => {
  render(
    <MemoryRouter initialEntries={["/HomePage"]}>
      <Routes>
        <Route path="/HomePage" element={<MockHomePage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Mocked HomePage")).toBeInTheDocument();
});

test("Navigation to SignIn", () => {
  render(
    <MemoryRouter initialEntries={["/SignIn"]}>
      <Routes>
        <Route path="/SignIn" element={<MockSignIn />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Mocked SignIn")).toBeInTheDocument();
});
