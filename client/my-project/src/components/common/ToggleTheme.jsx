import React, { useState } from 'react'
import { IconButton } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import ContrastIcon from '@mui/icons-material/Contrast';
import {useDispatch} from 'react-redux';
import { themeChanger } from '../../features/theme/themeSlice';

const ToggleTheme = ({sx}) => {
  const [themeMode,setThemeMode]=useState('light')
  const dispatch=useDispatch();
  return (
 <IconButton

 sx={sx}
  onClick={() => {
    if (themeMode === "dark") {
      setThemeMode("light");
      dispatch(themeChanger('light'))
    } else if (themeMode === "light") {
      setThemeMode("system");
      dispatch(themeChanger('system'))
    } else {
      setThemeMode("dark");
    dispatch(themeChanger('dark'))
    }
  }}
>
  {themeMode === "dark" ? (
    <DarkModeOutlinedIcon />
  ) : themeMode === "light" ? (
    <LightModeTwoToneIcon  />
  ) : (
    <ContrastIcon />
  )}
</IconButton>
  )
}

export default ToggleTheme
