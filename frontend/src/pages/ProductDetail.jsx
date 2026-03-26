import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductDetails } from "../app/slices/productSlice";
import { addToCart } from "../app/slices/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { id } = useParams();
  const { productDetail, loading, error } = useSelector(
    (state) => state.products,
  );
  const { cartItems } = useSelector((state) => state.cart);

  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getAllProducts());
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  // set first image when product loads
  useEffect(() => {
    if (productDetail?.images.length > 0) {
      setSelectedImage(productDetail?.images[0].url);
    }
  }, [productDetail]);

  //add to cart handler
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: productDetail._id, quantity: qty }));

    // navigateTo("/cart");
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      navigateTo("/cart");
    }
  }, [cartItems]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <Box>
          <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Grid container spacing={1} justifyContent={"center"}>
              {/* ================= LEFT IMAGES ================= */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box display="flex" gap={2}>
                  {/* Thumbnails */}
                  <Box display="flex" flexDirection="column" gap={2}>
                    {productDetail?.images?.map((img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={img.url}
                        onClick={() => setSelectedImage(img.url)}
                        sx={{
                          width: 80,
                          height: 80,
                          cursor: "pointer",
                          borderRadius: 2,
                          border:
                            selectedImage === img.url
                              ? "2px solid #DB4444"
                              : "1px solid #eee",
                          // p: 1,
                          display: { xs: "none", md: "block" },
                        }}
                      />
                    ))}
                  </Box>

                  {/* Main Image */}
                  <Box
                    component="img"
                    src={selectedImage || "/placeholder.png"}
                    alt={productDetail?.title}
                    sx={{
                      width: "100%",
                      maxWidth: 450,
                      borderRadius: 2,
                      bgcolor: "#f5f5f5",
                      p: 4,
                    }}
                  />
                </Box>
              </Grid>

              {/* ================= RIGHT DETAILS ================= */}
              <Grid size={{ xs: 12, md: 6 }} sx={{ maxWidth: 500 }}>
                <Typography variant="h5" fontWeight={600}>
                  {productDetail?.title}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  ⭐⭐⭐⭐☆ ({productDetail?.numOfReviews || 12} Reviews) |
                  {productDetail?.stock > 0 ? "In Stock" : "Out of Stock"}
                </Typography>

                <Typography
                  variant="h5"
                  color="text.main"
                  mt={2}
                  fontWeight={600}
                >
                  Rs.{productDetail?.price}
                </Typography>

                <Typography mt={2} color="text.main">
                  {productDetail?.description}
                </Typography>

                <Divider sx={{ my: 3 }} color="text.main" />

                {/* Quantity + Buy */}
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    border="1px solid #000"
                    borderRadius={1}
                  >
                    <IconButton onClick={() => qty > 1 && setQty(qty - 1)}>
                      <RemoveIcon color="text.main" />
                    </IconButton>
                    <Typography px={2}>{qty}</Typography>
                    <IconButton onClick={() => setQty(qty + 1)}>
                      <AddIcon color="text.main" />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#DB4444",
                      "&:hover": { bgcolor: "#c0392b" },
                    }}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>

                  <IconButton
                    sx={{
                      border: "1px solid #ddd",
                      "&:hover": {
                        bgcolor: "#DB4444",
                        color: "#fff",
                      },
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Box>

                {/* Delivery Boxes */}
                <Box border="1px solid #000" mt={4} p={2}>
                  <Typography fontWeight={600}>Free Delivery</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter your postal code for Delivery Availability
                  </Typography>
                </Box>

                <Box border="1px solid #000" p={2}>
                  <Typography fontWeight={600}>Return Delivery</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Free 30 Days Delivery Returns
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            {/* related */}
            <Box pt={8}>
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
                      Products For You
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
                      Recommended Products
                    </Typography>
                    <Box></Box>
                  </Box>
                  {/* Products Grid */}
                  <Grid container spacing={4} mt={3}>
                    {products?.slice(0, 4).map((product) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product._id}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};


export default ProductDetail;
