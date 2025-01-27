import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../supabase/auth";

export const fetchProductCategory = createAsyncThunk(
  "productCategory",
  async () => {
    const { data } = await supabase.from("Product_Category").select();
    return data;
  }
);

const ProductCategorySlice = createSlice({
  name: "productCategory",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProductCategory.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default ProductCategorySlice.reducer;
