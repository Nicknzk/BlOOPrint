import { useState } from "react";
import AuthDetails from "./Component/Auth/AuthDetails";
import PageRouting from "./Component/NavigationFolder/PageRouting";

export default function App() {
  const [authUser, setAuthUser] = useState(false);

  const handleAuthStatusChange = (trueOrFalse: any) => {
    setAuthUser(trueOrFalse);
  };

  return (
    <>
      <div className="app-standard">
        <PageRouting isAuthenticated={authUser} />
        <div className="permanent-icon-at-side"></div>
        {<AuthDetails onAuthStatusChange={handleAuthStatusChange} />}
      </div>
    </>
  );
}
