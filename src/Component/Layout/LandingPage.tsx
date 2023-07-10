import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  ListItem,
  Button,
} from "@mui/material";
import JS from "../Images/VectorJavaScript.svg";
import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import databasepic from "../Images/database pic.jpg";
import howitworks from "../Images/how it works.jpg";
import comingsoon from "../Images/coming-soon.jpg";
import "../../CSS-Folder/LandingPage.css";

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
      <div
        style={{
          background: "linear-gradient(to left, #054A91, #007bff)",
          minHeight: "100vh",
          paddingBottom: "1%",
          maxWidth: "100vw",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <div>
          <AppBar
            position="relative"
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.5)",
              color: "white",
              padding: "1%",
            }}
          >
            <Toolbar variant="dense">
              <nav style={{ marginLeft: "auto", display: "flex" }}>
                <ListItem
                  className="navigation-landing-page"
                  style={{ listStyleType: "none" }}
                >
                  <span
                    style={{
                      display: "flex",
                      marginRight: "0.8%",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <a href="#about-us" style={{ color: "white" }}>
                      <Typography variant="h5" className="link-text">
                        About Us
                      </Typography>
                    </a>
                  </span>
                </ListItem>
                <ListItem
                  className="navigation-landing-page"
                  style={{ listStyleType: "none" }}
                >
                  <span
                    style={{
                      marginRight: "1.2%",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <a href="#how-it-works" style={{ color: "white" }}>
                      <Typography variant="h5" className="link-text">
                        How it Works{" "}
                      </Typography>
                    </a>
                  </span>
                </ListItem>
                <ListItem
                  className="navigation-landing-page"
                  style={{ listStyleType: "none" }}
                >
                  <Button
                    variant="text"
                    style={{ textTransform: "none", textDecoration: "none" }}
                  >
                    <CustomLink to="/SignIn">
                      <Typography
                        variant="h5"
                        style={{ color: "white", textDecoration: "none" }}
                        className="link-text"
                      >
                        Login
                      </Typography>
                    </CustomLink>
                  </Button>
                </ListItem>
                <ListItem
                  className="navigation-landing-page"
                  style={{ listStyleType: "none" }}
                >
                  <Button
                    variant="text"
                    style={{ textTransform: "none", textDecoration: "none" }}
                  >
                    <CustomLink to="/SignUp">
                      <span
                        style={{
                          display: "flex",
                          marginRight: "0.8%",
                          whiteSpace: "nowrap",
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        <Typography
                          variant="h5"
                          style={{ color: "white", textDecoration: "none" }}
                          className="link-text"
                        >
                          Get Started
                        </Typography>
                      </span>
                    </CustomLink>
                  </Button>
                </ListItem>
              </nav>
            </Toolbar>
          </AppBar>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            margin: "0",
            marginLeft: "5%",
          }}
        >
          <div style={{ flex: "0 0 15%", marginTop: "1%" }}>
            <Typography className="landing-page" variant="h2">
              Understanding and Documenting code doesn't have to be complicated
            </Typography>

            <div style={{ marginTop: "1.5%" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#ECA400",
                  color: "#FFFFFF",
                  textTransform: "none",
                  borderRadius: "2vh",
                }}
              >
                <Link
                  to="/SignUp"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="h2"
                    style={{
                      color: "black",
                      fontSize: "400%",
                    }}
                  >
                    Let's Get Started
                  </Typography>
                </Link>
              </Button>
            </div>
          </div>

          <div style={{ flex: "0 0 70%", marginLeft: "1.6%" }}>
            <Typography
              variant="h1"
              style={{
                marginTop: "12%",
                marginLeft: "4%",
                fontSize: "1300%",
                color: "white",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                textShadow: "30px 10px 4px rgba(0, 0, 0, 0.5)",
                maxWidth: "100%",
              }}
            >
              BLOOPrint
            </Typography>
          </div>
        </div>
        <div style={{ marginTop: "0.8%", marginLeft: "1.6%" }}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Supports:
          </Typography>
          <img
            src={JS}
            alt="JavaScript"
            style={{ width: "12%", height: "auto", marginLeft: "12%" }}
          />
        </div>

        <div style={{ marginTop: "12%" }}>
          <div id="about-us">
            <Typography
              variant="h1"
              id="about"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              About Us
            </Typography>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <Typography
            variant="h4"
            style={{
              width: "33%",
              marginTop: "4%",
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "Arial, sans-serif",
              fontStyle: "italic",
              fontWeight: "normal",
              fontSize: "300%",
              textAlign: "center",
            }}
          >
            Object Oriented Programming can get complex. With BlOOPrint,
            debugging and documentation is made easier and better. BlOOPrint
            makes graph drawing as simple as a drag and drop.
          </Typography>
        </div>

        <div style={{ marginBottom: "12%" }}>
          <div id="how-it-works">
            <Typography
              variant="h1"
              id="howitworks"
              style={{
                textAlign: "center",
                marginTop: "8%",
                marginBottom: "6%",
                fontWeight: "bold",
                color: "white",
              }}
            >
              How it Works
            </Typography>
          </div>
          <div style={{ maxWidth: "90vw", margin: "0 auto" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card>
                  <CardMedia
                    component="img"
                    src={databasepic}
                    alt="Database pic"
                  />
                  <CardContent>
                    <Typography variant="h5">Save your Progress</Typography>
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
                    src={howitworks}
                    alt="how it works"
                  />
                  <CardContent>
                    <Typography variant="h5">How it Works</Typography>
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
                    src={comingsoon}
                    alt="coming soon"
                  />
                  <CardContent>
                    <Typography variant="h5">Cool functions</Typography>
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
        <a href="#" style={{ color: "white", textAlign: "center" }}>
          <Typography variant="h5" className="link-text">
            Go to Top
          </Typography>
        </a>
      </div>
    </>
  );
}
