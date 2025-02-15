import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase/auth";

const initialState = {
  products: [],
  isLoading: true,
  error: "",
  selectedProduct: null,
};

export const fetchUserProducts = createAsyncThunk(
  "fetch/products",
  async ({ userid }) => {
    const { data, error } = await supabase
      .from("Products")
      .select()
      .eq("user_id", userid);

    return data;
  }
);

export const updateUserProduct = createAsyncThunk(
  "update/products",
  async (selectedProduct) => {
    console.log(selectedProduct);

    const { data, error } = await supabase
      .from("Products")
      .update(selectedProduct)
      .eq("id", selectedProduct.id);

    const { data: selectedData } = await supabase
      .from("Products")
      .select()
      .eq("id", selectedProduct.id);

    return selectedData;
  }
);

const UserProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {
    updateSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    updateSelectedProductField(state, action) {
      state.selectedProduct[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(fetchUserProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUserProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedProduct = action.payload[0];
      state.products = state.products.map((product) => {
        return product.id === state.selectedProduct.id
          ? state.selectedProduct
          : product;
      });
    });
    builder.addCase(updateUserProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { updateSelectedProduct, updateSelectedProductField } =
  UserProductsSlice.actions;
export default UserProductsSlice.reducer;
