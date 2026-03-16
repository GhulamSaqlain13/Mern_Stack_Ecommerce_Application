import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";

const ShippingPage = () => {
  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 28 }} />,
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 28 }} />,
      title: "24/7 CUSTOMER SERVICE",
      desc: "Friendly 24/7 customer support",
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
      title: "MONEY BACK GUARANTEE",
      desc: "We return money within 30 days",
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: "#fff" }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {features.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box textAlign="center">
                {/* Icon Circle */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: "#f2f2f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px",
                  }}
                >
                  {item.icon}
                </Box>

                {/* Title */}
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ShippingPage;
