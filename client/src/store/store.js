import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice'
import adminOrdersSlice from './admin/order-slice'

import shopProductsSlice from './shop/product-slice'
import shopCartsSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'
import shopOrdersSlice from './shop/order-slice'


const store = configureStore({
    reducer: {
        // xác thực
        auth: authReducer,

        // quyền admin
        adminProducts : adminProductsSlice,
        adminOrder : adminOrdersSlice,

        // quyền user
        shopProducts: shopProductsSlice,
        shopCart: shopCartsSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrdersSlice,
    }
})

export default store;