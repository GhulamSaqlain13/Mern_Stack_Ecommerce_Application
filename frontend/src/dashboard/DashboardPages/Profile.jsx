import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Divider,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import { Email, Person, Badge, Security } from "@mui/icons-material";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(getUser());
  //   }
  // }, [dispatch, user]); // ✅ dependency array

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5">
          Please log in to view your profile.
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        marginLeft: "12%",
        width: "90%",
        p: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Profile Header Card */}
          <Grid size={{ md: 4, xs: 12 }}>
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: "center", borderRadius: 2 }}
            >
              <Avatar
                src={user.avatar?.url || ""}
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  mb: 2,
                  bgcolor: "primary.main",
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                {user?.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {user?.isAdmin === true ? "Admin" : "Member"}
              </Typography>
              <Chip
                label={isAuthenticated ? "Active Account" : "Inactive"}
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" fullWidth disableElevation>
                  Edit Profile
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Detailed Information Card */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Person color="primary" /> General Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="textSecondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {user?.name}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="textSecondary">
                    Email Address
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body1">{user?.email}</Typography>
                  </Box>
                </Grid>
                {/* <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="textSecondary">
                    User ID
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Badge fontSize="small" color="action" />
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {user?._id}
                    </Typography>
                  </Box>
                </Grid> */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="textSecondary">
                    Joined On
                  </Typography>
                  <Typography variant="body1">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 4, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Security color="primary" /> Security
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Button variant="outlined" color="primary" size="small">
                Change Password
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
