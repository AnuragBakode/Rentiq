import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase/auth";

const initialState = {
  session: null,
  isLoading: false,
  error: null,
};

export const fetchSession = createAsyncThunk(
  "session/fetchSession ",
  async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  }
);

const SessionSlice = createSlice({
  name: "session",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSession.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.isLoading = false;
      state.session = action.payload;
    });

    builder.addCase(fetchSession.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default SessionSlice.reducer;
