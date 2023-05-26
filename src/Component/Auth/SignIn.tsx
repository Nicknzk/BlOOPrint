//import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Form, Card, Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "../../firebase";
import AuthDetails from "./AuthDetails";
import "../../CSS-Folder/Auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="log-in-box">
        <div className="sign-in-container">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In to your Account</h2>
              <Form onSubmit={signIn}>
                <Form.Group className="text-center">
                  <Form.Label>Email: </Form.Label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </Form.Group>
                <Form.Group className="text-center">
                  <Form.Label>Password: </Form.Label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </Form.Group>
                <Button type="submit" className="w-100">
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="w-100 text-center mt-2">
          Don't have an account?
          <nav>
            <Link to={"/SignUp"}>Sign Up</Link>
          </nav>
        </div>
      </div>
    </>
  );
}

/*export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log in</button>
      </form>
      <AuthDetails />
    </div>
  );
}*/

/*
const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <form method="get" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <nav>
          <Link to={"/HomePage"}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </Link>
        </nav>
      </form>

      <Typography variant="h6">Don't have an account?</Typography>
      <nav>
        <Link to={"/LogInSignUp"}>Sign Up</Link>
      </nav>
      <Icon />
    </>
  );
}
*/
