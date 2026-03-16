import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearError } from "../app/slices/userSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
    };
    console.log(formData);

    // for image uploads
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("password", password);

    dispatch(registerUser(formData));
  };
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated, "error:", error);
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigateTo("/");
      toast.success("User registered successfully!");
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
            Create an account
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
            Enter your details below
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              label="Name"
              variant="standard"
              margin="normal"
            />

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
              disabled={loading}
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
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ py: 1.2 }}
            >
              Sign up with Google
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have account?{" "}
              <span style={{ cursor: "pointer", fontWeight: "bold" }}>
                <Link to={"/login"}> Log in </Link>
              </span>
            </Typography>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
