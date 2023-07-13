import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import customDataProvider from "../dataProvider";
import { useParams } from "react-router-dom";
import { Datagrid, List, TextField } from "react-admin";
interface ItemProps {
  floor: string;
}
const ItemEdit = () => {
  const { id } = useParams();

  const [item, setItem] = React.useState<ItemProps[]>([]);

  const fetchItemById = async () => {
    let location = window.location.hash.split("/")[1];
    const resource = location; // Change this to the appropriate resource
    const params = {
      pagination: { page: 1, perPage: 10 }, // Adjust pagination options as needed
      sort: { field: "name", order: "ASC" }, // Adjust sorting options as needed
      filter: { id }, // Filter by the ID parameter
    };
    console.log(id);

    try {
      //@ts-ignore
      const response = await customDataProvider.getOne(resource, id);
      console.log(response);
      const itemData = response.data; // Assuming the API returns a single item
      setItem(itemData.floors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItemById();
    console.log(item, "from item");
  }, []); // Run the fetchItemById function only once, on component mount

  return (
    <Container>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{"Loading..."}</Typography>
          <Button variant="outlined" sx={{ border: "1px solid blue" }}>
            Edit Details
          </Button>
        </Box>
        <Box sx={{ width: "100%" }}></Box>
        <Typography variant="body2" color="textSecondary">
          location
        </Typography>
        <Typography variant="body2" color="textSecondary">
          street
        </Typography>
      </Box>
      <Box>
        <Datagrid
          data={["1", "4", "5"]}
          // isLoading={isLoading}
          total={item && item.length}
          // rowClick="edit"
        >
          {/* <TextField source="id" sortable={false} />
          <TextField source="title" sortable={false} /> */}
        </Datagrid>
      </Box>
    </Container>
  );
};

export default ItemEdit;
