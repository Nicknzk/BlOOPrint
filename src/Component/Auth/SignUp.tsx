import { Form, Button, Card } from "react-bootstrap";
//import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (event: any) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
  );
}
/* decoration
<Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        already have an account? Log in
      </div>
*/

/*import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Icon from "./Icon.tsx";
import { Form, Button, Card } from 'react-bootstrap'


export default function LogInSignUp() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const MyCustom = styled(Typography)({
    fontSize: "3rem",
  });

  return (
    <>
      <MyCustom>Create Account</MyCustom>
      <Typography variant="h6">
        Create an account to view and mange your mindmaps
      </Typography>
      <form method="get" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
          <label htmlFor="text">Username:</label>
          <input type="text" id="text" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Icon />
    </>
  );
}
*/
