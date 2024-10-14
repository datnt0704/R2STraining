import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";

const BASE_URL = "http://localhost:5000";

interface Category {
  id: string; // ID luôn là string
  name: string;
}

interface CategoryState {
  entities: Record<string, Category>; // Sử dụng string làm key
  ids: string[]; // ID luôn là mảng string
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetchJson(BASE_URL + "/categories");
    // Đảm bảo tất cả các ID đều là string
    return response.map((category: any) => ({
      ...category,
      id: String(category.id),
    }));
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory: Category) => {
    const response = await updateJson(BASE_URL + "/categories", newCategory, "POST");
    // Đảm bảo ID của category mới là string
    return { ...response, id: String(response.id) };
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    const response = await updateJson(`${BASE_URL}/categories/${category.id}`, category, "PUT");
    // Đảm bảo ID của category cập nhật là string
    return { ...response, id: String(response.id) };
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    await deleteJson(BASE_URL + "/categories", categoryId);
    return categoryId;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        const categories: Category[] = action.payload;
        state.ids = categories.map((category) => category.id);
        categories.forEach((category) => {
          state.entities[category.id] = category;
        });
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const addedCategory: Category = action.payload;
        state.entities[addedCategory.id] = addedCategory;
        state.ids.push(addedCategory.id);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory: Category = action.payload;
        state.entities[updatedCategory.id] = updatedCategory;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const categoryId = action.payload;
        delete state.entities[categoryId];
        state.ids = state.ids.filter((id) => id !== categoryId);
      });
  },
});

export const categoryReducer = categorySlice.reducer;
