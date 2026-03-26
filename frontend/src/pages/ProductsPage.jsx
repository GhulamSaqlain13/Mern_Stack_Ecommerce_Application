import {
  Box,
  Grid,
  Container,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, clearError } from "../app/slices/productSlice";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigateTo("/shop");
  };
  // Access the products state from Redux
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
   
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllProducts());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <Box sx={{ bgcolor: "#fff", marginTop: "60px" }}>
            <Container maxWidth={"xl"}>
              <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
                {/* Section Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 15,
                      height: 30,
                      bgcolor: "#DB4444",
                      borderRadius: 1,
                    }}
                  />
                  <Typography sx={{ color: "#DB4444", fontWeight: 600 }}>
                    Our Products
                  </Typography>
                </Box>

                {/* Title */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography variant="h5" fontWeight={700}>
                    Explore Our Products
                  </Typography>
                </Box>

                {/* Products Grid */}
                <Grid container spacing={4} mt={3}>
                  {products?.slice(0, 8).map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product._id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>

                {location.pathname !== "/products" && (
                  <Box sx={{ textAlign: "center", mt: 6 }}>
                    <Button
                      variant="contained"
                      onClick={handleNavigate}
                      sx={{
                        bgcolor: "#DB4444",
                        px: 4,
                        py: 1.2,
                        borderRadius: 1,
                        "&:hover": { bgcolor: "#c0392b" },
                      }}
                    >
                      View All Products
                    </Button>
                  </Box>
                )}
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductsPage;
