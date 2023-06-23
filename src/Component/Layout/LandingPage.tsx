import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  ListItem,
  List,
  Button,
} from "@mui/material";
import JS from "../Images/VectorJavaScript.svg";
import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

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

export default function LandingPage() {
  return (
    <>
    <div style={{ background: 'linear-gradient(to left, #054A91, #007bff)', minHeight: '100vh' }}>
      <div>
        <AppBar
          position="relative"
          style={{ backgroundColor: "rgba(128, 128, 128, 0.5)", color: "white" }}
        >
          <Toolbar variant="dense">
            <nav style={{ marginLeft: "auto", display: "flex" }}>
              <ListItem className="navigation-landing-page" style={{ listStyleType: "none" }}>
                <span style={{ display: "flex", marginRight: "16px", whiteSpace: "nowrap", textDecoration: "none", color: "white" }}>
                  About Us
                </span>
              </ListItem>
              <ListItem className="navigation-landing-page" style={{ listStyleType: "none" }}>
                <span style={{ marginRight: "30px", whiteSpace: "nowrap", textDecoration: "none", color: "white" }}>
                  How it Works
                </span>
              </ListItem>
              <ListItem className="navigation-landing-page" style={{ listStyleType: "none" }}>
                <CustomLink to="/SignIn" >
                  Login
                </CustomLink>
              </ListItem>
              <ListItem className="navigation-landing-page" style={{ listStyleType: "none" }}>
                <CustomLink to="/SignUp" >
                  Get Started
                </CustomLink>
              </ListItem>
            </nav>
          </Toolbar>
        </AppBar>
      </div>

      <div style={{ width: "400px", marginTop: "100px", marginLeft: "100px" }}>
        <Typography className="landing-page" variant="h2">
          Understanding and Documenting code doesn't have to be complicated
        </Typography>

        <div style={{ marginTop: '30px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#ECA400",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "20px",
            }}
          >
            <Link
              to="/SignUp"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h2" style={{ color: 'black' }}>Let's Get Started</Typography>
            </Link>
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "20px", marginLeft: "40px" }}>
        <Typography variant="h4">Supports:</Typography>
        <img
          src={JS}
          alt="JavaScript"
          style={{ width: "200px", height: "auto", marginLeft: "200px" }}
        />
      </div>

      <div style={{ marginTop: "300px" }}>
        <Typography variant="h1" id="about" style={{ textAlign: "center" }}>
          About Us
        </Typography>
      </div>

      <div style={{ textAlign: "right" }}>
        <Typography
          variant="h4"
          style={{ width: "400px", marginTop: "100px" }}
        >
          Object Oriented Programming can get complex. With BlOOPrint,
          debugging and documentation is made easier and better. BlOOPrint
          makes graph drawing as simple as a drag and drop.
        </Typography>
      </div>

      <div style={{ marginBottom: "300px" }}>
        <Typography
          variant="h1"
          id="howitworks"
          style={{
            textAlign: "center",
            marginTop: "200px",
            marginBottom: "200px",
          }}
        >
          How it Works
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card>
              <CardMedia
                component="img"
                src="../Images/database pic.jpg"
                alt="Database pic"
              />
              <CardContent>
                <Typography variant="h5">Image 1</Typography>
                <Typography variant="body1">
                  All your projects are stored with us.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardMedia
                component="img"
                src="/path/to/image2.jpg"
                alt="Image 2"
              />
              <CardContent>
                <Typography variant="h5">Image 2</Typography>
                <Typography variant="body1">
                  To start you either draw your own diagram or upload your
                  code for blOOPrint to do it for you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardMedia
                component="img"
                src="/path/to/image3.jpg"
                alt="Image 3"
              />
              <CardContent>
                <Typography variant="h5">Image 3</Typography>
                <Typography variant="body1">
                  Use our report writer function to write a report on your
                  code automatically
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      </div>
    </>
  );
}
