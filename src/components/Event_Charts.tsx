import React from "react";
import { Alert, Box, Button, Card, Container, Paper } from "@mui/material";
import WorkerChart from "./Charts";
import { useDataProvider } from "react-admin";
import { GlobalContext } from "../customHook/context";

const Events = () => {
  const { logs } = React.useContext(GlobalContext);
  console.log(logs);
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
        {logs.map((log, i) => {
          if (log.logDescription === "") {
            return;
          } else {
            return (
              <>
                <Alert
                  key={log.userId + i}
                  severity={log.isSuccess ? "success" : "error"}
                >
                  {log.logDescription}
                </Alert>
              </>
            );
          }
        })}
      </Paper>
      <Box sx={{ height: "40%" }}>
        <WorkerChart />
      </Box>
    </Container>
  );
};
export default Events;
