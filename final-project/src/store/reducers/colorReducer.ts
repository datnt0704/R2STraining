import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";

const BASE_URL = "http://localhost:5000";

interface Color {
  id: string; 
  name: string;
}

interface ColorState {
  entities: Record<string, Color>;
  ids: string[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ColorState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

export const fetchColor = createAsyncThunk("colors/fetchColors", async () => {
  const response = await fetchJson(BASE_URL + "/colors");
  return response;
});


export const addColor = createAsyncThunk(
  "colors/addColor",
  async (newColor: { id: string; name: string }) => {
    const response = await updateJson(BASE_URL + "/colors", newColor, "POST");
    return response; 
  }
);


export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (colorId: string) => {
    await deleteJson(`${BASE_URL}/colors`, colorId); 
    return colorId;
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchColor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColor.fulfilled, (state, action) => {
        state.status = "succeeded";
        const colors: Color[] = action.payload;
        state.ids = colors.map((color) => color.id);
        colors.forEach((color) => {
          state.entities[color.id] = color;
        });
      })
      .addCase(fetchColor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to fetch colors";
      })

      .addCase(addColor.fulfilled, (state, action) => {
        const addedColor: Color = action.payload;
        state.entities[addedColor.id] = addedColor;
        state.ids.push(addedColor.id);
      })

      .addCase(deleteColor.fulfilled, (state, action) => {
        const colorId = action.payload;
        delete state.entities[colorId];
        state.ids = state.ids.filter((id) => id !== colorId);
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to delete color";
      });
  },
});

export const colorReducer = colorSlice.reducer;