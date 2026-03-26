import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/cart/get-cart",
        { withCredentials: true },
      );
      return data.cart; // backend returns { cartItems: [...], totalPrice: ... }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/cart/add-to-cart",
        { productId, quantity },
        { withCredentials: true },
      );
      return res.data.cart; // return cart object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Update Cart Item
export const updateCart = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/cart/update-cart/${productId}`,
        { quantity },
        { withCredentials: true },
      );
      return res.data.updatedCart; // updatedCart from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Remove From Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/cart/remove-from-cart/${productId}`,
        { withCredentials: true },
      );
      return res.data.cart; // return updated cart
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/api/v1/cart/clear-cart",
        { withCredentials: true },
      );
      return res.data.cart; // empty cart
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// INITIAL STATE //
const initialState = {
  cartItems: [],
  totalPrice: 0,
  loading: false,
  error: null,
  message: null,
};

//  SLICE  //
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  FETCH CART  //
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload?.cartItems || [];
        state.totalPrice = action.payload?.totalPrice || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD TO CART  //
     .addCase(addToCart.fulfilled, (state, action) => {
        console.log("ADD TO CART PAYLOAD:", action.payload);
        state.cartItems = action.payload?.cartItems;
        state.totalPrice = action.payload?.totalPrice;
      })
 
      //  UPDATE CART  //
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartItems = action.payload?.cartItems || [];
        state.totalPrice = action.payload?.totalPrice || 0;
      })

      // REMOVE CART ITEM //
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload?.cartItems || [];
        state.totalPrice = action.payload?.totalPrice || 0;
      })

      // CLEAR CART  //
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalPrice = 0;
      });
  },
});

export const { clearError, clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
