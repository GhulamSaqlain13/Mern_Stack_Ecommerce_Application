import React from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../app/slices/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };
    console.log(formData);

    dispatch(loginUser(formData));
  };
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated, "error:", error);
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigateTo("/");
      toast.success("User logged In successfully");
    }
  }, [error, isAuthenticated, navigateTo, dispatch]);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* LEFT SIDE IMAGE */}
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          // marginTop: "5px",
          // p: 4,
        }}
      >
        <Box
          component="img"
          src="/Auth page.png"
          alt="Shopping"
          sx={{
            width: "100%",
            height: "100%",
            // maxWidth: 500,
          }}
        />
      </Grid>

      {/* RIGHT SIDE FORM */}
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
        // elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Log in
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
            Enter your details below
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email "
              variant="standard"
              margin="normal"
            />

            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
              type="password"
              variant="standard"
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                backgroundColor: "secondary.main",
                "&:hover": {
                  backgroundColor: "secondary.light",
                },
              }}
            >
              Login
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don't have account?
              <span style={{ cursor: "pointer", fontWeight: "bold" }}>
                <Link to={"/register"}>Register</Link>
              </span>
            </Typography>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
