import { CheckCircle, GridView, TrendingUp } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { BarChart, PieChart, LineChart } from "@mui/x-charts"; // MUI X Chart
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticStats } from "../../app/slices/analyticsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { stats, monthlySales, topProducts, paymentStats, orderStatusStats } =
    useSelector((state) => state.analytic);
  // Pie chart data

  const paymentChartData = (paymentStats || []).map((p) => ({
    label: p._id,
    value: p.count,
  }));

  const orderStatusChartData = (orderStatusStats || []).map((o) => ({
    label: o._id,
    value: o.count,
  }));
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month, index) => {
    const sale = monthlySales.find((m) => m.month === index + 1);
    return { month, sales: sale ? sale.totalSales : 0 };
  });

  useEffect(() => {
    dispatch(fetchAnalyticStats());
  }, [dispatch]);

  return (
    <Box sx={{ marginLeft: "12%", width: "90%", p: 2 }}>
      <Stack gap={2}>
        <Grid container spacing={2}>
          {/* Left Cards */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ bgcolor: "#fff", borderRadius: 3, p: 6 }}>
              <Typography variant="h5" fontWeight={600}>
                Total Sales
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  justifyContent: "space-around",
                  pt: 2,
                }}
              >
                {/* Cards Array */}
                {[
                  {
                    title: "Total Sales",
                    value: `Rs. ${stats.totalRevenue}`,
                    icon: <TrendingUp />,
                    bgColor: "#FFE2E5",
                    iconBg: "#FA5A7D",
                  },
                  {
                    title: "Total Orders",
                    value: stats.totalOrders,
                    icon: <GridView />,
                    bgColor: "#FFF4DE",
                    iconBg: "#FF947A",
                  },
                  {
                    title: "Product Sold",
                    value: stats.totalProducts,
                    icon: <CheckCircle />,
                    bgColor: "#d0f2d9",
                    iconBg: "green",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      bgcolor: item.bgColor,
                      color: "#425166",
                      borderRadius: 3,
                      p: 2,
                      minWidth: 190,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      boxShadow: 3,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    {/* Icon Circle */}
                    <Box
                      sx={{
                        bgcolor: item.iconBg,
                        color: "#fff",
                        borderRadius: "50%",
                        height: 48,
                        width: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>

                    {/* Text */}
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        {item.title}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {item.value}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Right Chart */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 5, borderRadius: "8px", bgcolor: "#fff" }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Payment Status
              </Typography>
              {paymentChartData.length > 0 ? (
                <PieChart
                  series={[{ data: paymentChartData, innerRadius: 30 }]}
                  height={200}
                />
              ) : (
                <Typography>No Data Available</Typography>
              )}
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: "8px",
                bgcolor: "#fff",
                p: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                Monthly Sales
              </Typography>

              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: chartData.map((d) => d.month),
                  },
                ]}
                series={[
                  {
                    data: chartData.map((d) => d.sales),
                    color: "#FA5A7D",
                  },
                ]}
                height={250}
                // series={[{ data: chartData?.map((d) => d.sales) || [] }]}
                // categories={chartData?.map((d) => d.month) || []}
                // height={200}
              />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 5, borderRadius: "8px", bgcolor: "#fff" }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Order Status
              </Typography>
              {orderStatusChartData.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: orderStatusChartData,
                      innerRadius: 30,
                    },
                  ]}
                  height={200}
                />
              ) : (
                <Typography>No Data Available</Typography>
              )}
            </Card>
          </Grid>
        </Grid>
        {/* <Grid container border={"2px solid red"}>
          <Grid border={"2px solid red"}></Grid>
          <Grid border={"2px solid red"}></Grid>
          <Grid border={"2px solid red"}></Grid>
        </Grid> */}
      </Stack>
    </Box>
  );
};

export default Home;
