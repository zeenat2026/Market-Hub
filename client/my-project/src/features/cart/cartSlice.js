import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, postTheCart, removeCartItem, updateCartItem } from "../../thunk/asyncThunk.js";
import { logout } from "../auth/authSlice.js";

const initialState = {
    cartData: {products:[]},
    loading: true,
    err: null
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) =>{
   state.cartData={products:[]}
        }
     },
    extraReducers:(builder)=>{
        builder.addCase(fetchCart.pending,(state)=>{
            state.loading = true
            state.err = null
        });
    builder.addCase(fetchCart.fulfilled,(state,action)=>{
        state.loading = false
        state.cartData = action.payload
        state.err = null
    });
    builder.addCase(fetchCart.rejected,(state,action)=>{
        state.loading = false
        state.err = action.payload
    });
     
 
    builder.addCase(postTheCart.fulfilled,(state,action)=>{
        state.loading= false
        state.cartData=action.payload
        state.err = null
    });

    builder.addCase(removeCartItem.fulfilled,(state,action)=>{
        state.loading= false
        state.cartData=action.payload
        state.err = null
    });

    builder.addCase(updateCartItem.fulfilled,(state,action)=> {
        state.loading = false
        state.cartData = action.payload
        state.err = null
    });

    /// for clear the cart data when user logout
    builder.addCase(logout,(state)=>{
        state.cartData = {products:[]}
        state.loading = false
        state.err = null
    });

    }
})

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;