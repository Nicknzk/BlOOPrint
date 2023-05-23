import { AppBar, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <div>
        <AppBar position="relative" color="secondary">
          <Toolbar variant="dense">
            <Typography variant="myVariant">Navigation Bar</Typography>
            <nav>
              <ul>
                <li>
                  <Link to="/">LoginPage</Link>
                </li>
                <CustomLink to="/HomePage">HomePage</CustomLink>
                <CustomLink to="/SignIn">Sign In</CustomLink>
                <CustomLink to="/SignUp">Sign Up</CustomLink>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>
      </div>
    </>
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
