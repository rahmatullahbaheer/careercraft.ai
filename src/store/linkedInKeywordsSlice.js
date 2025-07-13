import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  keywordsText: "",
  generatedOnDate: "",
  userEmail: "",
};

const linkedInKeywordsSlice = createSlice({
  name: "linkedInKeywords",
  initialState,
  reducers: {
    resetLinkedKeywords() {
      return initialState;
    },
    setLinkedKeywords(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetLinkedKeywords, setLinkedKeywords } =
  linkedInKeywordsSlice.actions;

export default linkedInKeywordsSlice.reducer;
