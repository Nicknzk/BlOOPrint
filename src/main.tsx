import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import "bootstrap/dist/css/bootstrap.min.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: blue[300],
    },
  },
  typography: {
    //cant be fixed
    myVariant: {
      fontSize: "4rem",
      color: "#424242",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
