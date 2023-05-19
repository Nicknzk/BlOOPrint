import { AppBar, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navigation() {
  return (
    <AppBar position="relative" color="transparent">
      <Typography variant="myVariant">Navigation Bar</Typography>
      <nav>
        <Link to="/">HomePage</Link>
        <ul>
          <CustomLink to="/LogInSignIn">Sign In</CustomLink>
          <CustomLink to="/LogInSignUp">Sign Up</CustomLink>
        </ul>
      </nav>
    </AppBar>
  );
}

function CustomLink({
  to,
  children,
  ...props
}: {
  to: string;
  children: ReactNode;
}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
