import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/authService';
import { Avatar, Box, IconButton, InputAdornment, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { NavLink } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error,setError] = useState(null);
    const [loading,setLoading]=useState(false);
 
    const navigate = useNavigate();
    const dispatch = useDispatch();
     function handleChange(e) {
        const {name,value} = e.target;
        setFormData((preV)=>{
            return {
                ...preV,
                [name]: value
            }
        })
        
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
  const data=  await loginUser(formData);

   dispatch(setCredentials({token:data.token,
    user:{
      name:data.name,
       email:data.email}}));

            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
             setFormData((prev) => ({ ...prev, password: '' }));
        }
        finally {
            setLoading(false);
        }

    
    }
  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:8}}>
     <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
      <Box sx={{display:'flex',flexDirection:"column"}}>
    <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component={'h1'} variant='h5'>
            Login
          </Typography>
           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete='email'
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete='current-password'
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              slotProps={{
           input: {
             endAdornment: (
               <InputAdornment position="end">
                 <IconButton
                   aria-label="toggle password visibility"
                   onClick={() => setShowPassword(!showPassword)}
                 >
                   {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                 </IconButton>
               </InputAdornment>
             ),
           }
              }}
            />

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <NavLink to="/register" style={{ color: 'inherit' }}>
                Create new account
              </NavLink>
            </Typography>
          </Box>
      </Box>
     </Paper>
    </Box>
  )
}

export default Login
