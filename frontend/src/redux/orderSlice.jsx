import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  orderList: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      // console.log(action)
      state.orderList = [...action.payload];
    },
  },
});

export const {
  setOrderData,
} = orderSlice.actions;

export default orderSlice.reducer;
