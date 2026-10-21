import { createSlice } from "@reduxjs/toolkit"


   const validTheme = ['light', 'dark', 'system'];
  const marketHubTheme=localStorage.getItem('market-hub-theme')


   const initialState={
    mode: validTheme.includes(marketHubTheme) ? marketHubTheme : 'light'
   }

 const themeSlice=  createSlice({
    name:'theme',
    initialState,
    reducers:{
        themeChanger:(state,action)=>{
            state.mode=action.payload
            localStorage.setItem('market-hub-theme',action.payload)
        }
    }
   });

   export const {themeChanger}=themeSlice.actions;
   export default themeSlice.reducer;