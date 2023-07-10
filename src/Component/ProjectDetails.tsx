import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Box {
  id: number;
  name: string;
  dependencies: string[];
  methods: string[];
}

export default function ProjectDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const boxesString = searchParams.get("boxes");
  const boxes = boxesString ? JSON.parse(decodeURIComponent(boxesString)) : [];

  console.log(boxes);

  const BoxList: React.FC<{ boxes: Box[] }> = ({ boxes }) => {
    return (
      <TableContainer
        style={{ margin: "0 auto", paddingLeft: "5vh", paddingRight: "5vh" }}
      >
        <Table style={{ border: "0.3vh solid white" }}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontSize: "3vh",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Helvatica, Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Entity Name:
              </TableCell>
              <TableCell
                style={{
                  fontSize: "3vh",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Helvatica, Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Methods:
              </TableCell>
              <TableCell
                style={{
                  fontSize: "3vh",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Helvatica, Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Dependencies:
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxes.map((box) => (
              <TableRow key={box.id}>
                <TableCell
                  style={{
                    fontSize: "2vh",
                    textAlign: "center",
                    fontFamily: "Open Sans, Arial, sans-serif",
                  }}
                >
                  {box.name}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "2vh",
                    textAlign: "center",
                    fontFamily: "Open Sans, Arial, sans-serif",
                  }}
                >
                  <ul style={{ listStyle: "none" }}>
                    {box.methods.map((method, index) => (
                      <li key={index}>{method}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "2vh",
                    textAlign: "center",
                    fontFamily: "Open Sans, Arial, sans-serif",
                  }}
                >
                  <ul style={{ listStyle: "none" }}>
                    {box.dependencies.map((dependency, index) => (
                      <li key={index}>{dependency}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

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
        <Typography
          variant="h1"
          style={{
            textAlign: "center",
            paddingTop: "2vh",
            fontSize: "120px",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            marginBottom: "2vh",
            textShadow: "12px 6px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Project Details{" "}
        </Typography>
        <BoxList boxes={boxes} />

        <nav>
          <Link
            className="NewProjectTemplate"
            to={{
              pathname: "/NewProjectTemplate",
              search: `?boxes=${encodeURIComponent(JSON.stringify(boxes))}`,
            }}
          >
            <Typography variant="h5">Back to Project Template</Typography>
          </Link>
        </nav>
      </div>
    </>
  );
}
