import { Box, Pagination, Typography } from "@mui/material";
import React from "react";
import { Datagrid, List, ListProps, TextField } from "react-admin";

const Doors: React.FC<{ data: any }> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(props.data.length / itemsPerPage);
  return (
    <List pagination={false}>
      <Datagrid data={currentItems}>
        <TextField source="name" sortable={true} label="Location Name" />
        <TextField source="addressCity" sortable={true} label="City" />
        <TextField source="addressStreet" sortable={true} label="Street" />
        <TextField source="address" sortable={true} label="Full Address" />
      </Datagrid>
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
  );
};

export default Doors;
