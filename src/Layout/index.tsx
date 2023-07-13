import { Card, Container } from "@mui/material";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Card
      style={{
        display: "flex",
        gap: "1rem",
        marginTop: "2rem",
        height: "90%",
      }}
    >
      <Container maxWidth="md" sx={{ mt: "2rem" }}>
        {children}
      </Container>
    </Card>
  );
};
export default Layout;
