import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  removeFromCart,
  updateCart,
  clearCart,
  fetchCart,
} from "../app/slices/cartSlice";
import { createCheckoutSession } from "../app/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { cartItems, totalPrice, loading, error } = useSelector(
    (state) => state.cart,
  );

  const { checkoutUrl, loading: checkoutLoading } = useSelector(
    (state) => state.order,
  );
  // console.log("CART ITEMS", cartItems);
  const handleCheckout = () => {
    dispatch(createCheckoutSession());
  };

  // Redirect to Stripe
  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  // Fetch cart when page loads
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  //  Remove Item
  const removeItemHandler = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success("Item delete successfully!");
  };

  //  Quantity Change (backend increment logic fix)
  const quantityChangeHandler = (productId, quantity) => {
    dispatch(updateCart({ productId, quantity }));
    toast.success("Quantity updated successfully!");
  };

  //  Clear Cart
  const clearCartHandler = () => {
    dispatch(clearCart());
    toast.success("Cart Cleared successfully!");
  };

  //  Checkout
  // const checkoutHandler = () => {
  //   navigateTo("/checkout");
  // };

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* ================= CART TABLE ================= */}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartItems?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Your cart is empty
                </TableCell>
              </TableRow>
            ) : (
              cartItems?.map((item) => (
                <TableRow key={item?._id}>
                  {/* PRODUCT */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <IconButton
                        color="error"
                        onClick={() => removeItemHandler(item?.productId?._id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <img
                        src={item?.productId?.images?.[0].url}
                        alt={item?.productId?.title}
                        width="50"
                      />

                      {/* <Typography>{item.productId?.title}</Typography> */}
                    </Box>
                  </TableCell>

                  {/* PRICE */}
                  <TableCell>Rs.{item?.price}</TableCell>

                  {/* QUANTITY */}
                  <TableCell>
                    <Select
                      size="small"
                      value={item?.quantity}
                      onChange={(e) =>
                        quantityChangeHandler(
                          item?.productId?._id,
                          Number(e.target.value),
                          // item.quantity,
                        )
                      }
                    >
                      {[...Array(item?.productId?.stock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  {/* SUBTOTAL */}
                  <TableCell align="right">
                    Rs.{item?.price * item?.quantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/*  BUTTONS  */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <Button variant="outlined" onClick={() => navigateTo("/")}>
          Return To Shop
        </Button>

        {cartItems?.length > 0 && (
          <Button variant="outlined" color="error" onClick={clearCartHandler}>
            Clear Cart
          </Button>
        )}
      </Box>

      {/*  TOTAL CARD  */}
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Card sx={{ width: 350 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cart Total
            </Typography>

            <Box display="flex" justifyContent="space-between">
              <Typography>Subtotal:</Typography>
              <Typography>Rs.{totalPrice}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold">Total:</Typography>
              <Typography fontWeight="bold">Rs.{totalPrice}</Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || checkoutLoading}
            >
              {checkoutLoading ? "Processing..." : "Checkout"}
              {/* Proceed to Checkout */}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CartPage;
