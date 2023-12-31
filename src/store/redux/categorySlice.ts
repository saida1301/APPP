// categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { updateCategories } = categorySlice.actions;
export default categorySlice.reducer;