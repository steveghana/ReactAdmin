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
// const CustomLink: React.FC<{
//   record: Location;
//   basePath: string;
//   children: React.ReactNode;
// }> = ({ record, basePath, children }) => (
//   <Link to={`${basePath}/${record.id}`}>{children}</Link>
// );
const LocationList: React.FC<LocationListProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data } = props;

  return (
    // <>
    <List pagination={false}>
      <Datagrid
        data={props.data}
        rowClick="edit"
        //@ts-ignore

        // linkType={CustomLink}
      >
        <TextField source="name" sortable={true} label="Location Name" />
        <TextField source="addressCity" sortable={true} label="City" />
        <TextField source="addressStreet" sortable={true} label="Street" />
        <TextField source="address" sortable={true} label="Full Address" />
        {/* <EditButton LinkComponent={CustomLink} /> */}
      </Datagrid>
    </List>
  );
};

export default LocationList;
