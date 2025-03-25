import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice'
import shopProductsSlice from './shop/product-slice'
import shopCartsSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartsSlice,
        shopAddress: shopAddressSlice
    }
})

export default store;