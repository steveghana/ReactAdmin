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

  const dataProvider = useDataProvider();

  React.useEffect(() => {
    const fetchAllData = async () => {
      const [locationsData, doorsData, workersData] = await Promise.all([
        fetchLocations("locations"),
        fetchDoors("gates-users"),
        fetchWorkers("users"),
      ]);
      setLocations(locationsData);
      setDoors(doorsData.slice(0, 25));
      setWorkers(workersData);
    };

    fetchAllData();
  }, []);
  const fetchWorkers = async (resource: string) => {
    const params = {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "name", order: "ASC" },
      filter: {},
    };

    return dataProvider
      .getList(resource, params)
      .then((response) => response.data);
  };
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
      .then((response: any) => response.data)
      .catch((err) => {
        console.error(err);
      });
    // Fetch doors data here
    // Return a promise that resolves to the doors data
  };

  return (
    <Card
      style={{
        display: "flex",
        gap: "1rem",
        // marginTop: "2rem",
        // height: "90%",
      }}
    >
      <Container maxWidth="md" /* sx={{ mt: "2rem" }} */>
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
          {selectedCard === "workers" && (
            <WorkersComponent perPage={0} workers={workers} />
          )}
        </div>
      </Container>
    </Card>
  );
};

export default LocationList;
