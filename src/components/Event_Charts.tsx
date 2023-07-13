import React from "react";
import { Alert, Box, Button, Card, Container, Paper } from "@mui/material";
import WorkerChart from "./Charts";
import { useDataProvider } from "react-admin";
interface ILogProps {
  gateId: number;
  isOpen: boolean;
  isSuccess: boolean;
  logDescription: string;
  logNotes: string;
  logTimestamp: Date;
  userId: number;
}
const Events = () => {
  const dataProvider = useDataProvider();
  const [logs, setLogs] = React.useState<ILogProps[]>([]);
  const fetchDoors = (resource: string) => {
    const params = {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "location", order: "ASC" },
      filter: {},
    };

    return dataProvider
      .getList(resource, params)
      .then((response: any) => {
        setLogs(response.data.slice(0, 12));
      })
      .catch((err: any) => {
        console.error(err);
      });
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
          height: "auto",
          padding: "1rem",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: ".6rem",
        }}
      >
        {logs.map((log) => {
          if (log.logDescription === "") {
            return;
          } else {
            return (
              <>
                <Alert
                  key={log.userId}
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
