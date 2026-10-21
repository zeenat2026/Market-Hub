import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const userFromLocalStorage= localStorage.getItem('user')
const tokenFromLocalStorage=localStorage.getItem('token')

const isTokenValid = (token) => {
    if(!token) return false;
    try {
        const decode=jwtDecode(token);
        const currentTime=Date.now()/1000;
        return decode.exp > currentTime; 
    } catch (error) {
        return false;
    }
}

const valid = isTokenValid(tokenFromLocalStorage);

if(!valid){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}
const initialState={
    user: valid ? JSON.parse(userFromLocalStorage): null,
    token: valid ? tokenFromLocalStorage :  null,
    isAuthenticated: valid
}
const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
        const {user,token}=action.payload;
        state.user=user;
        state.token=token;
        state.isAuthenticated=true;
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user))
        },
        logout:(state)=>{
             state.user = null;
             state.token = null;
              state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
        }
    }
 })

export const {setCredentials,logout} = authSlice.actions;
export default authSlice.reducer