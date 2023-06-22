import { useState } from "react";
import AuthDetails from "./Component/Auth/AuthDetails";
import PageRouting from "./Component/NavigationFolder/PageRouting";


export default function App() {
  const [authUser, setAuthUser] = useState(false);
  const [showAuthDetails] = useState(true); //can add back 'setShowAuthDetails' later on but i removed it due to the error

  const handleAuthStatusChange = (trueOrFalse: any) => {
    setAuthUser(trueOrFalse);
  };

  return (
    <>
      <div className="app-standard">
        <PageRouting isAuthenticated={authUser} />
        <div className="permanent-icon-at-side">
        </div>
        {showAuthDetails && (
          <AuthDetails onAuthStatusChange={handleAuthStatusChange} />
        )}
      </div>
    </>
  );
}
