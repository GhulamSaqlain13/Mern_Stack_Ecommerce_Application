import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import DashboardLayout from "./dashboard/Layout/DashboardLayout";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./app/slices/userSlice";
import ProtectedRoute from "./ProtectedRoute";
const AppContent = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/register";
  const hideFooter = location.pathname.startsWith("/dashboard");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Website Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/*  Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={
            // <ProtectedRoute>
            <DashboardLayout />
            // </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
      <ToastContainer position="top-right" theme="light" />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
