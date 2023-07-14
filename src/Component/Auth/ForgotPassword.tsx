import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase";
import { Typography } from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = (e: any) => {
    e.preventDefault();
    setError(""); // Clear previous error message
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to left, #054A91, #007bff)",
      }}
    >
      <div className="forgot-password-container" style={{ width: "40vh" }}>
        <Card>
          <Card.Body>
            <Typography variant="h3" className="text-center mb-4">
              Reset Password
            </Typography>
            {resetSent && (
              <Alert variant="success">
                Password reset email sent. Check your inbox for further
                instructions.
              </Alert>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleResetPassword}>
              <Form.Group>
                <Form.Label>
                  <Typography variant="h5">Email:</Typography>
                </Form.Label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100">
                <Typography variant="h5">Reset Password</Typography>
              </Button>
              <div className="w-100 text-center mt-3">
                <Link to="/SignIn">
                  <Typography variant="h5">Cancel</Typography>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Button
        variant="contained"
        style={{
          position: "fixed",
          bottom: "1vh",
          left: "1vh",
          backgroundColor: "#ECA400",
          color: "white",
          textTransform: "none",
          borderRadius: "5vh",
          border: "0.3vh solid black",
        }}
      >
        <nav>
          <Link to="/SignIn" style={{ textDecoration: "none" }}>
            <Typography variant="h4" style={{ color: "black" }}>
              Back
            </Typography>
          </Link>
        </nav>
      </Button>
    </div>
  );
}
