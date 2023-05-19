import "./App.css";
import LogInIntroduction from "./Component/LogInIntroduction";
import LogInSignIn from "./Component/LogInSignIn";
import LogInSignUp from "./Component/LogInSignUp";
import Navigation from "./Component/Navigation";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<LogInIntroduction />} />
          <Route path="/LogInSignIn" element={<LogInSignIn />} />
          <Route path="/LogInSignUp" element={<LogInSignUp />} />
        </Routes>
      </div>
    </>
  );
}
