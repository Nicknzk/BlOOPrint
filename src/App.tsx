import "./CSS-Folder/App.css";
import Icon from "./Component/Layout/Icon";
import { useState } from "react";
import AuthDetails from "./Component/Auth/AuthDetails";
import PageRouting from "./Component/NavigationFolder/PageRouting";
import NavigationBarChoser from "./Component/NavigationFolder/NavigationBarChoser";

export default function App() {
  const [authUser, setAuthUser] = useState(false);
  const [showAuthDetails] = useState(true); //can add back 'setShowAuthDetails' later on but i removed it due to the error

  const handleAuthStatusChange = (trueOrFalse: any) => {
    setAuthUser(trueOrFalse);
  };

  return (
    <>
      <NavigationBarChoser authUser={authUser} />
      <div className="app-standard">
        <PageRouting isAuthenticated={authUser} />
        <div className="permanent-icon-at-side">
          <Icon />
        </div>
        {showAuthDetails && (
          <AuthDetails onAuthStatusChange={handleAuthStatusChange} />
        )}
      </div>
    </>
  );
}
