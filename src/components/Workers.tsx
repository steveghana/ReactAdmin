import React, { useState } from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import { Box, Pagination, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { TextField as Field } from "@mui/material";
import useSearchFilter from "../customHook";

interface WorkersComponentProps {
  workers: any[];
}
interface Location {
  id: number;
  location: string;
  city: string;
  address: string;
}

const WorkersComponent: React.FC<WorkersComponentProps> = ({ workers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const navigate = useNavigate();
  const itemsPerPage = 10;
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = workers.slice(indexOfFirstItem, indexOfLastItem);
  // let location = window.origin;
  const totalPages = Math.ceil(workers.length / itemsPerPage);
  const [data, searchTerm, handleSearch] = useSearchFilter(currentItems);
  // console.log(searchTerm);
  // const formattedTime = timestamp
  //   ? new Date(timestamp).toLocaleTimeString()
  //   : "";
  /*   const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ); */
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
        <Datagrid
          data={data.length < currentItems.length ? data : currentItems}
          rowClick="edit"
        >
          <TextField source="name" sortable={true} label="Worker" />
          <TextField source="email" sortable={true} label="Email" />
          <TextField source="phoneNumber" sortable={true} label="Phone" />
          {/* <TimestampField source="updatedAt" /> */}
          <TextField source="updatedAt" sortable={true} label="Last unlock" />
        </Datagrid>
        <EditButton
        // onClick={() => {
        //   navigate(`${location}/#/workers`);
        // }}
        />
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

export default WorkersComponent;
