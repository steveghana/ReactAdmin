import * as React from "react";
import { ListProps, useDataProvider } from "react-admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Paper } from "@mui/material";
import WorkersComponent from "./Workers";
import LocationsComponent from "./Location";
import DoorsComponent from "./Doors";
import Layout from "../Layout";
import WorkerDetails from "./WorkerDetails";
import { GlobalContext } from "../customHook/context";
interface Location {
  id: number;
  location: string;
  city: string;
  address: string;
}

const LocationList: React.FC = (props) => {
  const [selectedCard, setSelectedCard] = React.useState("locations");
  const { doors, locations, workers } = React.useContext(GlobalContext);
  const handleLocationsClick = () => setSelectedCard("locations");
  const handleDoorsClick = () => setSelectedCard("doors");
  const handleWorkersClick = () => setSelectedCard("workers");

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

      <LocationsComponent {...props} data={locations} />
    </Layout>
  );

  // }
};

export default LocationList;
