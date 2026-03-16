import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProduct,
  getAllProducts,
  getCategories,
} from "../app/slices/productSlice";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { products, categories, loading, catLoading, totalPages } = useSelector(
    (state) => state.products,
  );
  const [filters, setFilters] = useState({
    category: [],
    price: [0, 10000],
    sort: "createdAt",
    order: "desc",
    page: 1,
  });
  // initial Load=> Fetch Categories
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  //  Filter => Fetch Products when filters change
  useEffect(() => {
    const params = {
      category: filters.category.join(","),
      minPrice: filters.price[0],
      maxPrice: filters.price[1],
      sort: filters.sort,
      order: filters.order,
      page: filters.page,
      limit: 6,
    };
    dispatch(filterProduct(params));
  }, [filters, dispatch]);
  const handleCategoryToggle = (cat) => {
    const currentIndex = filters.category.indexOf(cat);
    const newChecked = [...filters.category];
    if (currentIndex === -1) newChecked.push(cat);
    else newChecked.splice(currentIndex, 1);

    setFilters({ ...filters, category: newChecked, page: 1 });
  };
  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, price: newValue, page: 1 });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value, page: 1 });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" p={1}>
          Home / Shop
        </Typography>

        <Grid container spacing={1}>
          <Grid
            size={{ xs: 12, md: 3 }}
            bgcolor={"#fff"}
            borderRadius={2}
            p={2}
            sx={{
              position: { xs: "relative", md: "sticky" },
              top: 20,
              height: { xs: "80vh", md: "100vh" },
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Filters
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Dynamic Categories */}
            <Typography variant="subtitle1" fontWeight="600">
              Categories
            </Typography>
            {catLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormGroup sx={{ mb: 3 }}>
                {categories.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    control={
                      <Checkbox
                        size="small"
                        checked={filters.category.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                      />
                    }
                    label={cat}
                  />
                ))}
              </FormGroup>
            )}

            {/* Price Slider */}
            <Typography variant="subtitle1" fontWeight="600" gutterBottom>
              Price Range
            </Typography>
            <Slider
              value={filters.price}
              onChange={handlePriceChange}
              // onChange={(e, val) =>
              //   setFilters({ ...filters, price: val, page: 1 })
              // }
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              sx={{ color: "primary.main" }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="body2">Rs.{filters.price[0]}</Typography>
              <Typography variant="body2">Rs.{filters.price[1]}</Typography>
            </Box>

            {/* Sorting */}
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sort}
                label="Sort By"
                onChange={handleSortChange}
                // onChange={(e) =>
                //   setFilters({ ...filters, sort: e.target.value, page: 1 })
                // }
              >
                <MenuItem value="createdAt">Newest First</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="title">Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            size={{ xs: 12, md: 9 }}
            bgcolor={"#fff"}
            borderRadius={2}
            p={2}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Products
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <>
              <Grid container spacing={4}>
                {products?.map((product) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              {/* Pagination */}
              <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={totalPages}
                  page={filters.page}
                  onChange={(e, value) =>
                    setFilters({ ...filters, page: value })
                  }
                  color="primary"
                />
              </Box>
            </>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopPage;
