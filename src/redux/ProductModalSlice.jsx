import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  product: {},
};

const ProductModalSlice = createSlice({
  name: "productModal",
  initialState: initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.product = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.product = true;
    },
  },
});

export const { openModal, closeModal } = ProductModalSlice.actions;

export default ProductModalSlice.reducer;
