import React from "react";
import { List, Datagrid, TextField, useGetList } from "react-admin";
import { Box, Pagination, Typography } from "@mui/material";
import { TextField as Field } from "@mui/material";
import useSearchFilter from "../../CustomHook";
import Layout from "../../Layout";
import { IWorkers } from "../../types";

const WorkersComponent: React.FC<IWorkers> = () => {
  const { data, isLoading } = useGetList("users");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (_: any, newPage: number) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.length
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const [item, searchTerm, handleSearch] = useSearchFilter(
    data?.length ? data : []
  );
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator if data is being fetched
  }
  return (
    <Layout>
      <Field
        variant="outlined"
        name="password"
        autoComplete="off"
        type="text"
        placeholder="Enter name"
        label="Name"
        sx={{ marginTop: "3rem" }}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List pagination={false}>
        <Datagrid
          data={item.length < currentItems.length ? item : currentItems}
          rowClick="edit"
        >
          <TextField source="name" sortable={true} label="Worker" />
          <TextField source="email" sortable={true} label="Email" />
          <TextField source="phoneNumber" sortable={true} label="Phone" />
          <TextField source="updatedAt" sortable={true} label="Last unlock" />
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

export default WorkersComponent;