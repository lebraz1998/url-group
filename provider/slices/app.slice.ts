import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: null,
  reducers: {},
});
// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = appSlice.actions

export default appSlice.reducer;
