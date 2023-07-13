import { Alert, Box, Card, Container, Paper } from "@mui/material";
import React from "react";
import WorkerChart from "./Charts";

const Events = () => {
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ height: "40%", padding: "1rem", marginBottom: "1rem" }}
      >
        <Alert severity="success">This is an error alert — check it out!</Alert>
        <Alert severity="error">This is a warning alert — check it out!</Alert>
        <Alert severity="success">This is an info alert — check it out!</Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </Paper>
      <Box sx={{ height: "40%" }}>
        <WorkerChart />
      </Box>
    </Container>
  );
};
export default Events;
