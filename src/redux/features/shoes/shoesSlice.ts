import { createSlice } from "@reduxjs/toolkit";

type TShoes = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  style: string;
  size: string;
  color: string;
  material: string;
};

type TInitialState = {
  shoes: TShoes[];
};

const initialState: TInitialState = {
  shoes: [
    {
      name: "",
      price: 0,
      quantity: 0,
      releaseDate: "",
      brand: "",
      style: "",
      size: "",
      color: "",
      material: "",
    },
  ],
};

const shoesSlice = createSlice({
  name: "shoe",
  initialState,
  reducers: {
    getAllShoesWithQueryFilter: (state, action) => {
      state.shoes = action.payload;
    },
  },
});

export const { getAllShoesWithQueryFilter } = shoesSlice.actions;
export default shoesSlice.reducer;
