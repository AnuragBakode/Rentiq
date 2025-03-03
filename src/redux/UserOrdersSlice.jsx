import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase/auth";

const initialState = {
  orders: [],
  ordersPlaced: [],
  ordersRecieved: [],
  isLoading: true,
  error: "",
  selectedOrder: null,
};

export const fetchOrders = createAsyncThunk("fetch/orders", async (userid) => {
  // Fetch orders placed by the user
  const { data: ordersPlaced } = await supabase
    .from("Orders")
    .select("*, Products(*)")
    .eq("user_id", userid);

  // Fetch orders received (orders for user's products)
  const { data: ordersReceived } = await supabase
    .from("Orders")
    .select("*, Products(*)")
    .eq("owner_id", userid);

  return {
    ordersPlaced: ordersPlaced || [],
    ordersReceived: ordersReceived || [],
  };
});

const UserOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      console.log(action.payload);
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ordersPlaced = action.payload.ordersPlaced;
      state.ordersRecieved = action.payload.ordersReceived;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setSelectedOrder } = UserOrdersSlice.actions;
export default UserOrdersSlice.reducer;
