import React from "react";
import { Alert, Box, Button, Container, Paper } from "@mui/material";
import WorkerChart from "./Charts";
import { GlobalContext } from "../../customHook/context";
import { useParams } from "react-router-dom";

const Events = () => {
  const params = useParams();
  const { logs } = React.useContext(GlobalContext);
  let slidedLogs = !params.id ? logs.slice(0, 12) : logs.slice(0, 18);
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
          height: "auto",
          padding: "1rem",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: ".6rem",
        }}
      >
        {slidedLogs
          .filter((log) => log.logDescription !== "")
          .map((log, i) => (
            <Alert
              key={log.userId + i}
              severity={log.isSuccess ? "success" : "error"}
            >
              {log.logDescription}
            </Alert>
          ))}
      </Paper>
      {!params.id && (
        <Box sx={{ height: "40%" }}>
          <WorkerChart />
        </Box>
      )}
    </Container>
  );
};
export default Events;
