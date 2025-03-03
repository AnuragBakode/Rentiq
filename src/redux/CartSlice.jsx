import { createSlice } from "@reduxjs/toolkit";

const calculateTotalDays = (from, to) => {
  const time1 = new Date(from).getTime();
  const time2 = new Date(to).getTime();

  const diffInMs = Math.abs(time2 - time1);

  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
};

const initialState = {
  isCartOpen: false,
  cartItems: [],
  message: "",
  cartTotal: 0,
  productCount: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    resetMessage(state) {
      state.message = "";
    },
    addToCart(state, action) {
      if (
        !action.payload.product ||
        !action.payload.startDate ||
        !action.payload.endDate
      ) {
        state.message = "Fields can not be empty";
        return;
      }

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      let cartTotal = +localStorage.getItem("cartTotal") || 0;

      let productCount = +localStorage.getItem("productCount") || 0;

      let start = Date.parse(action.payload.startDate);
      let end = Date.parse(action.payload.endDate);

      if (end <= start) {
        state.message = "End date should be greater than start date";
        return;
      }

      if (start <= new Date().getTime()) {
        state.message = "Start date should be in future";
        return;
      }

      let matchingItems = cartItems.filter(
        (item) => item.product.id === action.payload.product.id
      );

      for (let item of matchingItems) {
        let prevStart = Date.parse(item.startDate);
        let prevEnd = Date.parse(item.endDate);

        if (end < prevStart || start > prevEnd) {
        } else {
          state.message =
            "You already have the same item in the cart with Overlapping dates";
          return;
        }
      }

      cartItems.push({
        product: action.payload.product,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      });

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      let totalDays = calculateTotalDays(
        action.payload.startDate,
        action.payload.endDate
      );

      let total = cartTotal + totalDays * +action.payload.product.price;
      localStorage.setItem("cartTotal", total);

      productCount += 1;
      localStorage.setItem("productCount", productCount);

      state.cartItems = cartItems;
      state.cartTotal = total;
      state.productCount = productCount;
      state.message = "Added to the cart";
    },
    getCartItems(state) {
      state.cartItems =
        JSON.parse(localStorage.getItem("cartItems"), "[]") || [];
      state.cartTotal = localStorage.getItem("cartTotal") || 0;
      state.productCount = localStorage.getItem("productCount") || 0;
    },
    removeFromCart(state, action) {
      let newCartItems = state.cartItems.filter((items) => {
        if (items.product.id != action.payload.product.id) {
          return true;
        } else {
          return (
            items.startDate != action.payload.startDate &&
            items.endDate != action.payload.endDate
          );
        }
      });

      let total = 0;

      newCartItems.forEach((item) => {
        total +=
          calculateTotalDays(item.startDate, item.endDate) *
          +item.product.price;
      });

      let productCount = newCartItems.length;

      state.cartItems = newCartItems;
      state.cartTotal = total;
      state.productCount = productCount;

      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      localStorage.setItem("cartTotal", total);
      localStorage.setItem("productCount", productCount);
    },
    clearCart(state, action) {
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("cartTotal", 0);
      localStorage.setItem("productCount", 0);

      state.cartItems = [];
      state.cartTotal = 0;
      state.productCount = 0;
      state.message = "";
    },
  },
});

export const {
  openCart,
  closeCart,
  addToCart,
  getCartItems,
  resetMessage,
  removeFromCart,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
