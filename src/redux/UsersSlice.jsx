import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../supabase/auth";

const initialState = {
  pageSize: 10,
  users: [],
  isLoading: true,
  error: "",
  count: 0,
};

export const fetchUsersCount = createAsyncThunk(
  "users/count",
  async ({ name }) => {
    const { data, error } = await supabase.functions.invoke("usersCount", {
      body: {
        name,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token"))
            .access_token
        }`,
      },
    });

    return JSON.parse(data);
  }
);

export const fetchUsers = createAsyncThunk(
  "Users",
  async ({ name, from, to }) => {
    const { data, error } = await supabase.functions.invoke("listAllUsers", {
      body: {
        name,
        from,
        to,
      },
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token"))
            .access_token
        }`,
      },
    });

    if (data) return JSON.parse(data);
    console.log(data);

    console.log(error);
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchUsersCount.fulfilled, (state, action) => {
      state.count = action.payload.count;
    });
    builder.addCase(fetchUsersCount.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default UsersSlice.reducer;
