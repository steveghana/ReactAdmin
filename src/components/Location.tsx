import * as React from "react";
import {
  Datagrid,
  EditButton,
  Link,
  List,
  ListProps,
  Pagination,
  TextField,
} from "react-admin";

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
  return (
    <List pagination={false}>
      <Datagrid data={props.data} rowClick="edit">
        <TextField source="name" sortable={true} label="Location Name" />
        <TextField source="addressCity" sortable={true} label="City" />
        <TextField source="addressStreet" sortable={true} label="Street" />
        <TextField source="address" sortable={true} label="Full Address" />
      </Datagrid>
    </List>
  );
};

export default LocationList;
