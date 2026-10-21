import { createAsyncThunk } from "@reduxjs/toolkit";
import { editTheCartItem, getCart,postCart, removeTheCartItem } from '../services/cartService.js'

export const fetchCart = createAsyncThunk('cart/fetchCart',async (_,{rejectWithValue})=>{
    try {
    const  data =  await getCart();
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const postTheCart = createAsyncThunk('cart/postTheCart',async (cartData,{rejectWithValue}) => {
    try {
        const data = await postCart(cartData);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem',async (id,{rejectWithValue}) => {
    try {
        const data = await removeTheCartItem(id)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
});

  export const updateCartItem = createAsyncThunk('cart/updateCartItem',async (updatedCart,{rejectWithValue}) => {
    try {
        const data = await editTheCartItem(updatedCart);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
});