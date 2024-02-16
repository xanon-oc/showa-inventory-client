import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferences: {
    polishType: "",
    shineLevel: "",
    instructions: "",
  },
};

const userServiceSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    getSales: () => {},
  },
});

export const { getSales } = userServiceSlice.actions;
export default userServiceSlice.reducer;
