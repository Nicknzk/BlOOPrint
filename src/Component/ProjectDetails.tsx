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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingRight: "20px", fontSize: "16px" }}>
                Entity Name
              </TableCell>
              <TableCell style={{ paddingRight: "20px", fontSize: "16px" }}>
                Methods
              </TableCell>
              <TableCell style={{ paddingRight: "20px", fontSize: "16px" }}>
                Dependencies
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxes.map((box) => (
              <TableRow key={box.id}>
                <TableCell style={{ paddingRight: "20px", fontSize: "20px" }}>
                  {box.name}
                </TableCell>
                <TableCell style={{ paddingRight: "20px", fontSize: "14px" }}>
                  <ul>
                    {box.methods.map((method, index) => (
                      <li key={index}>{method}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell style={{ paddingRight: "20px", fontSize: "14px" }}>
                  <ul>
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
      <Typography variant="h4">Project Details</Typography>
      <BoxList boxes={boxes} />
      <nav>
        <Link
          className="NewProjectTemplate"
          to={{
            pathname: "/NewProjectTemplate",
            search: `?boxes=${encodeURIComponent(JSON.stringify(boxes))}`, // Pass boxes as a search parameter
          }}
        >
          <Typography variant="h5">Back to Project Template</Typography>
        </Link>
      </nav>
    </>
  );
}
