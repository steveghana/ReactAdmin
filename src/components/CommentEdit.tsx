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

  const fetchItemById = async () => {
    let location = window.location.hash.split("/")[1];
    const resource = location;
    const params = {
      pagination: { page: 1, perPage: 10 },
      sort: { field: "name", order: "ASC" },
      filter: { id },
    };
    console.log(id);

    try {
      //@ts-ignore
      const response = await customDataProvider.getOne(resource, id);
      console.log(response);
      const itemData = response.data;
      setItem([itemData]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItemById();
    console.log(item, "from item");
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
          <Typography variant="h5">{item[0]?.name}</Typography>
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
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Door Name</TableCell>
                <TableCell align="right">Last Unlock</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row?.name}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.floor?.length ? row.floor[0] : 0}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(row.updatedAt).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ItemEdit;
