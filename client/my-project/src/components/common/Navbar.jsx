import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ToggleTheme from './ToggleTheme';
import { NavLink, useNavigate} from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { Badge } from '@mui/material';
import { fetchCart } from '../../thunk/asyncThunk';


const pages = [{id:1,path:'/',name:'Products'}, {id:2,path:'/orders',name:'Orders'}];


function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const count = useSelector((state) => state.cart.cartData?.products?.length || 0);

  const navigate= useNavigate();
  const dispatch =  useDispatch();
  const user = useSelector((state) => state.auth.user);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout=()=>{
   dispatch(logout())
    handleCloseUserMenu();
    navigate('/login');
  }
   React.useEffect(() => {
  if (user) {
    dispatch(fetchCart());
  }
    
   }, [dispatch , user]);
   
  return (
     <Box sx={{position:'sticky',top:0,zIndex:20}}>
          <AppBar position="static" sx={{backgroundColor:'primary.main'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ToggleTheme sx={{ display: { xs: 'none', md: 'flex',color:'white' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MarketHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((pageObj) => (
                <MenuItem key={pageObj.id} onClick={handleCloseNavMenu}>
                  <Typography component={NavLink} to={pageObj.path} sx={{ textAlign: 'center' }}>{pageObj.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ToggleTheme sx={{ display: { xs: 'flex', md: 'none',color:'white' }, mr: 1 }}  />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontSize:'1rem',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          MarketHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((pageObj) => (
              <Button
              component={NavLink} to={pageObj.path}
                key={pageObj.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pageObj.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0,display:'flex', gap:1 }}>
        {user ? ( <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>  <Avatar sx={{color:'white',bgcolor:'orange'}} alt={user.name}>{user.name.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: 'center' }}>{user.name}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>) : (  <Button component={NavLink} to="/login" sx={{ color: 'white' }}>
      Login
    </Button>)}
    
    <Button
  onClick={() => navigate('/cart')}
  startIcon={<Badge badgeContent={count} color="secondary">
    <ShoppingCartCheckoutIcon />
  </Badge>}
  sx={{ color: 'white' }}
>
  Cart
</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
     </Box>
  );
}
export default Navbar;
