import { AppBar, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../../CSS-Folder/Navigation.css";

export default function NavigationHomePage() {
  return (
    <>
      <div>
        <AppBar position="relative" color="secondary">
          <Toolbar variant="dense">
            <Typography
              variant="h1"
              sx={{
                fontSize: "4rem",
                color: "#424242",
              }}
            >
              Navigation Bar
            </Typography>
            <nav>
              <ul className="navigation-home-page">
                <li>
                  <Link to="/HomePage">HomePage</Link>
                </li>
                <CustomLink to="/ProjectTemplate">Project Template</CustomLink>
                <CustomLink to="/NewProjectTemplate">
                  New Project Template
                </CustomLink>
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
