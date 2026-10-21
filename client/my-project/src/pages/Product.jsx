import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { useNavigate} from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { fetchProducts } from '../services/productService';
import Loader from '../components/common/Loader';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import { useDispatch} from 'react-redux';
import AddToCartControls from './AddToCartControls.jsx';

const Product = () => {
  const [productData,setProductData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(()=>{
    const fetchProductsData=async()=>{
      try {
        setLoading(true);
        const data=await fetchProducts();
      
        setProductData(data);
      } catch (error) {
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchProductsData();
  },[]);
  if(loading) return <Loader />
  if(error) return <Alert severity='error'>{error}</Alert>
  return (
      
  <Container maxWidth="lg" sx={{ py: 4}}>
      <Grid container spacing={3} >
        {productData.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </Container>
    )


}



 function ProductCard({product}) {

 const navigate= useNavigate();



 

  if(!product.image) return null
  return (
   <Grid size={{ xs: 12, sm: 6, md: 4}}  >
          <Card
          onClick={()=>navigate(`/product/${product._id}`)}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt="Product thumbnail"
              sx={{
                height: 200,
               aspectRatio:'1/1',
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
                {product?.name}
              </Typography>

           <Stack divider={<Divider  style={{backgroundColor:'lightgrey'}} orientation="vertical" flexItem />} direction={'row'} spacing={2} sx={{mt:2}}>
            <Typography component={'h1'} variant='h6' sx={{paddingX:'10px',bgcolor:'primary.main',color:'grey.300',borderRadius:2}}>{product.price} Rs</Typography>
            <Typography component={'h1'} variant='h6' sx={{color:product.stock > 0 ?'success.main':'red'}}>{product.stock >0 ?`${product.stock} in stock`:`Out of stock`}</Typography>
           </Stack>
            
            </CardContent>
      
         <CardActions sx={{mb:2}}>
         <AddToCartControls product={product} />
         </CardActions>
          </Card>
        </Grid>

  );
}



export default Product
