import React, { useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import customDataProvider from "../../dataProvider";
import { useParams } from "react-router-dom";
import LocationList from "./Location";
import { GlobalContext } from "../../customHook/context";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";

interface ItemProps {
  floor: string;
  name: string;
  updatedAt: string;
  addressCity: string;
  addressStreet: string;
}
const ItemEdit = () => {
  const { id } = useParams();

  const [item, setItem] = React.useState<ItemProps[]>([]);
  const { locations } = React.useContext(GlobalContext);

  const fetchItemById = async () => {
    let location = window.location.hash.split("/")[1];
    const resource = location;
    const params = {
      pagination: { page: 1, perPage: 10 },
      sort: { field: "name", order: "ASC" },
      filter: { id },
    };

    try {
      //@ts-ignore
      const response = await customDataProvider.getOne(resource, id);
      const itemData = response.data;
      setItem([itemData]);
    } catch (error) {
      console.error(error);
    }
  };
  let history = useNavigate();
  const navigateBack = () => {
    history("/");
  };
  useEffect(() => {
    fetchItemById();
  }, []);

  return (
    <Container>
      <Box style={{ marginTop: "2rem" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            onClick={navigateBack}
            style={{ display: "flex", alignItems: "center", gap: ".7rem" }}
          >
            <ChevronLeft color="primary" />
            <Typography color={"primary"} variant="h5">
              {item[0]?.name}
            </Typography>
          </div>
          <Button variant="outlined" sx={{ border: "1px solid blue" }}>
            Edit Details
          </Button>
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.3rem",
            margin: "1rem 0",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            City:{item[0]?.addressCity}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            street:{item[0]?.addressStreet}
          </Typography>
        </div>
      </Box>
      <LocationList data={locations} />
    </Container>
  );
};

export default ItemEdit;
