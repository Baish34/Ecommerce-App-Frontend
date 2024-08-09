// Example URL: https://api.example.com/wishlist

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (userId) => {
  const response = await axios.get(`/api/wishlist/${userId}`);
  return response.data;
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async ({ userId, product }) => {
  const response = await axios.post(`/api/wishlist/${userId}`, product);
  return response.data;
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async ({ userId, productId }) => {
  await axios.delete(`/api/wishlist/${userId}/${productId}`);
  return productId;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
