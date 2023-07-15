import * as React from "react";
import { Paper, Typography } from "@mui/material";
import LocationsComponent from "./locations/Location";
import Layout from "../layout";
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
          <Typography variant="h4">Locations</Typography>
          <Typography color={"primary"} variant="button">
            {locations.length}
          </Typography>
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
          <Typography variant="h4">Doors</Typography>
          <Typography color={"primary"} variant="button">
            {doors.length}
          </Typography>
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
          <Typography variant="h4">Workers</Typography>
          <Typography color={"primary"} variant="button">
            {workers.length}
          </Typography>
        </Paper>
      </div>
      <LocationsComponent {...props} data={locations} />
    </Layout>
  );

  // }
};

export default LocationList;
