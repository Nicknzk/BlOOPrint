import "./App.css";
import HomePage from "./Component/HomePage";
import LogInIntroduction from "./Component/LogInIntroduction";
import SignIn from "./Component/Auth/SignIn";
import SignUp from "./Component/Auth/SignUp";
import Navigation from "./Component/Navigation";
import { Route, Routes } from "react-router-dom";
import NewProjectTemplate from "./Component/NewProjectTemplate";
import ProjectTemplate from "./Component/ProjectTemplate";
import Icon from "./Component/Icon";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <>
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<LogInIntroduction />} />
          <Route
            path="/SignIn"
            element={
              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <SignIn />
                </div>
              </Container>
            }
          />
          <Route
            path="/SignUp"
            element={
              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <SignUp />
                </div>
              </Container>
            }
          />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/NewProjectTemplate" element={<NewProjectTemplate />} />
          <Route path="/ProjectTemplate" element={<ProjectTemplate />} />
        </Routes>
      </div>
      <div className="hi">
        <Icon />
      </div>
    </>
  );
}
