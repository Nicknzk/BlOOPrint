import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Container, Alert } from "react-bootstrap";

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
            <Typography variant="h6">{`Signed In as ${authUser.email}`}</Typography>

            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                margin: "16px",
              }}
            >
              <Button
                variant="contained"
                onClick={userSignOut}
                className="auth-page-button"
                style={{
                  backgroundColor: "red",
                  color: "black",
                }}
              >
                <Typography variant="h6">Sign Out</Typography>
              </Button>
            </div>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              bottom: "50%",
              left: "1.2%",
              width: "15%",
              padding: "10px",
            }}
          >
            <Alert variant="warning" className="email-verification-alert">
              <Alert.Heading>Email Verification is not complete.</Alert.Heading>
              <p>Do check spam / junk folder</p>
            </Alert>
          </div>
        ))}
    </div>
  );
}
