import { Box, Typography, Grid, Button, Container } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getcurrentMonthProducts,
  clearError,
} from "../app/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

const CurrentMonth = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // Access the products state from Redux
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getcurrentMonthProducts());
  }, [dispatch, error]);
  const handleNavigate = () => {
    navigateTo("/shop");
  };

  return (
    <>
      {loading ? (
        // <Loader />
        <p>loading...</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <Box paddingTop={8}>
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
                    onClick={handleNavigate}
                    sx={{
                      bgcolor: "#DB4444",

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
                {products?.slice(0, 4).map((product, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default CurrentMonth;
