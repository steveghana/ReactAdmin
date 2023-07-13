import React from "react";
import { Container, Box, Typography, Button, Pagination } from "@mui/material";

type IEdit = {
  intro: Record<string, string>;
  name: string;
  data: { [key: string]: any }[];
  withTable?: boolean;
};

const Edit: React.FC<IEdit> = (props) => {
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
    </Container>
  );
};

export default Edit;
