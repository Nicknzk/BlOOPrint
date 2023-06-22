import { Link } from "react-router-dom";
import { Form, Card, Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "../../firebase";
import thumbsup from "../Images/sign in.jpg";


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
      style={{ position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        object-fit: 'cover',
        z-index: '-1' }}
    />
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
