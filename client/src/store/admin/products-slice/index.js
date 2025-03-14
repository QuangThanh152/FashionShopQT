import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    productList: [],
}

export const addNewProduct = createAsyncThunk(
    '/products/addnewproduct',
    async (formData) => {
        const result = await axios.post('http://localhost:5000/api/admin/products/add-new-product', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )

        return result?.data;
    }
);

// export const fetchAllProducts = createAsyncThunk(
//     '/products/fetchallproducts',
//     async () => {
//         const result = await axios.get('http://localhost:5000/api/admin/products/fetch-all-products'
//         )

//         return result?.data;
//     }
// );
export const fetchAllProducts = createAsyncThunk(
    "/products/fetchallproducts",
    async ({ page = 1, limit = 0 } = {}, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/admin/products/fetch-all-products?page=${page}&limit=${limit}`
            );
            console.log("API Response in fetchAllProducts:", result.data);
            return result?.data;
        } catch (error) {
            console.error("Error in fetchAllProducts:", error);
            return rejectWithValue(error.response?.data || "Error fetching products");
        }
    }
);
export const editProduct = createAsyncThunk(
    '/products/editProduct',
    async ({ id, formData }) => {
        const result = await axios.put(`http://localhost:5000/api/admin/products/edit-product/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )

        return result?.data;
    }
);

export const deleteProduct = createAsyncThunk(
    '/products/deleteProduct',
    async (id) => {
        const result = await axios.delete(`http://localhost:5000/api/admin/products/delete-product/${id}`
        )

        return result?.data;
    }
);

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        });
    },
  });
  
  export default AdminProductsSlice.reducer;