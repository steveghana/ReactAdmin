import React from "react";
import { Datagrid, List, ListProps, TextField } from "react-admin";
import PostPagination from "./customPagination";

const Doors: React.FC<{ data: any }> = (props) => {
  return (
    <List pagination={false}>
      <Datagrid data={props.data}>
        <TextField source="name" sortable={true} label="Location Name" />
        <TextField source="addressCity" sortable={true} label="City" />
        <TextField source="addressStreet" sortable={true} label="Street" />
        <TextField source="address" sortable={true} label="Full Address" />
      </Datagrid>
    </List>
  );
};

export default Doors;
