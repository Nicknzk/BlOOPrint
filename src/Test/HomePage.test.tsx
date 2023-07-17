import { render } from "@testing-library/react";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import "@testing-library/jest-dom/extend-expect";
import AddIcon from "@mui/icons-material/Add";

test("HomePage renders the table", () => {
  const projects = [
    { id: "1", downloadURL: "https://example.com/project1.csv" },
    { id: "2", downloadURL: "https://example.com/project2.csv" },
  ];

  const { getByText } = render(
    <>
      <div>
        <div>
          <Typography variant="h4">Instructions:</Typography>
        </div>
        <div>
          <Typography variant="h6">
            Click "Go to Mindmap" to start a new project
          </Typography>
        </div>
        <div>
          <Typography variant="h6">
            Download save files and upload in "Go to Mindmap" to render entities
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="h4">Go to Mindmap:</Typography>
        <div>
          <nav>
            <IconButton
              color="primary"
              aria-label="add"
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#ECA400",
              }}
            >
              <AddIcon style={{ fontSize: "100px", color: "#FFFFFF" }} />
            </IconButton>
            <Typography
              variant="h5"
              style={{
                color: "#FFFFFF",
                marginTop: "10px",
                justifyContent: "center",
                marginLeft: "20px",
              }}
            >
              Click Here!
            </Typography>
          </nav>
        </div>
      </div>
      <div>
        <Typography variant="h4">Previous Saves (CSV files)</Typography>
        <div>
          <div>
            {projects.map((project) => (
              <Card key={project.id} style={{ width: "300px", margin: "10px" }}>
                <CardContent>
                  <div style={{ float: "left" }}>
                    <Typography variant="h5" style={{ wordWrap: "break-word" }}>
                      {project.id}
                    </Typography>
                    <a
                      href={project.downloadURL}
                      download={`${project.id}.csv`}
                    >
                      <Typography variant="h6">Download</Typography>
                    </a>
                  </div>
                  <Button
                    style={{
                      color: "black",
                      background: "red",
                      marginTop: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    <Typography variant="h6">Delete</Typography>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  expect(getByText("Instructions:")).toBeInTheDocument();
  expect(getByText("Go to Mindmap:")).toBeInTheDocument();
  expect(getByText("Previous Saves (CSV files)")).toBeInTheDocument();
});
