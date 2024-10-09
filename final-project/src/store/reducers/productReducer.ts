import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";

const BASE_URL = "http://localhost:5000";

interface Product {
  id: string;
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}

interface ProductState {
  entities: Record<string, Product>;
  ids: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

export const fetchProduct = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchJson(BASE_URL + "/products");
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: Product) => {
    const newId = (newProduct.id || Date.now()).toString();
    const response = await updateJson(
      BASE_URL + "/products",
      { ...newProduct, id: newId },
      "POST"
    );
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    try {
      const response = await updateJson(
        `${BASE_URL}/products/${product.id}`,
        product,
        "PUT"
      );
      console.log("Update response:", response);
      return response;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number) => {
    await deleteJson(BASE_URL + "/products", productId.toString());
    return productId;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const products: Product[] = action.payload;
        state.ids = products.map((product) => product.id.toString());
        products.forEach((product) => {
          state.entities[product.id.toString()] = product;
        });
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch products.";
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const addedProduct: Product = action.payload;
        state.entities[addedProduct.id.toString()] = addedProduct;
        state.ids.push(addedProduct.id.toString());
      })
      .addCase(addProduct.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to add product.";
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedProduct: Product = action.payload;
        state.entities[updatedProduct.id.toString()] = updatedProduct;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to update product.";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const productId = action.payload.toString();
        delete state.entities[productId];
        state.ids = state.ids.filter((id) => id !== productId);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to delete product.";
      });
  }
});

export const productReducer = productSlice.reducer;
