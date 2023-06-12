import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../CSS-Folder/Auth.css";

interface AuthDetailsProps {
  onAuthStatusChange?: (choice: boolean) => void;
}

export default function AuthDetails({ onAuthStatusChange }: AuthDetailsProps) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [verifiedUser, setVerifiedUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setAuthUser(user);
        setVerifiedUser(user);
        onAuthStatusChange?.(true);
      } else if (user) {
        setAuthUser(user);
        setVerifiedUser(null);
        onAuthStatusChange?.(false);
      } else {
        setAuthUser(null);
        setVerifiedUser(null);
        onAuthStatusChange?.(false);
      }
    });

    return () => {
      listen();
    };
  }, [onAuthStatusChange]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? ( //if user is logged in... else remain as Sign Out
        verifiedUser ? (
          <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <nav>
              <Link className="auth-page-button" to={"/HomePage"}>
                Go To HomePage
              </Link>
            </nav>
            <Button onClick={userSignOut} className="auth-page-button">
              Sign Out
            </Button>
          </>
        ) : (
          <div className="email-verification-message">
            <p style={{ fontSize: 20 }}>Email Verification is not complete.</p>
            <p>Do check spam / junk folder</p>
          </div>
        )
      ) : (
        <p style={{ fontSize: 20 }}>Log In to access BLOOPrint</p>
      )}
    </div>
  );
}
