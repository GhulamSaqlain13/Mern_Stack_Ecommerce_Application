import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <CancelOutlinedIcon sx={{ fontSize: 100, color: "red", mb: 3 }} />
      <Typography variant="h4" gutterBottom>
        Payment Cancelled
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Your payment was not completed. You can try again or contact support if
        needed.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => navigate("/cart")}
      >
        Back to Cart
      </Button>
    </Container>
  );
};

export default CancelPage;
