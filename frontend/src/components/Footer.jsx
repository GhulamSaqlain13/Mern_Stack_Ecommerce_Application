import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Column 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Exclusive
            </Typography>

            <Typography
              sx={{
                display: "inline-block",
                fontSize: "16px",
              }}
            >
              Subscribe
            </Typography>

            <Typography sx={{ mt: 2, fontSize: 14 }}>
              Get 10% off your first order
            </Typography>

            <Box sx={{ mt: 2, display: "flex" }}>
              <TextField
                placeholder="Enter your email"
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: "#111",
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  ml: 1,
                  bgcolor: "#fff",
                  color: "#000",
                  minWidth: "40px",
                  "&:hover": { bgcolor: "#ddd" },
                }}
              >
                <SendIcon />
              </Button>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Support
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 14 }}>
              111 Bijoy sarani, Dhaka,
              <br /> DH 1515, Bangladesh.
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 14 }}>
              exclusive@gmail.com
            </Typography>
            <Typography sx={{ mt: 1, fontSize: 14 }}>
              +88015-88888-9999
            </Typography>
          </Grid>

          {/* Column 3 */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Account
            </Typography>
            {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map(
              (item) => (
                <Typography key={item} sx={{ mt: 2, fontSize: 14 }}>
                  <Link href="#" color="inherit" underline="none">
                    {item}
                  </Link>
                </Typography>
              ),
            )}
          </Grid>

          {/* Column 4 */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Quick Link
            </Typography>
            {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map(
              (item) => (
                <Typography key={item} sx={{ mt: 2, fontSize: 14 }}>
                  <Link href="#" color="inherit" underline="none">
                    {item}
                  </Link>
                </Typography>
              ),
            )}
          </Grid>

          {/* Column 5 */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Download App
            </Typography>

            <Typography sx={{ mt: 2, fontSize: 14 }}>
              Save $3 with App New User Only
            </Typography>

            <Box sx={{ mt: 2 }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/QR_code_example.svg"
                alt="QR"
                width="80"
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <IconButton sx={{ color: "#fff" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom copyright */}
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            pt: 3,
            borderTop: "1px solid #222",
            fontSize: 14,
            color: "#777",
          }}
        >
          © Copyright Rimel 2022. All rights reserved
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
