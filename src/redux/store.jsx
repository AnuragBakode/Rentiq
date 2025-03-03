import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "./SessionSlice.jsx";
import ProductCategory from "./ProductCategorySlice.jsx";
import ProductReducer from "./ProductsSlice.jsx";
import ProductModalReducer from "./ProductModalSlice.jsx";
import CartReducer from "./CartSlice.jsx";
import UserProductReducer from "./UserProductsSlice.jsx";
import UserOrdersReducer from "./UserOrdersSlice.jsx";

const store = configureStore({
  reducer: {
    session: SessionReducer,
    productCategory: ProductCategory,
    products: ProductReducer,
    productModal: ProductModalReducer,
    cart: CartReducer,
    userProducts: UserProductReducer,
    userOrders: UserOrdersReducer,
  },
});

export default store;
