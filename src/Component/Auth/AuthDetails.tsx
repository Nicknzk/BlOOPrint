import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    //if user is logged in... else remain as Sign Out
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <nav>
            <Link className="auth-page-button" to={"/HomePage"}>
              HomePage
            </Link>
          </nav>
          <Button onClick={userSignOut} className="auth-page-button">
            Sign Out
          </Button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
