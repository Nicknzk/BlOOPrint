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

export default function App() {
  return (
    <>
      <div className="app-standard">
        <Navigation />
        <div>
          <Routes>
            <Route path="/" element={<LogInIntroduction />} />
            <Route
              path="/SignIn"
              element={
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <SignIn />
                </div>
              }
            />
            <Route
              path="/SignUp"
              element={
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <SignUp />
                </div>
              }
            />
            <Route path="/HomePage" element={<HomePage />} />
            <Route
              path="/NewProjectTemplate"
              element={<NewProjectTemplate />}
            />
            <Route path="/ProjectTemplate" element={<ProjectTemplate />} />
          </Routes>
        </div>
        <div className="permanent-icon-at-side">
          <Icon />
        </div>
      </div>
    </>
  );
}
