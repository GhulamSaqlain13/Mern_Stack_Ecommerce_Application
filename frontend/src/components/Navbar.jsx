import {
  Avatar,
  Badge,
  Box,
  CssBaseline,
  InputBase,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../app/slices/userSlice"; // adjust path according to your project

// Styled components
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: "6px 12px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "260px",
}));

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Menu handlers
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Logout handlers
  const handleLogoutClick = () => {
    handleMenuClose(); // close menu first
    setOpenLogoutDialog(true);
  };
  const handleCancelLogout = () => setOpenLogoutDialog(false);
  const handleConfirmLogout = () => {
    dispatch(logOutUser());
    setOpenLogoutDialog(false);
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" color="primary.light">
        <CssBaseline />
        <Container maxWidth="xl">
          <StyledToolbar>
            {/* Logo */}
            <Typography variant="h6" fontWeight={600}>
              Exclusive
            </Typography>

            {/* Menu Links + Search (desktop only) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: "60px",
              }}
            >
              <Typography
                component={Link}
                to="/"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                Home
              </Typography>
              <Typography
                component={Link}
                to="/about"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                About
              </Typography>
              <Typography
                component={Link}
                to="/shop"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                Shop
              </Typography>
              <Typography
                component={Link}
                to="/contact"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                Contact
              </Typography>

              <Search>
                <InputBase
                  placeholder="What are you looking for?"
                  sx={{ width: "100%" }}
                />
                <SearchIcon />
              </Search>
            </Box>

            {/* Right icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <FavoriteBorderOutlinedIcon
                sx={{ "&:hover": { color: "secondary.main" } }}
              />
              <Badge badgeContent={cartItems?.length} color="secondary">
                <Link to="/cart">
                  <ShoppingCartOutlinedIcon
                    sx={{
                      color: "black",
                      "&:hover": {
                        color: (theme) => theme.palette.secondary.main,
                      },
                    }}
                  />
                </Link>
              </Badge>

              {/* Avatar */}
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  height: "30px",
                  width: "30px",
                  "&:hover": { bgcolor: "secondary.main" },
                  cursor: "pointer",
                }}
                src="/broken-image.jpg"
                onClick={handleAvatarClick}
              >
                {user?.name.charAt(0) || "U"}
              </Avatar>
            </Box>

            {/* Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem
                component={Link}
                to="/account"
                onClick={handleMenuClose}
              >
                My Account
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              {user?.isAdmin && (
                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleMenuClose}
                >
                  Dashboard
                </MenuItem>
              )}
            </Menu>
          </StyledToolbar>
        </Container>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
