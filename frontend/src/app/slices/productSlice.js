import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Product
export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return res.data; // assume backend returns { user: {...}, token: "..." }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  },
);

// update Product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/product/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      return res.data; // assume backend returns { user: {...}, token: "..." }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// delete Product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/product/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      return res.data; // assume backend returns { user: {...}, token: "..." }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Get All Products
export const getAllProducts = createAsyncThunk(
  "products/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/product/all");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
//Get this months Products
export const getcurrentMonthProducts = createAsyncThunk(
  "products/currentmonth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/product/thismonth",
      );
      return res.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
//get Product By Id
export const getProductDetails = createAsyncThunk(
  "products/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
// get filteredPreoducts
export const filterProduct = createAsyncThunk(
  "product/filter",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
       const res = await axios.get(
        `http://localhost:5000/api/v1/product/filter?${query}`,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
//get categories
// Thunk for fetching unique categories
export const getCategories = createAsyncThunk(
  "product/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/product/categories",
      );
      return res.data; // Yeh array return karega: ["Electronics", "Books", ...]
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

//  Initial State
const initialState = {
  products: [],
  categories: [],
  productDetail: null,
  product: null,
  loading: false,
  catLoading: false,
  message: null,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

// Slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetProductSlice: (state) => {
      state.error = null;
      state.products = state.products;
      state.loading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    //filter products
    builder
      .addCase(filterProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(filterProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })

      .addCase(filterProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Get Unique Categories
    builder
      .addCase(getCategories.pending, (state) => {
        state.catLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.catLoading = false;
        state.categories = action.payload;
      });
    // create product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.product = null;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products; // assuming backend sends { user: {...} }
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    });
    // delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.product = null;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = action.payload.products; // assuming backend sends { user: {...} }
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    });
    // update product
    // builder.addCase(updateProduct.pending, (state) => {
    //   state.loading = true;
    //   state.product = null;
    //   state.error = null;
    // });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = action.payload.products; // assuming backend sends { user: {...} }
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    });

    // get All Products
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      // state.products = null;
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      // state.products = action.payload.products;// assuming backend sends { user: {...} }
      state.error = null;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.error = action.payload;
    });

    // get Product Details
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
      state.productDetail = null;
      state.error = null;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.productDetail = action.payload; // assuming backend sends { user: {...} }
      state.error = null;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.productDetail = null;
      state.error = action.payload;
    });
    // get Current Months Products
    builder.addCase(getcurrentMonthProducts.pending, (state) => {
      state.loading = true;
      state.products = null;
      state.error = null;
    });
    builder.addCase(getcurrentMonthProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(getcurrentMonthProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.error = action.payload;
    });
  },
});

export const { clearError, clearMessage, resetProductSlice } =
  productSlice.actions;
export default productSlice.reducer;
