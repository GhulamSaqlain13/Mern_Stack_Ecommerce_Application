import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
  Paper,
} from "@mui/material";
import React from "react";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";

const AboutPage = () => {
  const staffs = [
    {
      title: "Tom Cruise",
      description: "Founder & Chairman",
      image: "/staff1.png",
    },
    {
      title: "Emma Watson",
      description: "Managing Director",
      image: "/staff2.png",
    },
    {
      title: "Will Smith",
      description: "Product Designer",
      image: "/staff3.png",
    },
  ];
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
    <Box sx={{ p: 4 }}>
      <Container maxWidth="xl">
        {/* Breadcrumb */}
        <Typography variant="body2" color="text.secondary" mb={1}>
          Home / About
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // Responsive direction
          alignItems="center"
          gap={4}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" }, //  Correct responsive width
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Story
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </Typography>
            <Typography>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </Typography>
          </Box>

          <Box
            component={"img"}
            src="/about.avif"
            sx={{
              width: { xs: "100%", md: "50%" },
              height: 450,
              // bgcolor: "grey.300",
            }}
          ></Box>
        </Box>
       
        <Grid container spacing={4} mt={8}>
          {staffs.map((staff, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  boxShadow: "none",
                  borderRadius: 2,
                  bgcolor: "#fff",
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    bgcolor: "#f2f2f2",
                    width: 350,
                    mb: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={staff.image}
                    alt={staff.title}
                    sx={{
                      height: 300,
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent
                  sx={{
                    padding: "0px",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {staff.title}
                  </Typography>

                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    {staff.description}
                  </Typography>
                  <Box display={"flex"} gap={"12px"} mt={"4px"}>
                    <LinkedInIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ py: 8, backgroundColor: "#fff", mt: 4 }}>
          <Container>
            <Grid container spacing={9} justifyContent="center">
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
      </Container>
    </Box>
  );
};

export default AboutPage;
