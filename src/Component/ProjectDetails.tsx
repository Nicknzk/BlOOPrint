import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

interface Box {
  id: number;
  name: string;
  dependencies: string[];
  methods: string[];
  attributes: string[];
}

export default function ProjectDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const boxesString = searchParams.get("boxes");
  const boxes = boxesString ? JSON.parse(decodeURIComponent(boxesString)) : [];

  console.log(boxes);

  const BoxList: React.FC<{ boxes: Box[] }> = ({ boxes }) => {
    return (
      <ul className="box-list">
        {boxes.map((box) => (
          <li key={box.id} className="box">
            <h3 className="box-title">{box.name}</h3>

            <section className="methods">
              <Typography variant="h5">Methods:</Typography>
              <ul className="method-list">{/* Render methods here */}</ul>
            </section>

            <section className="dependencies">
              <Typography variant="h5">Dependencies:</Typography>
              <ul className="dependency-list">
                {/* Render dependencies here */}
              </ul>
            </section>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Typography variant="h5">Project Details</Typography>
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
