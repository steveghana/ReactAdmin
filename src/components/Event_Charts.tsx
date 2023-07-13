import React from "react";
import { Alert, Box, Button, Card, Container, Paper } from "@mui/material";
import WorkerChart from "./Charts";

const Events = () => {
  return (
    <Container maxWidth="sm">
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button variant="contained" color="primary">
          All
        </Button>
        <Button variant="outlined" disabled color="primary">
          Alerts
        </Button>
      </div>
      <Paper
        elevation={3}
        sx={{
          height: "40%",
          padding: "1rem",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem",
        }}
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
