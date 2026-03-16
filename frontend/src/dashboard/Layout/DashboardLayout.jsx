import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "../DashboardPages/Home";
import Products from "../DashboardPages/Products";
import Order from "../DashboardPages/Order";
import Navbar from "./Navbar";
import Profile from "../DashboardPages/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../app/slices/userSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Box display="flex">
        <Sidebar />

        <Box flex={4} px={6} py={2}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Order />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
