import * as React from "react";
import { ListProps, useDataProvider } from "react-admin";
import { Paper } from "@mui/material";
import LocationsComponent from "./Location";
import Layout from "../Layout";
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
  const [locations, setLocations] = React.useState<Location[]>([]);
  // const [workerClicked, setWorkersClicked] = React.useState(false);
  const dataProvider = useDataProvider();
  // console.log(data);
  React.useEffect(() => {
    fetchLocations("locations");
  }, []);

  const fetchLocations = async (resource: string) => {
    const params = {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "location", order: "ASC" },
      filter: {},
    };
    try {
      let response = await dataProvider.getList(resource, params);
      setLocations(response.data);
      // .then((response: any) => response.data)
      // .catch((err) => {
      // });
    } catch (error) {
      console.error(error);
    }
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
          // onClick={handleLocationsClick}
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
          // onClick={handleDoorsClick}
        >
          <h2>Doors</h2>
          {/* <p style={{ color: "blue" }}> {doors.length}</p> */}
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
          // onClick={handleWorkersClick}
        >
          <h2>Workers</h2>
          {/* <p style={{ color: "blue" }}> {workers.length}</p> */}
        </Paper>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <LocationsComponent {...props} data={locations} />
      </div>
    </Layout>
  );

  // }
};

export default LocationList;
