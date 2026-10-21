import { Alert, Avatar, Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading,setLoading] = useState(false);
  const [err,setErr]=useState(null)

  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const handleOnChange = (e) =>{
    const {name,value}=e.target
    setFormData({...formData,
     [name]:value
    })
  }
  
  async function handleSignUp (e) {
    e.preventDefault();
try {
  setLoading(true);
  setErr(null)
     const data= await registerUser(formData);
     
     
        dispatch(setCredentials({
          token:data.token,
          user:{
          name:data.name,
          email:data.email}}));
   navigate('/')
} catch (error) {
  setErr(error.response?.data?.message || 'Registration Failed')
}  finally{
  setLoading(false)
}
  

  }
  return (
   <Box sx={{display:"flex",justifyContent:"center",mt:8}}>
  <Paper elevation={3} sx={{width:'100%',p:4,maxWidth:'400px'}}>
   <Avatar sx={{bgcolor:'primary.main',mb:1}}>
       <PersonAddOutlinedIcon />

   </Avatar>
   <Typography component={'h1'} variant="h6">
    Sign Up
   </Typography>
   <Box onSubmit={handleSignUp} component={'form'} sx={{width:'100%',mt:3,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <TextField 
    label="Name"
    margin="normal"
    name="name"
    value={formData.name}
    onChange={handleOnChange}
    required 
    fullWidth 
    autoComplete="name"
    type="text">

    </TextField>

       <TextField 
    label="Email"
    name="email"
    value={formData.email}
    margin="normal"
    required 
    fullWidth 
    autoComplete="email"
    onChange={handleOnChange}
    type="email">

    </TextField>

       <TextField
    label="Password"
    name="password"
    value={formData.password}
    margin="normal"
    required 
    fullWidth 
    helperText="Password must be at least 8 characters"
    autoComplete="new-password"
   type={showPassword? 'text':'password'}
    onChange={handleOnChange}
    slotProps={{
      input: {
        endAdornment : (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        )
      }
    }}
    >

    </TextField>
     {err && <Alert severity="error" sx={{ mt: 2 }}>{err}</Alert>}

    <Button type="submit" variant="contained" disabled={loading} sx={{width:'100%',mt:2}}>
      {loading ? 'Creating account' : 'Sign Up'}
    </Button>
    <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'inherit' }}>
                Login
              </Link>
            </Typography>

   </Box>
  </Paper>
   </Box>
  )
}

export default Register
