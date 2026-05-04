import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log(res);
      return res.data; // assume backend returns { user: {...}, token: "..." }
    } catch (error) {
      //backend sy res ma error aa raha hai
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  },
);

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  },
);

// Logout User
export const logOutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res?.data?.message || error.message);
    }
  },
);

// Get User
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/profile", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null); // user not logged in
      }
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

//  Initial State
const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  message: null,
};

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // assuming backend sends { user: {...} }
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      // state.error = action.payload.user;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      // state.error = action.payload.user;

      state.error = action.payload;
    });

    //  Logout
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // preserve previous user if logout failed
    });

    // get User
      builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // assuming backend sends { user: {...} }
      state.isAuthenticated = true;
      state.error = null;
    });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
