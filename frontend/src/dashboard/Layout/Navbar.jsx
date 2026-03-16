import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  InputBase,
  alpha,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  NotificationsNone,
  SettingsOutlined,
  Search,
} from "@mui/icons-material";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette.common.black, 0.04), // Subtle light gray
  "&:hover": { backgroundColor: alpha(theme.palette.common.black, 0.07) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.black, 0.45), // Muted icon color
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.875 r em",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "25ch" },
  },
}));

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)", // White with slight transparency
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "divider", // Uses the theme's standard light border color
        color: "text.primary", // Sets all default text/icons to dark gray/black
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "primary.main", // Adds a pop of color to the title
              display: { xs: "none", md: "block" },
            }}
          >
            EXCLUSIVE
          </Typography>

          <SearchContainer sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchIconWrapper>
              <Search fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search anything..." />
          </SearchContainer>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton color="inherit">
            <NotificationsNone />
          </IconButton>
          <IconButton color="inherit">
            <SettingsOutlined />
          </IconButton>
          <Box
            sx={{
              ml: 1.5,
              pl: 1.5,
              borderLeft: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: "1rem",
                  bgcolor: "secondary.main",
                }}
                alt="User Profile"
              />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
