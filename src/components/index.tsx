import * as React from "react";
import { Paper } from "@mui/material";
import LocationsComponent from "./Location";
import Layout from "../Layout";
import { GlobalContext } from "../customHook/context";
interface Location {
  id: number;
  location: string;
  city: string;
  address: string;
}

const LocationList: React.FC = (props) => {
  const { doors, locations, workers } = React.useContext(GlobalContext);
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
