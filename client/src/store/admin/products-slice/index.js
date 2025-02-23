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

export const fetchAllProducts = createAsyncThunk(
    '/products/fetchallproducts',
    async () => {
        const result = await axios.get('http://localhost:5000/api/admin/products/fetch-all-products'
        )

        return result?.data;
    }
);
const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
            state.isLoading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    },

    extraReducers: (builder) => {

    }
})