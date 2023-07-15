import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
type IEdit = {
  intro: Record<string, string>;
  name?: string;
  data?: { [key: string]: any }[];
  withTable?: boolean;
};

const Edit: React.FC<IEdit> = (props) => {
  let history = useNavigate();
  const navigateBack = () => {
    history("/");
  };
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
          <div
            onClick={navigateBack}
            style={{ display: "flex", gap: ".7rem", alignItems: "center" }}
          >
            <ChevronLeft color="primary" />
            <Typography color={"primary"} variant="h5">
              {props?.name}
            </Typography>
          </div>
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
          {Object.values(props?.intro)?.map((item, i) => (
            <Typography
              key={`${item}${i}`}
              variant="body2"
              color="textSecondary"
            >
              {`${Object.keys(props?.intro)[i]} :${item}`}
            </Typography>
            // {

            // }
          ))}
        </div>
      </Box>
    </Container>
  );
};

export default Edit;