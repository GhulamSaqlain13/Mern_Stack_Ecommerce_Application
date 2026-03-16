import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProduct,
  updateProduct,
  getAllProducts,
  clearError,
  clearMessage,
} from "../../app/slices/productSlice";

import { toast } from "react-toastify";
import ProductCard from "../../components/dashboardProducts";
import Loader from "../../components/Loader";

const Products = () => {
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const { products, loading, error, message } = useSelector(
    (state) => state.products,
  );

  const [open, setOpen] = useState(false);

  const handleEdit = (product) => {
    setIsEdit(true);
    setEditId(product._id);

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });

    setOpen(true);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);

  const handleOpen = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEditId(null);

    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });

    setImages([]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // const handleCreateProduct = () => {
  //   const data = new FormData();

  //   data.append("title", formData.title);
  //   data.append("description", formData.description);
  //   data.append("price", formData.price);
  //   data.append("category", formData.category);
  //   data.append("stock", formData.stock);

  //   images.forEach((img) => {
  //     data.append("images", img);
  //   });

  //   dispatch(createProduct(data));
  // };

  // Load products on mount

  const handleSubmitProduct = () => {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    images.forEach((img) => {
      data.append("images", img);
    });

    if (isEdit) {
      dispatch(updateProduct({ id: editId, data }));
    } else {
      dispatch(createProduct(data));
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Handle success
  useEffect(() => {
    if (message) {
      toast.success(message);
      handleClose();
      dispatch(getAllProducts());
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            marginBottom: "100px",
            paddingLeft: "14%",
            width: "100%",
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // mt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: "24px",
                      sm: "28px",
                      md: "32px",
                    },
                  }}
                >
                  Our Products
                </Typography>

                <Button
                  onClick={handleOpen}
                  sx={{
                    bgcolor: "#DB4444",
                    borderRadius: 1,
                    color: "white",
                    "&:hover": { bgcolor: "#c0392b" },
                  }}
                >
                  Create Product
                </Button>
              </Box>

              {/* Products Grid */}
              <Grid container spacing={4} mt={3}>
                {products?.map((product) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                    <ProductCard product={product} onEdit={handleEdit} />
                  </Grid>
                ))}
              </Grid>

              {/* Dialog */}
              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                  {isEdit ? "Update Product" : "Create Product"}
                </DialogTitle>

                <DialogContent>
                  <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    margin="normal"
                    value={formData.title}
                    onChange={handleChange}
                  />

                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                    value={formData.description}
                    onChange={handleChange}
                  />

                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={formData.price}
                    onChange={handleChange}
                  />

                  <TextField
                    label="Category"
                    name="category"
                    fullWidth
                    margin="normal"
                    value={formData.category}
                    onChange={handleChange}
                  />

                  <TextField
                    label="Stock"
                    name="stock"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={formData.stock}
                    onChange={handleChange}
                  />

                  <Box mt={2}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Box>
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose} color="error">
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleSubmitProduct}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : isEdit ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Products;
