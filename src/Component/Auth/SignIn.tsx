import { Link } from "react-router-dom";
import { Form, Card, Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "../../firebase";
import thumbsup from "../Images/sign in.jpg";
import { Typography } from "@mui/material";

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
      <img
        src={thumbsup}
        alt="thumbup"
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

      <div className="log-in-box">
        <div className="sign-in-container">
          <Card>
            <Card.Body>
              <Typography variant="h4" className="text-center mb-4">
                Log In to your Account
              </Typography>
              <Form onSubmit={signIn}>
                <Form.Group className="text-center">
                  <Form.Label>
                    <Typography variant="h5">Email: </Typography>
                  </Form.Label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  ></input>
                </Form.Group>
                <Button type="submit" className="w-100">
                  <Typography variant="h5">Log In</Typography>
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                <Typography variant="h5">Don't have an account?</Typography>
                <nav>
                  <Link to={"/SignUp"}>
                    <Typography variant="h5">Sign Up</Typography>
                  </Link>
                </nav>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
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
