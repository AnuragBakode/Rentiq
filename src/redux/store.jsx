import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "./SessionSlice.jsx";
import ProductCategory from "./ProductCategorySlice.jsx";

const store = configureStore({
  reducer: {
    session: SessionReducer,
    productCategory: ProductCategory,
  },
});

export default store;
