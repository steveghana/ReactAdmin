import * as React from "react";
import { ListProps, useDataProvider } from "react-admin";
import { Alert, Card, Container, Paper, TextField } from "@mui/material";
import WorkersComponent from "./Workers";
import LocationsComponent from "./Location";
import DoorsComponent from "./Doors";
import WorkerChart from "./Charts";
import Layout from "../Layout";
import useSearchFilter from "../customHook";

import Events from "./Event_Charts";
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
  // console.log(data);
  React.useEffect(() => {
    const fetchAllData = async () => {
      const [locationsData, doorsData, workersData] = await Promise.all([
        fetchLocations("locations"),
        fetchDoors("gates-users"),
        fetchWorkers("users"),
      ]);
      console.log(locationsData);

      setLocations(locationsData);
      setDoors(doorsData);
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
  // console.log(data);
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
    <Layout>
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
        {selectedCard === "locations" && (
          <LocationsComponent {...props} data={locations} />
        )}
        {selectedCard === "doors" && <DoorsComponent data={doors} />}
        {selectedCard === "workers" && <WorkersComponent workers={workers} />}
      </div>
    </Layout>
  );
};

export default LocationList;
