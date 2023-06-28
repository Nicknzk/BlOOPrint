import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../../firebase";
//import thumbsup from "../Images/sign in.jpg";
import thumbsdown from "../Images/sign up.jpg";
import { Typography } from "@mui/material";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertShow, setAlertShow] = useState("");
  let messages: string[] = [];

  function passTest() {
    setAlertShow(""); //password format
    if (password.length < 8) {
      messages.push("Password must be minimum 8 characters");
    }

    if (password.length > 20) {
      messages.push("Password cannot exceed 20 characters");
    }

    if (password.search(/[a-z]/i) < 0) {
      messages.push("Password must contain atleast one letter");
    }

    if (password.search(/[0-9]/) < 0) {
      messages.push("Password must contain atleast one number");
    }
  }

  const signUp = (event: any) => {
    passTest(); //check if password is in the correct format
    event.preventDefault();
    if (messages.length === 0) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          sendEmailVerification(userCredential.user)
            .then(() => {
              console.log("Verification email sent.");
            })
            .catch((error) => {
              console.log("Error sending verification email:", error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlertShow(messages.join("\n - \n"));
    }
  };

  return (
    <>
      <img
        src={thumbsdown}
        alt="thumbsdown"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
      />
      <div className="sign-in-container log-in-box">
        <Card style={{ width: "400px", marginRight: "0", marginLeft: "auto" }}>
          <Card.Body>
            <Typography variant="h4" className="text-center mb-4">
              Create Account
            </Typography>
            <Form onSubmit={signUp}>
              <Form.Group className="text-center">
                <Form.Label>
                  <Typography variant="h5">Email: </Typography>
                </Form.Label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </Form.Group>
              <Form.Group className="text-center">
                <Form.Label>
                  <Typography variant="h5">Password: </Typography>
                </Form.Label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </Form.Group>
              <Button className="w-100" type="submit">
                <Typography variant="h5">Sign Up</Typography>
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Typography variant="h5">already have an account?</Typography>
              <nav>
                <Link to={"/SignIn"}>
                  <Typography variant="h5">Sign In</Typography>
                </Link>
              </nav>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div>{alertShow.length > 0 && <Alert>{alertShow}</Alert>}</div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#ECA400",
          color: "white",
          textTransform: "none",
          borderRadius: "20px",
        }}
      >
        <nav>
          <Link to={"../"}>
            <Typography variant="h4" style={{ color: "black" }}>
              Back to Landing Page
            </Typography>
          </Link>
        </nav>
      </Button>
    </>
  );
}
