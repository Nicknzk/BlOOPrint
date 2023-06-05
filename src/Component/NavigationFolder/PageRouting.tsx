import HomePage from "../Layout/HomePage";
import LandingPage from "../Layout/LandingPage";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import NewProjectTemplate from "../NewProjectTemplate";
import ProjectTemplate from "../ProjectTemplate";

export default function PageRouting({ isAuthenticated }: any) {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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

          <Route
            path="/NewProjectTemplate"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <NewProjectTemplate />
              </PrivateRoute>
            }
          />
          <Route
            path="/ProjectTemplate"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ProjectTemplate />
              </PrivateRoute>
            }
          />
          <Route
            path="/HomePage"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function PrivateRoute({ children, isAuthenticated }: any) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" replace={true} />;
  }
}
