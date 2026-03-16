import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 16, mb: 16 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 100, color: "green", mb: 3 }} />
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Thank you for your purchase. Your order has been confirmed and is being
        processed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/shop")}
      >
        Go to Products
      </Button>
    </Container>
  );
};

export default SuccessPage;
