import React, { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  FieldProps,
  useRecordContext,
} from "react-admin";
import { Box, InputBase, Pagination, Typography } from "@mui/material";

interface WorkersComponentProps {
  workers: any[];
}

const WorkersComponent: React.FC<WorkersComponentProps> = ({ workers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = workers.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems, "from work");
  const record = useRecordContext();

  const timestamp = record ? record.timestamp : null;
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString()
    : "";
  const totalPages = Math.ceil(workers.length / itemsPerPage);
  /*   const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ); */
  return (
    <>
      <InputBase />
      <List pagination={false}>
        <Datagrid data={currentItems}>
          <TextField source="name" sortable={true} label="Worker" />
          <TextField source="email" sortable={true} label="Email" />
          <TextField source="phoneNumber" sortable={true} label="Phone" />
          {/* <TimestampField source="updatedAt" /> */}
          <TextField
            source="updatedAt"
            sortable={true}
            defaultValue={formattedTime}
            label="Last unlock"
          />
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

export default WorkersComponent;
