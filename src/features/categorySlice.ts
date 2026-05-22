import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
  id: number;
  categoryName: string;
  categoryImage: string | null;
}

interface SwaggerApiResponse {
  data: Category[];
  statusCode: number;
  message: string;
}

interface CategoryState {
  categories: Category[];
  selectedCategoryId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategoryId: null,
  loading: false,
  error: null,
};

// Async thunk hitting your exact live Render endpoint from Swagger
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get<SwaggerApiResponse>(
      "https://fastcard-1-o23z.onrender.com/api/Category/get-categories",
      {
        headers: {
          accept: "*/*",
        },
      }
    );
    return response.data.data; // Extracts the array from Swagger's "data" property
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;