import { Grid, Card, CardMedia, CardContent, Typography, AppBar, Toolbar, ListItem, List } from "@mui/material";
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

<div>
<AppBar position="relative" style={{ backgroundColor: 'transparent', color: 'white' }}>
        <Toolbar variant="dense">
          <nav style={{ marginLeft: 'auto', display:'flex' }}>
            <ListItem className="navigation-landing-page" style={{ listStyleType: 'none' }}>
                <a href="#about" style={{ display: 'flex', marginRight: '16px', whiteSpace: 'nowrap' }}>About Us</a>
              </ListItem>
              <ListItem className="navigation-landing-page" style={{ listStyleType: 'none' }}>

              <a href="#howitworks" style={{ marginRight: '30px', whiteSpace: 'nowrap' }}>How it Works</a>
              </ListItem>
              <ListItem className="navigation-landing-page" style={{ listStyleType: 'none'}}>

              <CustomLink to="/SignIn">Login</CustomLink>
              </ListItem>
              <ListItem className="navigation-landing-page" style={{ listStyleType: 'none', whiteSpace: 'nowrap'}}>

              <CustomLink to="/SignUp">Get Started</CustomLink>
            </ListItem>
          </nav>
        </Toolbar>
      </AppBar>
      </div>
      <div>

        <Typography className="landing-page" variant="h2">Understanding and Documenting code doesn`t have to be complicated</Typography>
        <nav>
            <Link to={"/SignUp"}><Typography variant= "h2">Get Started</Typography></Link>
          </nav>
        <Typography  variant="h4">Supports:</Typography>
        <img
      src={JS}
      alt="JavaScript"
      style={{ width: '200px', height: 'auto' }}
    />
      </div>


      <div>
<Typography variant="h1" id="about">About Us</Typography>
<Typography variant="h4">Object Oriented Programming can get complex. With BlOOPrint, debugging and documentation is made easier and better. BlOOPrint makes graph drawing as simple as a drag and drop.</Typography>
      </div>

      <div>
      <Typography variant="h1" id="howitworks">How it Works</Typography>
      <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardMedia
            component="img"
            src="/path/to/image1.jpg"
            alt="Image 1"
          />
          <CardContent>
            <Typography variant="h5">Image 1</Typography>
            <Typography variant="body1">Description of image 1</Typography>
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
            <Typography variant="body1">Description of image 2</Typography>
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
            <Typography variant="body1">Description of image 3</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    

      </div>



    </>
  );
}
