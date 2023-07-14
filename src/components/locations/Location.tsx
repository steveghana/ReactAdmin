import * as React from "react";
import { Datagrid, EditButton, List, ListProps, TextField } from "react-admin";
import { Box, TextField as Field, Pagination, Typography } from "@mui/material";
import useSearchFilter from "../../customHook";
interface Location {
  id: number;
  location: string;
  city: string;
  address: string;
}

interface LocationListProps {
  data: any[];
}

const LocationList: React.FC<LocationListProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(props.data.length / itemsPerPage);
  const [data, searchTerm, handleSearch] = useSearchFilter(props.data);
  return (
    <>
      <Field
        variant="outlined"
        name="password"
        autoComplete="off"
        type="text"
        placeholder="Enter name"
        label="Location"
        sx={{ marginTop: "3rem" }}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List pagination={false}>
        <Datagrid data={!data.length ? props.data : data} rowClick="edit">
          <TextField source="name" sortable={true} label="Location Name" />
          <TextField source="addressCity" sortable={true} label="City" />
          <TextField source="addressStreet" sortable={true} label="Street" />
          <TextField source="address" sortable={true} label="Full Address" />
        </Datagrid>
        <EditButton />
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
          />
        </Box>
        <Typography
          variant="caption"
          color="textSecondary"
          align="center"
          marginTop={2}
        >
          Page {currentPage} of {totalPages}
        </Typography>
      </List>
    </>
  );
};

export default LocationList;
