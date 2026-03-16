import React from "react";
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
  Chip,
  Container,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { updateProduct, deleteProduct } from "../app/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product, onEdit }) => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  if (!product) return null;
  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    // <Box sx={{ bgcolor: "#fff", py: 8 }}>
    //   <Container maxWidth={"xl"}>
    //     <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
    //       {/* Section Header */}
    //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //         <Box
    //           sx={{
    //             width: 15,
    //             height: 30,
    //             bgcolor: "#DB4444",
    //             borderRadius: 1,
    //           }}
    //         />
    //         <Typography sx={{ color: "#DB4444", fontWeight: 600 }}>
    //           Our Products
    //         </Typography>
    //       </Box>

    //       {/* Title + Arrows */}
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           mt: 2,
    //         }}
    //       >
    //         <Typography variant="h5" fontWeight={700}>
    //           Explore Our Products
    //         </Typography>

    //         <Box>
    //           <IconButton sx={{ bgcolor: "#eee", mr: 1 }}>
    //             <ArrowBackIosNewIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton sx={{ bgcolor: "#eee" }}>
    //             <ArrowForwardIosIcon fontSize="small" />
    //           </IconButton>
    //         </Box>
    //       </Box>

    //       {/* View All Button */}
    //       <Box sx={{ textAlign: "center", mt: 6 }}>
    //         <Button
    //           variant="contained"
    //           sx={{
    //             bgcolor: "#DB4444",
    //             px: 4,
    //             py: 1.2,
    //             borderRadius: 1,
    //             "&:hover": { bgcolor: "#c0392b" },
    //           }}
    //         >
    //           View All Products
    //         </Button>
    //       </Box>
    //     </Box>
    //   </Container>
    // </Box>
    <>
      {/* <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      > */}
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: 2,
          maxWidth: 270,
          bgcolor: "#fff",
          "&:hover": {
            // boxShadow: 1,
            // bgcolor: "black",
            // opacity: 1,
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
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => removeProduct(product._id)}
              disabled={loading}
              sx={{
                bgcolor: "#fff",
                "&:hover": {
                  transition: "0.4s",
                  bgcolor: "#DB4444",
                  color: "white",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                bgcolor: "#fff",
                marginLeft: {
                  xs: "115px", // mobile
                  // sm: "50px", // tablet
                  // md: "10px", // laptop
                  lg: "180px", // desktop
                },

                "&:hover": {
                  transition: "0.4s",
                  bgcolor: "#DB4444",

                  color: "white",
                },
              }}
            >
              <EditIcon fontSize="small" onClick={() => onEdit(product)} />
            </IconButton>
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
      {/* </Link> */}
    </>
  );
};

export default ProductCard;
