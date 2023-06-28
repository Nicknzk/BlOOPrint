import { AppBar, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function NavigationHomePage() {
  return (
    <>
      <div style={{ background: "#007bff", minHeight: "100vh" }}>
        <AppBar position="relative" color="secondary">
          <Toolbar variant="dense">
            <nav>
              <ul className="navigation-home-page">
                <li>
                  <Link to="/HomePage">
                    <Typography variant="h2">HomePage</Typography>
                  </Link>
                </li>
                <CustomLink to="/ProjectTemplate">
                  <Typography variant="h3">Project Template</Typography>
                </CustomLink>
                <CustomLink to="/NewProjectTemplate">
                  <Typography variant="h3">New Project Template </Typography>
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
