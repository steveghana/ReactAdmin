import React from "react";
import { Alert, Box, Button, Card, Container, Paper } from "@mui/material";
import WorkerChart from "./Charts";
import { useDataProvider } from "react-admin";

const Events = () => {
  const dataProvider = useDataProvider();
  const [logs, setLogs] = React.useState<any[]>([]);
  const fetchDoors = (resource: string) => {
    const params = {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "location", order: "ASC" },
      filter: {},
    };

    return dataProvider
      .getList(resource, params)
      .then((response: any) => {
        setLogs(response.data);
        console.log(response, "logs");
      })
      .catch((err: any) => {
        console.error(err);
      });
    // Fetch doors data here
    // Return a promise that resolves to the doors data
  };
  React.useEffect(() => {
    fetchDoors("log-event-operations");
  }, []);
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
