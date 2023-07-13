import * as React from "react";
import { Datagrid, EditButton, List, ListProps, TextField } from "react-admin";
import { TextField as Field } from "@mui/material";
import useSearchFilter from "../customHook";
interface Location {
  id: number;
  location: string;
  city: string;
  address: string;
}

interface LocationListProps extends ListProps {
  data: Location[];
}

const LocationList: React.FC<LocationListProps> = (props) => {
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
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List pagination={false}>
        <Datagrid data={data} rowClick="edit">
          <TextField source="name" sortable={true} label="Location Name" />
          <TextField source="addressCity" sortable={true} label="City" />
          <TextField source="addressStreet" sortable={true} label="Street" />
          <TextField source="address" sortable={true} label="Full Address" />
        </Datagrid>
        <EditButton />
      </List>
    </>
  );
};

export default LocationList;
