// src/store/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  jobDescription: "",
  consultingBidText: "",
  generatedOnDate: "",
  generatedViaOption: "",
  userEmail: "",
};

const consultingBidSlice = createSlice({
  name: "consultingBid",
  initialState,
  reducers: {
    resetConsultingBid() {
      return initialState;
    },
    setConsultingBid(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetConsultingBid, setConsultingBid } =
  consultingBidSlice.actions;

export default consultingBidSlice.reducer;
