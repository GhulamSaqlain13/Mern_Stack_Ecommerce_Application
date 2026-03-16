import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Dashboard Stats
export const fetchAnalyticStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/dashboard/stats",
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const analyticSlice = createSlice({
  name: "analytics",
  initialState: {
    stats: {},
    monthlySales: [],
    topProducts: [],
    paymentStats: [],
    orderStatusStats: [],
    recentOrders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(fetchAnalyticStats.pending, (state) => {
        state.loading = true;
      })

      // Success
      .addCase(fetchAnalyticStats.fulfilled, (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats;
        state.monthlySales = action.payload.monthlySales;
        state.topProducts = action.payload.topProducts;
        state.paymentStats = action.payload.paymentStats;
        state.orderStatusStats = action.payload.orderStatusStats;
        state.recentOrders = action.payload.recentOrders;
      })

      .addCase(fetchAnalyticStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default analyticSlice.reducer;
