import { useEffect, useState } from "react";
import AuthDetails from "./Component/Auth/AuthDetails";
import PageRouting from "./Component/NavigationFolder/PageRouting";
import { useNavigation } from "./Component/NavigationFolder/UseNavigation";

export default function App() {
  const [authUser, setAuthUser] = useState(false);
  const navigation = useNavigation();

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
      <div className="app-standard">
        <PageRouting isAuthenticated={authUser} />
        <div className="permanent-icon-at-side"></div>
        {<AuthDetails onAuthStatusChange={handleAuthStatusChange} />}
      </div>
    </>
  );
}
