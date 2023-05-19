import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function LogInSignUp() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const MyCustom = styled(Typography)({
    fontSize: "1rem",
  });

  return (
    <>
      <MyCustom>Create Account</MyCustom>
      <p>Create an account to view and mange your mindmaps</p>
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
      {/*will need to check if password are the same else another prompt*/}
    </>
  );
}
