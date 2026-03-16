import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const ContactPage = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f3f3f3",
      }}
    >
      <Container sx={{ py: 8 }}>
        {/* Breadcrumb */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          Home / Contact
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT CONTACT INFO */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 4, boxShadow: 2, bgcolor: "#fff" }}>
              {/* Call */}
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <CallIcon
                  sx={{
                    bgcolor: "#db4444",
                    color: "#fff",
                    p: 1,
                    borderRadius: "50%",
                  }}
                />
                <Typography fontWeight="bold">Call To Us</Typography>
              </Box>

              <Typography variant="body2" mb={2}>
                We are available 24/7, 7 days a week.
              </Typography>

              <Typography variant="body2" mb={3}>
                Phone: +8801611112222
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Email */}
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <EmailIcon
                  sx={{
                    bgcolor: "#db4444",
                    color: "#fff",
                    p: 1,
                    borderRadius: "50%",
                  }}
                />
                <Typography fontWeight="bold">Write To Us</Typography>
              </Box>

              <Typography variant="body2" mb={2}>
                Fill out our form and we will contact you within 24 hours.
              </Typography>

              <Typography variant="body2" mb={2}>
                Emails: customer@exclusive.com
              </Typography>

              <Typography variant="body2" mb={2}>
                Emails: support@exclusive.com
              </Typography>
            </Card>
          </Grid>

          {/* RIGHT CONTACT FORM */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 4, boxShadow: 2, bgcolor: "#fff" }}>
              <Grid container spacing={2} mb={2}>
                <Grid item size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    placeholder="Your Name *"
                    variant="outlined"
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    placeholder="Your Email *"
                    variant="outlined"
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    placeholder="Your Phone *"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Your Message"
                sx={{ mb: 3 }}
              />

              <Box textAlign="right">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#db4444",
                    px: 4,
                    py: 1.5,
                    "&:hover": { bgcolor: "#c13535" },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
