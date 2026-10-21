
import {Typography , Button , ButtonGroup, Box} from '@mui/material';
import  {useState , useEffect} from 'react';
import { useDispatch} from 'react-redux';
import Alert from '@mui/material/Alert';
import { postTheCart } from '../thunk/asyncThunk.js'






const AddToCartControls = ({product})=> {
 const [qty , setQty] = useState(1)
 const [cartLoading,setCartLoading]=useState(false);
 const [cartErr ,setCartErr]=useState(null);
  const dispatch = useDispatch()

  const handleMinus = ()=>{
     setQty((preV)=>preV > 1 ? preV-1 : preV)
  }
  const handleplus = (productStock) => {
    setQty((preV)=>preV < productStock ? preV+1 : preV)
  }
  const addingCart = async (id) => {
  try {
    setCartLoading(true);
    await dispatch(postTheCart({productId:id,quantity:qty})).unwrap();
    setQty(1)
    setCartErr(null)
  } catch (error) {
   
    setCartErr(error);
   

  } finally {
    setCartLoading(false);
  }
 }

 useEffect(() => {
  if (!cartErr) return;
  const timeoutId = setTimeout(() => setCartErr(null), 6000);
  return () => clearTimeout(timeoutId);
}, [cartErr]);


  return (
    <Box sx={{display:'flex', flexDirection:'column',gap:2,alignItems:'center'}}>
       {cartErr && <Alert severity="error">{cartErr}</Alert>}

       {product.stock > 0 ? (
        <Box sx={{display:'flex',gap:1}} onClick ={(e)=>e.stopPropagation()}>
            
     <ButtonGroup variant="outlined" color='button' size="small" >
        <Button onClick={handleMinus} >-</Button>
        <Typography sx={{width:'20px' , textAlign:'center',alignSelf:'center'}}>{qty}</Typography>
        <Button onClick={()=>handleplus(product.stock)}>+</Button>
      </ButtonGroup>

     <Button variant='contained'
          disabled={cartLoading}
           onClick={() => {
            
            addingCart(product._id);
          
           }}
          >{cartLoading ? 'Adding to Cart ....' : 'Add to Cart'}</Button>
        </Box>
       ) :(
   <Box  onClick ={(e)=>e.stopPropagation()}>
  
        <Button variant='contained' disabled >Out of Stock</Button>  
   </Box>
       )}
    </Box>
  )
}

export default AddToCartControls