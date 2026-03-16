import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const Card = ({ image, title, desc }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          color: "#fff",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {desc && (
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {desc}
          </Typography>
        )}

        <Typography
          sx={{
            mt: 1,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Shop Now
        </Typography>
      </Box>
    </Box>
  );
};

const NewArrival = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 15,
            height: 30,
            bgcolor: "#DB4444",
            borderRadius: 1,
          }}
        />
        <Typography sx={{ color: "#DB4444", fontWeight: 600 }}>
          Featured
        </Typography>
      </Box>

      {/* Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2}>
          New Arrivals
        </Typography>
      </Box>
      {/* Layout */}
      <Grid container spacing={3}>
        {/* LEFT BIG CARD */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box height={{ xs: 400, md: 600 }}>
            <Card
              image="/playstation.png"
              title="PlayStation 5"
              desc="Black and White version of the PS5 coming out on sale."
            />
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3} height="100%">
            {/* TOP CARD */}
            <Grid size={{ xs: 12 }}>
              <Box height={280}>
                <Card
                  image="/woman-wearing.png"
                  title="Women's Collections"
                  desc="Featured women collections that give you another vibe."
                />
              </Box>
            </Grid>

            {/* BOTTOM CARDS */}
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6 }}>
                  <Box height={280}>
                    <Card
                      image="/Speaker.png"
                      title="Speakers"
                      desc="Amazon wireless speakers"
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Box height={280}>
                    <Card
                      image="/perfumes.png"
                      title="Perfume"
                      desc="GUCCI INTENSE OUD EDP"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewArrival;
