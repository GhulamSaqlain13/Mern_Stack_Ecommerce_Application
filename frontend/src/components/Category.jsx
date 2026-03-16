import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";

const Category = () => {
  return (
    <Box paddingTop={8}>
      <Container
        maxWidth={"lg"}
        sx={{
          bgcolor: "black",
          borderRadius: "10px",
        }}
      >
        <Grid container alignItems="center" justifyContent={"center"}>
          <Grid size={{ xs: 12, md: 6 }} padding={3}>
            <Typography variant="h6" color="#00FF66">
              Categories
            </Typography>

            <Typography
              variant="h2"
              // fontWeight="bold"
              mt={1}
              color="#FFF"
              lineHeight={"55px"}
              fontSize={"66px"}
            >
              Enhance Your <br /> Music Experience
            </Typography>
            <Box component={"div"} display={"flex"} gap={"12px"}>
              <Box
                sx={{
                  component: "p",
                  width: "50px",
                  height: "50px",
                  bgcolor: "#fff",
                  alignItems: "center",
                  borderRadius: "50%",
                  marginTop: "10px",
                }}
              >
                <Typography
                  fontSize={"12px"}
                  padding={"12px"}
                  lineHeight={"12px"}
                >
                  23 Hours
                </Typography>
              </Box>
              <Box
                sx={{
                  component: "p",
                  width: "50px",
                  height: "50px",
                  bgcolor: "#fff",
                  alignItems: "center",
                  borderRadius: "50%",
                  marginTop: "10px",
                }}
              >
                <Typography
                  fontSize={"12px"}
                  padding={"12px"}
                  lineHeight={"12px"}
                >
                  05 Days
                </Typography>
              </Box>
              <Box
                sx={{
                  component: "p",
                  width: "50px",
                  height: "50px",
                  bgcolor: "#fff",
                  alignItems: "center",
                  borderRadius: "50%",
                  marginTop: "10px",
                }}
              >
                <Typography
                  fontSize={"12px"}
                  padding={"12px"}
                  lineHeight={"12px"}
                >
                  59 Mins
                </Typography>
              </Box>
              <Box
                sx={{
                  component: "p",
                  width: "50px",
                  height: "50px",
                  bgcolor: "#fff",
                  alignItems: "center",
                  borderRadius: "50%",
                  marginTop: "10px",
                }}
              >
                <Typography
                  fontSize={"12px"}
                  padding={"12px"}
                  lineHeight={"12px"}
                >
                  52 Secs
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                bgcolor: "#00FF66",
                text: "#fff",
                "&:hover": {
                  bgcolor: "#00FF71",
                },
              }}
            >
              Buy Now
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} padding={5}>
            <Box
              component="img"
              src="/music.png"
              alt="music"
              sx={{
                width: "100%",
                borderRadius: 3,
                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Category;
