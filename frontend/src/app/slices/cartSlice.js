// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // fetch cart
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:5000/api/v1/cart/get-cart",
//         {
//           withCredentials: true,
//         },
//       );
//       return data.cart;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   },
// );
// // Add to cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, quantity }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/v1/cart/add-to-cart",
//         { productId, quantity },
//         {
//           withCredentials: true,
//         },
//       );
//       console.log(res);
//       return res.data.cart; // assume backend returns { user: {...}, token: "..." }
//       //   return res.data.cart;
//     } catch (error) {
//       //backend sy res ma error aa raha hai
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );
// // Update cart
// export const updateCart = createAsyncThunk(
//   "cart/updateCartItem",
//   async ({ productId, quantity }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/v1/cart/update-cart/${productId}`,
//         { quantity },
//         {
//           withCredentials: true,
//           //   headers: { "Content-Type": "application/json" },
//         },
//       );
//       return res.data.updatedCart;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );
// // Remove From Cart
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/v1/cart/remove-from-cart/${productId}`,
//         {
//           withCredentials: true,
//         },
//       );
//       return res.data.cart;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );
// // Clear Cart
// export const clearCart = createAsyncThunk(
//   "cart/clearCart",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.delete(
//         "http://localhost:5000/api/v1/cart/clear-cart",
//         {
//           withCredentials: true,
//           //   headers: { "Content-Type": "application/json" },
//         },
//       );
//       return res.data.cart;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );

// //  Initial State
// const initialState = {
//   cartItems: [],
//   totalPrice: 0,
//   loading: false,
//   error: null,
//   message: null,
// };

// // Slice
// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // optional : manual reset for errors
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },
//     // new reducer for instant UI update
//     // updateCartQuantityLocally: (state, action) => {
//     //   const { productId, quantity } = action.payload;
//     //   const item = state.cartItems.find((i) => i.productId._id === productId);
//     //   if (item) {
//     //     item.quantity = quantity;
//     //   }

//     //   // recalculate totalPrice
//     //   state.totalPrice = state.cartItems.reduce(
//     //     (acc, item) => acc + item.productId.price * item.quantity,
//     //     0,
//     //   );
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cart
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems = action.payload?.cartItems;
//         state.totalPrice = action.payload?.totalPrice;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Add To Cart
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload?.cartItems; // data is populated
//         state.totalPrice = action.payload?.totalPrice;
//       })

//       .addCase(updateCart.fulfilled, (state, action) => {
//         // state.cart = action.payload;
//         state.cartItems = action.payload?.cartItems;
//         state.totalPrice = action.payload?.totalPrice;
//       })
//       // Remove Cart Item
//       // .addCase(removeFromCart.fulfilled, (state, action) => {
//       //   state.cartItems = action.payload?.cartItems;
//       //   state.totalPrice = action.payload?.totalPrice;
//       // })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         console.log("REMOVE RESPONSE", action.payload);
//         state.cartItems = action.payload?.cartItems;
//         state.totalPrice = action.payload?.totalPrice;
//       })
//       // Clear Cart
//       .addCase(clearCart.fulfilled, (state, action) => {
//         state.cartItems = [];
//         state.totalPrice = 0;
//       });
//   },
// });

// // export const { clearError, updateCartQuantityLocally } = cartSlice.actions;
// export const { clearError, clearMessage } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== THUNKS ===================== //

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

// ===================== INITIAL STATE ===================== //
const initialState = {
  cartItems: [],
  totalPrice: 0,
  loading: false,
  error: null,
  message: null,
};

// ===================== SLICE ===================== //
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
      // ---------------- FETCH CART ---------------- //
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

      // ---------------- ADD TO CART ---------------- //
      // .addCase(addToCart.fulfilled, (state, action) => {
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log("ADD TO CART PAYLOAD:", action.payload);
        state.cartItems = action.payload?.cartItems;
        state.totalPrice = action.payload?.totalPrice;
      })
      // state.cartItems = action.payload?.cartItems || [];
      // state.totalPrice = action.payload?.totalPrice || 0;
      // })

      // ---------------- UPDATE CART ---------------- //
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartItems = action.payload?.cartItems || [];
        state.totalPrice = action.payload?.totalPrice || 0;
      })

      // ---------------- REMOVE CART ITEM ---------------- //
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload?.cartItems || [];
        state.totalPrice = action.payload?.totalPrice || 0;
      })

      // ---------------- CLEAR CART ---------------- //
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalPrice = 0;
      });
  },
});

// ===================== EXPORTS ===================== //
export const { clearError, clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
