import React, { useState, useEffect } from "react";
import {
  List,
  Datagrid,
  TextField,
  Pagination,
  useDataProvider,
} from "react-admin";

interface Worker {
  id: number;
  name: string;
  position: string;
  // other properties
}
interface WorkersComponentProps {
  perPage: number;
}
const PostPagination = () => <Pagination rowsPerPageOptions={[10, 25]} />;
const WorkersComponent: React.FC<WorkersComponentProps> = ({ perPage }) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const dataProvider = useDataProvider();

  const fetchWorkers = async () => {
    const resource = "users";
    const params = {
      pagination: { page, perPage },
      sort: { field: "name", order: "ASC" },
      filter: {},
    };

    try {
      const response = await dataProvider.getList(resource, params);
      const { data, total } = response;
      setWorkers(data.slice(0, 25));
      //   setTotal(total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [page, perPage, dataProvider]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newPerPage = parseInt(event.target.value as string, 10);
    setPage(1);
    // setPerPage(newPerPage);
  };

  return (
    <>
      <List pagination={false}>
        <Datagrid data={workers}>
          <TextField source="name" sortable={true} label="Name" />
          <TextField source="position" sortable={true} label="Position" />
          {/* other fields */}
        </Datagrid>
      </List>
    </>
  );
};

export default WorkersComponent;
