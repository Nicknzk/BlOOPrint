import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

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
      {authUser && //if user is logged in... else remain as Sign Out
        (verifiedUser ? (
          <>
            <nav>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "ECA400",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Link className="auth-page-button" to={"/HomePage"}>
                  <Typography
                    style={{
                      textDecoration: "none",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Home
                  </Typography>
                </Link>
              </Button>
            </nav>
            <p>{`Signed In as ${authUser.email}`}</p>

            <div
              style={{ position: "fixed", top: 0, right: 0, margin: "16px" }}
            >
              <Button
                variant="contained"
                onClick={userSignOut}
                className="auth-page-button"
                style={{ backgroundColor: "red", color: "black" }}
              >
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <div className="email-verification-message">
            <p style={{ fontSize: 20 }}>Email Verification is not complete.</p>
            <p>Do check spam / junk folder</p>
          </div>
        ))}
    </div>
  );
}
