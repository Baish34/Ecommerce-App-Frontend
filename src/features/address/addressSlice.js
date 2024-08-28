import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAddresses = createAsyncThunk("addresses/fetchAddresses", async () => {
  const response = await axios.get(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/address/users/66b5faf7915e6097eb68283c/addresses`);
  return response.data;
});

export const addAddress = createAsyncThunk("addresses/addAddress", async (addressData) => {
  const response = await axios.post(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/address/users/66b5faf7915e6097eb68283c/addresses`, addressData);
  return response.data;
});

export const updateAddress = createAsyncThunk("addresses/updateAddress", async ({ addressId, updatedAddress }) => {
  const response = await axios.put(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/address/addresses/${addressId}`, updatedAddress);
  return response.data;
});

export const deleteAddress = createAsyncThunk("addresses/deleteAddress", async (addressId) => {
  const response = await axios.delete(`https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/address/addresses/${addressId}`);
  return response.data;
});

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    selectedAddressId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex((address) => address._id === action.payload._id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter((address) => address._id !== action.meta.arg);
      });
  },
});

export const { selectAddress } = addressSlice.actions;

export default addressSlice.reducer;
