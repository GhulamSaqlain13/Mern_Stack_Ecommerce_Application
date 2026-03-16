import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

//   {
//     title: "Breed Dry Dog Food",
//     price: 100,
//     image: "/pro.png",
//     rating: 4,
//     reviews: 35,
//   },
//   {
//     title: "CANON EOS DSLR Camera",
//     price: 360,
//     image: "/cam.png",
//     rating: 5,
//     reviews: 95,
//   },
//   {
//     title: "ASUS FHD Gaming Laptop",
//     price: 700,
//     image: "https://via.placeholder.com/200",
//     rating: 4,
//     reviews: 325,
//   },
//   {
//     title: "Curology Product Set",
//     price: 500,
//     image: "https://via.placeholder.com/200",
//     rating: 4,
//     reviews: 145,
//   },
// ];

const ProductCard = ({ product }) => {
  if (!product) return null;
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: 2,
            maxWidth: 270,
            bgcolor: "#fff",
            // "&:hover": {
            //    boxShadow: 1,
            //    bgcolor: "black",
            //    opacity: 1,
            // },
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
              {/* <IconButton size="small" sx={{ bgcolor: "#fff" }}>
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton> */}
            </Box>

            <CardMedia
              component="img"
              image={
                product.images && product.images.length > 0
                  ? product.images[0].url
                  : "/placeholder.png"
              }
              alt={product.title}
              sx={{
                height: 200,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Content */}
          <CardContent sx={{ px: 0 }}>
            {/* <Button
              sx={{
                display: "none",
                "&:hover": {
                  display: "block",
                },
              }}
            >
              Add to cart
            </Button> */}
            <Typography fontSize={14} fontWeight={600}>
              {product.title}
            </Typography>

            <Typography sx={{ color: "#DB4444", fontWeight: 600 }}>
              Rs.{product.price}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <Rating value={product.rating} readOnly size="small" /> */}
              <Rating sx={{ px: 0 }} value={"4"} readOnly size="small" />
              <Typography fontSize={12} sx={{ ml: 1 }}>
                {/* ({product.reviews}) */}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
