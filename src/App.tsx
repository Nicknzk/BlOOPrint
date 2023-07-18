import { useEffect, useState } from "react";
import AuthDetails from "./Component/Auth/AuthDetails";
import PageRouting from "./Component/NavigationFolder/PageRouting";
import { useNavigate } from "react-router-dom";
import "reactflow/dist/style.css";

export default function App() {
  const [authUser, setAuthUser] = useState(false);
  const navigation = useNavigate();

  const handleAuthStatusChange = (trueOrFalse: any) => {
    setAuthUser(trueOrFalse);
  };

  useEffect(() => {
    if (authUser) {
      navigation("/HomePage"); // Navigate to the homepage
    }
  }, [authUser]);

  return (
    <>
      <div className="app-standard" style={{ height: "100vh", width: "100vw" }}>
        <PageRouting isAuthenticated={authUser} />
        <div
          style={{
            background: "linear-gradient(to left, #054A91, #007bff)",
          }}
        >
          {" "}
          {<AuthDetails onAuthStatusChange={handleAuthStatusChange} />}
        </div>
      </div>
    </>
  );
}
