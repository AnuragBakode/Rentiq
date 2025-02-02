import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "./SessionSlice.jsx";
import ProductCategory from "./ProductCategorySlice.jsx";
import ProductReducer from "./ProductsSlice.jsx";

const store = configureStore({
  reducer: {
    session: SessionReducer,
    productCategory: ProductCategory,
    products: ProductReducer,
  },
});

export default store;
