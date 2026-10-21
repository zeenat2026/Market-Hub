import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice.js';
import authReducer from '../features/auth/authSlice.js';
import cartReducer from '../features/cart/cartSlice.js'


const store = configureStore({
    reducer: {
theme:themeReducer,
auth:authReducer,
cart: cartReducer,
    },
});

export default store