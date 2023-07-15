import {
  Create,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
} from "react-admin";

export const MyToolbar = () => (
  <Toolbar style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <SaveButton style={{ width: "420px" }} variant="contained">
      Add new worker
    </SaveButton>
  </Toolbar>
);
const DoorCreate = () => {
  return (
    <Create>
      <SimpleForm toolbar={<MyToolbar />}>
        <TextInput label="Door Name" source="name" />
        {/* <TextInput label="Location" source="addressCity" /> */}
        <TextInput type="number" label="Floor Number" source="floor" />
        <TextInput label="Serial Number" source="identifier" />
      </SimpleForm>
    </Create>
  );
};

export default DoorCreate;
