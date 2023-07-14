import { Card, Container } from "@mui/material";
import React from "react";
import Events from "../components/Event_Charts/Event_Charts";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Card
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "2rem",
        height: "90%",
      }}
    >
      <Container maxWidth="md" sx={{ mt: "2rem" }}>
        {children}
      </Container>
      <Events />
    </Card>
  );
};
export default Layout;
