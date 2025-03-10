import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memes: [],
};

const memeSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setMemes: (state, action) => {
      state.memes = action.payload;
    },
  },
});

export const { setMemes } = memeSlice.actions;
export default memeSlice.reducer;
