import { Box, Pagination, Typography } from "@mui/material";
import React from "react";
import { Datagrid, List, ListProps, TextField } from "react-admin";
import { TextField as Field } from "@mui/material";
import useSearchFilter from "../customHook";

const Doors: React.FC<{ data: Record<string, string>[] }> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(props.data.length / itemsPerPage);
  const [data, searchTerm, handleSearch] = useSearchFilter(currentItems);
  return (
    <>
      <Field
        variant="outlined"
        name="password"
        autoComplete="off"
        type="text"
        placeholder="Enter name"
        label="Name"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List pagination={false}>
        <Datagrid data={data}>
          <TextField source="name" sortable={true} label="Door Name" />
          <TextField source="addressCity" sortable={true} label="Location" />
          <TextField source="addressStreet" sortable={true} label="Floor" />
          <TextField source="address" sortable={true} label="Status" />
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
    </>
  );
};

export default Doors;
