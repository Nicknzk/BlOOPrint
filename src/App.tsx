import "./CSS-Folder/App.css";

import Icon from "./Component/Icon";
import { useState } from "react";
import AuthDetails from "./Component/Auth/AuthDetails";
import NavigationBarChoser from "./Component/NavigationBarChoser";
import PageRouting from "./Component/PageRouting";

export default function App() {
  const [authUser, setAuthUser] = useState(false);
  const [showAuthDetails] = useState(true);  //can add back 'setShowAuthDetails' later on but i removed it due to the error

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
