import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import { build } from 'vite';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
};
// register user
export const registerUser = createAsyncThunk("/auth/register",
    async (formData) => {
        const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
            withCredentials: true,
        });
        // const resData = await response.json();
        return response.data;
    }
)

// Login user
export const loginUser = createAsyncThunk("/auth/login",

    async (formData) => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            formData,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }
);

// Logout user
export const logoutUser = createAsyncThunk("/auth/logout",

    async () => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/logout", {},
            {
                withCredentials: true,
            }
        );

        return response.data;
    }
);


export const checkAuth = createAsyncThunk("/auth/checkauth",
    async () => {
        const response = await axios.get("http://localhost:5000/api/auth/check-auth",
            {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    Expires: '0'
                }
            });
        // const resData = await response.json();
        return response.data;
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        // AddCase Đăng ký
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

            // AddCase Đăng Nhập
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // AddCase Xác thực
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            }).addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            }).addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // AddCase Đăng Xuất
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            }).addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
    }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer