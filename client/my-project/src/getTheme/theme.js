import { createTheme } from "@mui/material/styles";

 export const getTheme=(mode)=>createTheme({
    palette:{
        mode:mode,
        ...(mode === 'light' && {
            primary:{main:'#e74c1d'},
            secondary:{main:'#f50057'},
            footer:{main:'#f07e4a'},
            brand:{main:'#3bc7c0'},
            button:{main:'#e74c1d'}
           
        }),
        ...(mode === 'dark' && {
            primary:{main:'rgb(7, 27, 36)'},
            secondary:{main:'#f50057'},
            brand:{main:'#c0530bc4'},
            footer:{main:'rgb(7,27,37)'},
            background:{default:'#0b1425'},
            button:{main:'#ffffff'}
        
        })
    }
})