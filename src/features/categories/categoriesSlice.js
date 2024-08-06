import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://c7c43001-8c92-4c4e-a0de-050eac64989a-00-31tqe0fdcvd73.picard.replit.dev/api/categories",
    );
    return response.data;
  },
);
