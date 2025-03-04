import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../supabase/auth";
import { useSelector } from "react-redux";

const initialState = {
  pageSize: 10,
  products: [],
  isLoading: true,
  error: "",
  count: 0,
};

export const fetchProductsCount = createAsyncThunk(
  "products/count",
  async ({ filters }) => {
    let query = supabase.from("Products").select();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value);
    });

    const { data } = await query;

    return data.length;
  }
);

export const fetchProducts = createAsyncThunk(
  "products",
  async ({ filters, from, to }) => {
    let query = supabase.from("Products").select().eq("status", "Available");

    query = query.range(from, to);

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data } = await query;

    return data;
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductsCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProductsCount.fulfilled, (state, action) => {
      state.count = action.payload;
    });
    builder.addCase(fetchProductsCount.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default ProductSlice.reducer;
