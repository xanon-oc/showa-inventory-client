import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    getSales: () => {},
  },
});

export const { getSales } = salesSlice.actions;
export default salesSlice.reducer;
