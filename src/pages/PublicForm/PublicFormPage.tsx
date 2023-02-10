import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import PublicForm from "./components/PublicForm";

const PublicFormPage = () => {
  return (
    <Box p={2} bgcolor={"#F5F5F5"} height={"100vh"}>
      <Container
        sx={{
          height: "100%",
        }}
      >
        <Box
          component={Paper}
          elevation={0}
          sx={{
            width: {
              xs: 280,
              md: 360,
              lg: 390,
            },
            margin: "0 auto",
            p: 2,
          }}
        >
          <PublicForm />
        </Box>
      </Container>
    </Box>
  );
};

export default PublicFormPage;
