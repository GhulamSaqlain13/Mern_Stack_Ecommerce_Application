import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../app/slices/orderSlice";

const Order = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
    console.log(orders);
  }, [dispatch]);
  return (
    <Box
      sx={{
        marginBottom: "100px",
        paddingLeft: "14%",
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight={600} p={1}>
        Orders Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
              }}
            >
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Customer
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Phone
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                City
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Payment
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>

                <TableCell>{order.shippingAddress.fullName}</TableCell>
                <TableCell>{order.shippingAddress.phone}</TableCell>

                <TableCell>{order.shippingAddress.city}</TableCell>

                <TableCell>Rs {order.totalPrice}</TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "delivered"
                        ? "success"
                        : order.status === "shipped"
                          ? "info"
                          : "warning"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.paymentStatus}
                    color={order.paymentStatus === "paid" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box
        sx={{
          border: "2px solid red",
          marginLeft: "12%",
          width: "90%",
        }}
      >
        Orders
      </Box> */}
    </Box>
  );
};

export default Order;
