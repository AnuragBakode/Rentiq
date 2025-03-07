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

  // Fetch status for each order and add it to the order object
  const placedordersWithStatus = await Promise.all(
    ordersPlaced.map(async (order) => {
      const { data: status } = await supabase
        .from("Order_Status")
        .select("status")
        .eq("order_id", order.order_id)
        .single();

      return {
        ...order,
        status: status || null,
      };
    })
  );

  // Fetch orders received (orders for user's products)
  const { data: ordersReceived } = await supabase
    .from("Orders")
    .select("*, Products(*)")
    .eq("owner_id", userid);

  // Fetch status for each received order and add it to the order object
  const receivedOrdersWithStatus = await Promise.all(
    ordersReceived.map(async (order) => {
      const { data: status } = await supabase
        .from("Order_Status")
        .select("status")
        .eq("order_id", order.order_id)
        .single();

      return {
        ...order,
        status: status || null,
      };
    })
  );

  return {
    ordersPlaced: placedordersWithStatus || [],
    ordersReceived: receivedOrdersWithStatus || [],
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

    updateOrderListAfterStatusChange: (state, action) => {
      console.log(action.payload);

      state.ordersPlaced = state.ordersPlaced.map((order) => {
        if (order.order_id == action.payload.order_id) {
          return action.payload.updatedOrder;
        }

        return order;
      });

      state.ordersRecieved = state.ordersRecieved.map((order) => {
        if (order.order_id == action.payload.order_id) {
          return action.payload.updatedOrder;
        }

        return order;
      });
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

export const { setSelectedOrder, updateOrderListAfterStatusChange } =
  UserOrdersSlice.actions;
export default UserOrdersSlice.reducer;
