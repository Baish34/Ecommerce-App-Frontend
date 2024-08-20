import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userId = "66b5faf7915e6097eb68283c";

// Fetch cart for a user
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/cart/${userId}`);
  console.log(response);
  return response.data.items;
});

// Add a product to the cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }) => {
  const res = await axios.post(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/cart/${userId}/items`, { productId, quantity });
  return res.data.items; // return the updated cart items array
});

// Remove a product from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId) => {
  await axios.delete(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/cart/${userId}/items/${productId}`);
  return productId;
});

// Update the quantity of a product in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }) => {
    const response = await axios.put(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/cart/${userId}/items/${productId}`, { quantity });
    return response.data.items; // return the updated cart items array
  }
);

// Move product from cart to wishlist
export const moveToWishlist = createAsyncThunk(
  "cart/moveToWishlist",
  async ({ productId }) => {
    await axios.post(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/wishlist/${userId}/items`, { productId });
    await axios.delete(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/cart/${userId}/items/${productId}`);
    return productId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Update with the array of items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload; // Update the state with the updated cart items
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.items = action.payload; // Update the state with the updated cart items
      })
      .addCase(moveToWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      });
  },
});

export default cartSlice.reducer;
