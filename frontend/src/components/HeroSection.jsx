import React from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ArrowRightAlt } from "@mui/icons-material";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Baby's & Toys",
  "Health & Beauty",
  "Groceries & Pets",
];

const slides = [
  {
    title: "iPhone 14 Series",
    heading: "Up to 10% off Voucher",
    image: "/iphone.png",
  },
  {
    title: "New MacBook",
    heading: "Special Discount",
    image: "/macbook.png",
  },
  {
    title: "Apple Watch",
    heading: "Limited Time Offer",
    image: "/hero.png",
  },
];

const HeroSection = () => {
  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* LEFT CATEGORY */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                borderRight: "1px solid #eee",
                height: "100%",
              }}
            >
              <List>
                {categories.map((cat, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText primary={cat} />
                    <ChevronRightIcon fontSize="small" />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* RIGHT SLIDER */}
          <Grid size={{ xs: 12, md: 9 }} height="60vh">
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              style={{
                background: "#000",
                borderRadius: "6px",
                height: "100%",
                width: "100%",
              }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ height: "100%", px: 6 }}
                  >
                    {/* TEXT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#aaa", mb: 1 }}
                      >
                        {slide.title}
                      </Typography>

                      <Typography
                        variant="h4"
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          mb: 2,
                        }}
                      >
                        {slide.heading}
                      </Typography>

                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          color: "#fff",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Shop Now
                        <ArrowRightAlt />
                      </Box>
                    </Grid>

                    {/* IMAGE */}
                    <Grid
                      size={{ xs: 12, md: 6 }}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Box
                        component="img"
                        src={slide.image}
                        alt="product"
                        sx={{
                          width: "90%",
                          maxHeight: 350,
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                  </Grid>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
