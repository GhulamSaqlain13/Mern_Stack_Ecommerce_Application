// import {
//   Box,
//   Container,
//   Divider,
//   Grid,
//   IconButton,
//   Paper,
//   Typography,
// } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
// import ComputerIcon from "@mui/icons-material/Computer";
// import WatchIcon from "@mui/icons-material/Watch";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import HeadphonesIcon from "@mui/icons-material/Headphones";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
// import { Laptop } from "@mui/icons-material";

// const categories = [
//   { name: "Phones", icon: <PhoneIphoneIcon fontSize="large" /> },
//   { name: "Computers", icon: <ComputerIcon fontSize="large" /> },
//   { name: "SmartWatch", icon: <WatchIcon fontSize="large" /> },
//   { name: "Camera", icon: <CameraAltIcon fontSize="large" /> },
//   { name: "HeadPhones", icon: <HeadphonesIcon fontSize="large" /> },
//   { name: "Gaming", icon: <SportsEsportsIcon fontSize="large" /> },
//   { name: "Laptops", icon: <Laptop fontSize="large" /> },
// ];

// const CategoryBrowse = () => {
//   return (
//     <Box pt={4}>
//       <Container maxWidth="xl">
//         <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
//           {/*Header Section*/}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Box
//               sx={{
//                 width: 15,
//                 height: 30,
//                 bgcolor: "#DB4444",
//                 borderRadius: 1,
//               }}
//             ></Box>
//             <Typography sx={{ color: "#DB4444", fontWeight: 600 }}>
//               Categories
//             </Typography>
//           </Box>
//           {/* Title + Arrows */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mt: 2,
//             }}
//           >
//             <Typography variant="h5" fontWeight={700}>
//               Browse By Category
//             </Typography>
//           </Box>

//           <Box sx={{ px: 4, py: 5 }}>
//             <Grid container spacing={3}>
//               {categories.map((item, index) => (
//                 <Grid item key={index}>
//                   <Paper
//                     // elevation={0}
//                     sx={{
//                       width: 140,
//                       height: 110,
//                       bgcolor: "#fff",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       borderRadius: 2,
//                       cursor: "pointer",
//                       transition: "0.3s",
//                       "&:hover": { bgcolor: "#c0392b", color: "#fff" },
//                     }}
//                   >
//                     {item.icon}
//                     <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
//                       {item.name}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>

//           {/* <Box
//             sx={{
//               display: "flex",
//             }}
//           >
//             <Grid gap={"30px"} display={"flex"}>
//               {categories.map((category, index) => (
//                 <Grid>
//                   <Box
//                     component="img"
//                     src={category.image}
//                     sx={{
//                       // width: "100px",
//                       // height: "100px",
//                       border: "2px solid grey",
//                       padding: "20px",
//                     }}
//                   ></Box>
//                   <Typography>{category.title}</Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box> */}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default CategoryBrowse;

import { Box, Container, IconButton, Paper, Typography } from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ComputerIcon from "@mui/icons-material/Computer";
import WatchIcon from "@mui/icons-material/Watch";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LaptopIcon from "@mui/icons-material/Laptop";
import TabletIcon from "@mui/icons-material/Tablet";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { name: "Phones", icon: <PhoneIphoneIcon fontSize="large" /> },
  { name: "Computers", icon: <ComputerIcon fontSize="large" /> },
  { name: "SmartWatch", icon: <WatchIcon fontSize="large" /> },
  { name: "Camera", icon: <CameraAltIcon fontSize="large" /> },
  { name: "HeadPhones", icon: <HeadphonesIcon fontSize="large" /> },
  { name: "Gaming", icon: <SportsEsportsIcon fontSize="large" /> },
  { name: "Laptops", icon: <LaptopIcon fontSize="large" /> },
  { name: "Tablets", icon: <TabletIcon fontSize="large" /> },
];

const CategoryBrowse = () => {
  return (
    <Box pt={6}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          {/* Header */}
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
              Categories
            </Typography>
          </Box>

          {/* Title + Arrows */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Browse By Category
            </Typography>

            <Box>
              <IconButton className="category-prev">
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton className="category-next">
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Slider */}
          <Box sx={{ mt: 5 }}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".category-next",
                prevEl: ".category-prev",
              }}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 2 },
                480: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {categories.map((item, index) => (
                <SwiperSlide key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      width: 150,
                      height: 130,
                      borderRadius: 3,
                      border: "1px solid #eee",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      bgcolor: "#fff",

                      "&:hover": {
                        bgcolor: "#DB4444",
                        color: "#fff",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    {item.icon}
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                  </Paper>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryBrowse;
