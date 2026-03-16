import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box display={"flex"} alignItems={"center"} height={"75vh"}>
      <Container maxWidth={"xl"}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Box>
            <Typography variant="h2">404 Not Found</Typography>
            <Typography variant="h6" marginTop={2}>
              Your visited page not found. You may go home page.
            </Typography>
            <Button
              sx={{
                bgcolor: "#DB4444",
                width: "200px",
                borderRadius: 1,
                color: "white",
                marginTop: "4px",
                "&:hover": { bgcolor: "#c0392b" },
              }}
            >
              <Link
                style={{
                  color: "#fff",
                  textDecoration: "none",
                }}
                to={"/"}
              >
                {" "}
                Back to home page
              </Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
