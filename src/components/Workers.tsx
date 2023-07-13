import React, { useState } from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import { Box, Pagination, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { TextField as Field } from "@mui/material";
import useSearchFilter from "../customHook";
import customDataProvider from "../dataProvider";
import Layout from "../Layout";

interface WorkersComponentProps {
  workers: any[];
  setWorkersClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkersComponent: React.FC<WorkersComponentProps> = ({
  // workers,
  setWorkersClicked,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [workers, setWorkers] = React.useState<any[]>([]);
  const itemsPerPage = 10;
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = workers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(workers.length / itemsPerPage);
  const [data, searchTerm, handleSearch] = useSearchFilter(currentItems);
  const fetchWorkers = async (resource: string) => {
    const params = {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "name", order: "ASC" },
      filter: {},
    };

    try {
      let response = await customDataProvider.getList(resource, params);
      // console.log(response.data);
      setWorkers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchWorkers("users");
  }, []);
  console.log(workers, "dataset");
  return (
    <Layout>
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
          <TextField source="updatedAt" sortable={true} label="Last unlock" />
          {/* <Link to={"/worker"}> */}
          <EditButton onClick={() => setWorkersClicked(true)} />
          {/* </Link> */}
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
