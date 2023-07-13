import * as React from "react";
import { ListProps, useDataProvider } from "react-admin";
import { Alert, Card, Container, Paper } from "@mui/material";
import WorkersComponent from "./Workers";
import LocationsComponent from "./Location";
import DoorsComponent from "./Doors";
import WorkerChart from "./Charts";
interface Location {
  id: number;
  location: string;
  city: string;
  address: string;
}

interface LocationListProps extends ListProps {
  data: Location[];
}

const LocationList: React.FC<LocationListProps> = (props) => {
  const [selectedCard, setSelectedCard] = React.useState("locations");

  const handleLocationsClick = () => setSelectedCard("locations");
  const handleDoorsClick = () => setSelectedCard("doors");
  const handleWorkersClick = () => setSelectedCard("workers");

  const [locations, setLocations] = React.useState<Location[]>([]);
  const [doors, setDoors] = React.useState<any[]>([]);
  const [workers, setWorkers] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    const fetchAllData = async () => {
      const [locationsData, doorsData] = await Promise.all([
        fetchLocations("locations"),
        fetchDoors("gates-users"),
        // fetchWorkers("users"),
      ]);
      setLocations(locationsData);
      setDoors(doorsData.slice(0, 25));
      // setWorkers(workersData);
    };

    fetchAllData();
  }, []);

  const fetchLocations = (resource: string) => {
    const params = {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "location", order: "ASC" },
      filter: {},
    };

    return dataProvider
      .getList(resource, params)
      .then((response: any) => response.data);
  };

  const fetchDoors = (resource: string) => {
    const params = {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "location", order: "ASC" },
      filter: {},
    };

    return dataProvider
      .getList(resource, params)
      .then((response: any) => response.data);
    // Fetch doors data here
    // Return a promise that resolves to the doors data
  };

  return (
    <Card
      style={{
        display: "flex",
        gap: "1rem",
        overflow: "hidden",
        // marginTop: "2rem",
        height: "90%",
      }}
    >
      <Container maxWidth="md" sx={{ mt: "2rem" }}>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleLocationsClick}
          >
            <h2>Locations</h2>
            <p style={{ color: "blue" }}> {locations.length}</p>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",

              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={handleDoorsClick}
          >
            <h2>Doors</h2>
            <p style={{ color: "blue" }}> {doors.length}</p>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              alignItems: "center",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={handleWorkersClick}
          >
            <h2>Workers</h2>
            <p style={{ color: "blue" }}> {workers.length}</p>
          </Paper>
        </div>

        <div style={{ marginTop: "2rem" }}>
          {selectedCard === "locations" && <LocationsComponent {...props} />}
          {selectedCard === "doors" && <DoorsComponent data={doors} />}
          {selectedCard === "workers" && <WorkersComponent perPage={0} />}
        </div>
      </Container>
      <Container
        maxWidth="sm"
        sx={{
          height: "100%",
          display: "flex",
          gap: "1.5rem",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            // alignItems: "center",
            gap: ".3rem",
            padding: ".3rem",
            height: "60%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
          }}
          onClick={handleWorkersClick}
        >
          <h2>Event</h2>
          <Alert severity="error">This is an error alert — check it out!</Alert>
          <Alert severity="warning">
            This is a warning alert — check it out!
          </Alert>
          <Alert severity="info">This is an info alert — check it out!</Alert>
          <Alert severity="success">
            This is a success alert — check it out!
          </Alert>
          <Alert severity="success">
            This is a success alert — check it out!
          </Alert>
          <Alert severity="success">
            This is a success alert — check it out!
          </Alert>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: "40%",
            alignItems: "center",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onClick={handleWorkersClick}
        >
          <h2>Weekly Traffic</h2>
          <p style={{ color: "blue" }}> {workers.length}</p>
          <WorkerChart />
        </Paper>
      </Container>
    </Card>
  );
};

export default LocationList;
