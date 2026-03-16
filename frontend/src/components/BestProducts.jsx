import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Rating,
  Container,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";

const BestProducts = () => {
  const products = [
    {
      title: "Breed Dry Dog Food",
      price: 100,
      image: "/pro.png",
      rating: 4,
      reviews: 35,
    },
    {
      title: "CANON EOS DSLR Camera",
      price: 360,
      image: "/cam.png",
      rating: 5,
      reviews: 95,
    },
    {
      title: "ASUS FHD Gaming Laptop",
      price: 700,
      image: "https://via.placeholder.com/200",
      rating: 4,
      reviews: 325,
    },
    {
      title: "Curology Product Set",
      price: 500,
      image: "https://via.placeholder.com/200",
      rating: 4,
      reviews: 145,
    },
  ];
  return (
    <Box
      sx={{
        marginBottom: "100px",
        marginTop: "50px",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          {/*Header Section*/}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 15,
                height: 30,
                bgcolor: "#DB4444",
                borderRadius: 1,
              }}
            ></Box>
            <Typography sx={{ color: "#DB4444", fontWeight: 600 }}>
              This Month
            </Typography>
          </Box>
          {/* Title + Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Best Selling Products
            </Typography>
            <Box>
              <Button
                sx={{
                  bgcolor: "#DB4444",
                  //   px: 4,
                  //   py: 1.2,
                  borderRadius: 1,
                  color: "white",
                  "&:hover": { bgcolor: "#c0392b" },
                }}
              >
                View All
              </Button>
            </Box>
          </Box>
          {/* Products Grid */}
          <Grid container spacing={4} mt={3}>
            {products.map((product, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: 2,
                    minWidth: 270,
                    bgcolor: "#fff",
                    "&:hover": {
                      // boxShadow: 1,
                    },
                  }}
                >
                  {/* Image Section */}
                  <Box
                    sx={{
                      position: "relative",
                      bgcolor: "#f2f2f2",
                      padding: "10px",
                    }}
                  >
                    {/* Icons */}
                    <Box
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <IconButton size="small" sx={{ bgcolor: "#fff" }}>
                        <FavoriteBorderIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      sx={{
                        height: 200,
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ px: 0 }}>
                    <Typography
                      sx={
                        {
                          // "&hover":{
                          //     transform:
                          // }
                        }
                      }
                      fontSize={14}
                      fontWeight={600}
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      sx={{ color: "#DB4444", fontWeight: 600, mt: 1 }}
                    >
                      Rs.{product.price}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Rating value={product.rating} readOnly size="small" />
                      <Typography fontSize={12} sx={{ ml: 1 }}>
                        ({product.reviews})
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default BestProducts;
