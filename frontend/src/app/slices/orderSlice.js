import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// CREATE CHECKOUT SESSION
export const createCheckoutSession = createAsyncThunk(
  "order/createCheckoutSession",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/payment/create-checkout-session",
        {},
        {
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
// Fetch Orders (Admin)
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/payment/admin/orders",
        {
          withCredentials: true,
        },
      );
      return data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  orders: [],
  loading: false,
  checkoutUrl: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutUrl = action.payload.url;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default orderSlice.reducer;
