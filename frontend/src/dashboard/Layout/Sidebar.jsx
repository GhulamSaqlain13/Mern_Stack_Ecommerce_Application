import { AccountBox, Article, Group, Home, Logout } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../app/slices/userSlice";

const Sidebar = () => {
  const linkStyle = {
    borderRadius: "8px",
    "&.active": {
      backgroundColor: "#ffe5e5",
      color: "#DB4444",
    },
  };

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logOutUser());
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <Box
        position="fixed"
        width="15%"
        sx={{
          display: { xs: "block", sm: "block" },
          borderRight: "1px solid grey",
        }}
      >
        <Box
          sx={{
            width: { xs: "60px", sm: "200px" },
            height: "100vh",
          }}
        >
          <List sx={{ width: "100%" }}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to="/dashboard"
                end
                sx={linkStyle}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to="/dashboard/products"
                sx={linkStyle}
              >
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText
                  primary="Products"
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to="/dashboard/orders"
                sx={linkStyle}
              >
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText
                  primary="Orders"
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to="/dashboard/profile"
                sx={linkStyle}
              >
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItemButton>
            </ListItem>

            {/* LOGOUT */}
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton onClick={handleLogoutClick} sx={linkStyle}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* LOGOUT CONFIRM DIALOG */}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="error"
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
