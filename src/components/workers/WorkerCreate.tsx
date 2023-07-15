import React from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  Create,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
} from "react-admin";
import { IToolbar } from "../../types";

export const MyToolbar: React.FC<IToolbar> = (props) => (
  <Toolbar style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <SaveButton
      onClick={() => props.setClicked(false)}
      style={{ width: "420px" }}
      variant="contained"
    >
      Add new worker
    </SaveButton>
    {!props.noPermission && (
      <Button
        onClick={() => props.setClicked((prev) => !prev)}
        style={{ width: "420px" }}
        variant="outlined"
      >
        Add new worker with permissions
      </Button>
    )}
  </Toolbar>
);
const CreateWorker = () => {
  const [clicked, setClicked] = React.useState(false);

  return (
    <div>
      <Create>
        {!clicked ? (
          <SimpleForm toolbar={<MyToolbar setClicked={setClicked} />}>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phoneNumber" />
          </SimpleForm>
        ) : (
          <SimpleForm
            toolbar={<MyToolbar noPermission={true} setClicked={setClicked} />}
          >
            <TextInput label="Door" source="name" />
            <TextInput label="Role" source="role" />
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Button variant="contained" disabled size="small">
                Daily
              </Button>
              <Button variant="contained" disabled size="small">
                Weekly
              </Button>
              <Button variant="contained" color="primary" size="small">
                Date Range
              </Button>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["StaticDatePicker"]}>
                <DemoItem label="Static variant">
                  <StaticDatePicker defaultValue={dayjs("2023-04-17")} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </SimpleForm>
        )}
      </Create>
    </div>
  );
};

export default CreateWorker;
