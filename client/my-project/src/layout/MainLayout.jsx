import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '../getTheme/theme';
import useMediaQuery from '@mui/material/useMediaQuery'
import { ThemeProvider } from '@mui/material/styles'
import {  useSelector } from 'react-redux'
import {  useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {




  const mode = useSelector((state) => state.theme.mode);
  

  const PrefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const actualMode = useMemo(() => {
    if (mode === 'system') {
      return PrefersDark ? 'dark' : 'light';
    };
    return mode
  }, [mode, PrefersDark]);
  const myTheme = useMemo(() => getTheme(actualMode), [actualMode]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={myTheme}>
        <Box sx={{ width: "100%", backgroundColor: 'background.default' }}>
          <Navbar />
          <Box sx={{ maxWidth: '85rem', minHeight: '100vh', flex: 1, marginInline: 'auto' }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default MainLayout
