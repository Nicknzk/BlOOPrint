import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../../firebase";
import "../../CSS-Folder/Auth.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertShow, setAlertShow] = useState("");
  let messages: string[] = [];

  function passTest() {
    setAlertShow("");
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
      <div className="sign-in-container log-in-box">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Create Account</h2>
            <Form onSubmit={signUp}>
              <Form.Group className="text-center">
                <Form.Label>Email: </Form.Label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </Form.Group>
              <Form.Group className="text-center">
                <Form.Label>Password: </Form.Label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </Form.Group>
              <Button className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          already have an account?
          <nav>
            <Link to={"/SignIn"}>Sign In</Link>
          </nav>
        </div>
      </div>
      <div>{alertShow.length > 0 && <Alert>{alertShow}</Alert>}</div>
    </>
  );
}
