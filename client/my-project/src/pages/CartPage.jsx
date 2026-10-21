import { useEffect,useState } from "react"
import { Alert, Box, Button, ButtonGroup, Card,CardContent, CardMedia, Divider, Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import  {CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeCartItem, updateCartItem } from "../thunk/asyncThunk";
import Loader from "../components/common/Loader";
import { placeOrder } from "../services/orderServices";
import { clearCart } from "../features/cart/cartSlice";

const CartPage = () => {
const cart = useSelector((state) => state.cart.cartData);
const loading = useSelector((state) => state.cart.loading);
const err = useSelector((state) => state.cart.err);

const [orderLoading, setOrderLoading] = useState(false);
const [orderError, setOrderError] = useState(null);


const dispatch = useDispatch()
const navigate = useNavigate()

async function handleOrders() {
  try {
    setOrderError(null)
    setOrderLoading(true);
    const data = await placeOrder();
    
    dispatch(clearCart());
    navigate('/orders',{state:{warning:data.warning}});
    
  } catch (error) {
    setOrderError(error.response?.data?.message || 'Something went wrong');
  } finally {
    setOrderLoading(false);
  }
}

  useEffect(() => {
    dispatch(fetchCart())
  },[dispatch])




useEffect(() => {
  const timeoutId = setTimeout(() => setOrderError(null), 6000);

  return () => clearTimeout(timeoutId);
},[orderError])
const totalPrice =
  cart?.products?.reduce(
    (total, obj) => total + (obj.productId?.price ?? 0) * obj.quantity,
    0
  ) ?? 0;

const totalItems =
  cart?.products?.reduce((count, obj) => count + obj.quantity, 0) ?? 0;

  if (loading) return <Loader />
  if (err) return <Alert severity='error'>{err}</Alert>
  if (!cart?.products?.length) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',minHeight:'60vh' ,gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}> Empty Cart</Typography>
      <Alert severity="info">Your cart is empty</Alert>
      <Button variant="contained" onClick={()=>navigate('/')}>
        Browse Products
      </Button>
    </Box>
  );
}
  
  return (
   <Box sx={{padding:2 , marginTop:'20px'}}>
    <Grid container spacing={2} >
      <Grid size={{xs:12 , md:8}}>
   <Stack direction={'column'} spacing={2}>
    
     {cart?.products?.map((obj)=>(
    
    <Card key={obj?.productId?._id} 
   onClick={()=>navigate(`/product/${obj?.productId?._id}`)}
      sx={{
              height: "100%",
              display: 'flex',
             flexDirection:{xs:'column',sm:'row'},
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}>
                <CardMedia
              component="img"
           image={obj?.productId?.image || "https://placehold.co/400x400?text=No+Image"}
              alt="Cart thumbnail"
              onError={(e)=>{
             e.target.onerror = null
            e.target.src='https://placehold.co/400x400?text=No+Image'
              }}
              sx={{
                height: 200,
                width:{xs:'100%',sm:300},
                objectFit: "cover",
              
              }}
            />
     
                 <CardContent sx={{ flexGrow: 1 }}>
                   <Typography
                     variant="h6"
                     component="h2"
                     sx={{
                       fontWeight: 600,
                       mb: 1,
                       overflow: "hidden",
                       color:'grey.700',
                       textOverflow: "ellipsis",
                       display: "-webkit-box",
                       WebkitLineClamp: 2,
                       WebkitBoxOrient: "vertical",
                     }}
                   >
                     {obj?.productId?.name}
                   </Typography>
                <Stack divider={<Divider  style={{backgroundColor:'lightgrey'}} orientation="vertical" flexItem />} direction={'row'} spacing={2} sx={{mt:2}}>
                 <Typography component={'h1'} variant='h6' sx={{bgcolor:'primary.main',color:'grey.300',borderRadius:2,paddingX:'10px'}}>{obj?.productId?.price} Rs</Typography>
                 <Typography component={'h1'} variant='h6' sx={{color:obj?.productId?.stock> 0 ?'success.main':'red'}}>{obj?.productId?.stock >0 ?`${obj.productId.stock} in stock`:`Out of stock`}</Typography>
                </Stack>

                <CardActions sx={{mt:2}}>
                <CartHandlers obj={obj} dispatch={dispatch} />
                </CardActions>

                 </CardContent>
   </Card>
     ))}
    </Stack>
      </Grid>
      <Grid size={{xs:12 , md:4}} sx={{alignSelf:'stretch'}}>
  <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        position: "sticky",
        top:90,
    
      }}
    >
      <Typography variant="h6" sx={{fontWeight:700}} gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Stack direction="row" sx={{ mb: 1.5 ,justifyContent:'space-between'}}>
        <Typography color="text.secondary">Total Quantity</Typography>
        <Typography fontWeight={500}>{totalItems}</Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" sx={{justifyContent:"space-between", alignItems:"center"}}>
        <Typography variant="subtitle1" sx={{fontWeight:600}}>
          Total
        </Typography>
        <Typography variant="h5" sx={{fontWeight:700}} color="primary.main">
          {totalPrice.toLocaleString('en-PK')} Rs
        </Typography>
      </Stack>
    {orderError && <Alert severity="error" sx={{mt:2}}>{orderError}</Alert>}
      <Button
        fullWidth
        variant="contained"
        onClick={handleOrders}
        size="large"
        disabled={orderLoading || totalItems === 0}
        sx={{ mt: 3, py: 1.4, borderRadius: 2, fontWeight: 600 }}
      >
       {orderLoading ?'Working...': 'Proceed to Checkout '}
      </Button>
    </Paper>
      </Grid>
    </Grid>
 

    
   </Box>
  )
}



const CartHandlers = ({obj , dispatch, }) => {
  
  const [qty, setQty] = useState(obj?.quantity);
 const [removeLoading, setRemoveLoading] = useState(false);
const [removeErr, setRemoveErr] = useState(null);
const [updateLoading, setUpdateLoading] = useState(false);
const [updateErr , setUpdateErr] = useState(null);


const incrementQty = async (obj) => {
const newQty = qty + 1;
  if (newQty > obj?.productId?.stock) return;
 try {
  setUpdateLoading(true)
  await  dispatch(updateCartItem({productId: obj.productId._id, quantity: newQty})).unwrap();
   setQty(newQty);
 } catch (error) {
  setUpdateErr(error)
 }
 finally {
  setUpdateLoading(false)
 }
}

const decrementQty = async () => {
 const  newQty = qty - 1;
  if (newQty < 1) return;
 try {
   
 await dispatch(updateCartItem({productId: obj.productId._id, quantity: newQty})).unwrap();
 setQty(newQty);
 } catch (error) {
  setUpdateErr(error)
 }
}
 const handleRemoveProduct =  async ( id) => {
  try {
    setRemoveLoading(true)
  await  dispatch(removeCartItem(id)).unwrap();
 
  } catch (error) {
    setRemoveErr(error);
  } finally {
    setRemoveLoading(false)
  }
 
 
}

useEffect(() =>{
  const timeoutId = setTimeout(() => {
    setRemoveErr(null);
    setUpdateErr(null);
  }, 6000);
  return () => clearTimeout(timeoutId);
},[removeErr,updateErr]);

  return (
   <Stack direction={'column'} spacing={2}>
     {updateErr && <Alert severity="error">{updateErr}</Alert>}
     {removeErr && <Alert severity="error">{removeErr}</Alert>}
      <Box sx={{display:'flex',gap:2}} onClick={(e)=>e.stopPropagation()}>
  
     
      <ButtonGroup variant="outlined" color="button" size="small" aria-label="outlined button group">
        <Button disabled={updateLoading} onClick={decrementQty} >-</Button>
    <Typography sx={{width:'20px',alignSelf:'center',textAlign:'center'}}>{qty}</Typography>
         <Button disabled={updateLoading} onClick={()=>incrementQty(obj)}>+</Button>
      </ButtonGroup>

      <Button variant="contained" disabled={removeLoading} onClick={()=>{ handleRemoveProduct(obj.productId._id)}}>
       {removeLoading ? "Removing..." : "Remove"}
     </Button>
     </Box>
   </Stack>
  )
}



export default CartPage