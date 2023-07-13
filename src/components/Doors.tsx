import { Box, Pagination, Typography } from "@mui/material";
import React from "react";
import { Datagrid, List, ListProps, TextField } from "react-admin";
import { TextField as Field } from "@mui/material";
import useSearchFilter from "../customHook";
import customDataProvider from "../dataProvider";
import Layout from "../Layout";
import { GlobalContext } from "../customHook/context";

const Doors: React.FC<{ data: Record<string, string>[] }> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const { doors } = React.useContext(GlobalContext);
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = doors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(doors.length / itemsPerPage);
  const [data, searchTerm, handleSearch] = useSearchFilter(currentItems);
  return (
    <Layout>
      <Field
        variant="outlined"
        name="password"
        autoComplete="off"
        type="text"
        placeholder="Enter Door"
        label="Door"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List pagination={false}>
        <Datagrid
          data={data.length < currentItems.length ? data : currentItems}
        >
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
    </Layout>
  );
};

export default Doors;
