import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LogInSignIn() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.currentTarget.elements.usernameInput.value);
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
        <Button type="submit" color="secondary" variant="contained">
          Submit
        </Button>
      </form>
      <Typography variant="h6">Don't have an account?</Typography>
      <nav>
        <Link to={"/LogInSignUp"}>Sign Up</Link>
      </nav>
    </>
  );
}
