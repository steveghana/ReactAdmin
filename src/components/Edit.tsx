import React from "react";
import { Container, Box, Typography, Button, Pagination } from "@mui/material";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import useSearchFilter from "../customHook";

type IEdit = {
  intro: Record<string, string>;
  name: string;
  data: { [key: string]: any }[];
};

const Edit: React.FC<IEdit> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [workers, setWorkers] = React.useState<any[]>([]);
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
          <Typography variant="h5">{props.name}</Typography>
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
          {Object.values(props.intro).map((item) => (
            <Typography variant="body2" color="textSecondary">
              {item}
            </Typography>
          ))}
        </div>
      </Box>
      <List pagination={false}>
        <Datagrid
          data={data.length < currentItems.length ? data : currentItems}
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
    </Container>
  );
};

export default Edit;
