import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect ,useState} from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'react-router-dom';
import {  fetchSingleProduct } from '../services/productService';



 export const ProductDetails = () => {
  const [data,setData]=useState({});
   const navigate = useNavigate()
 const { id } =useParams();

 
  useEffect(() => {
    (async ()=>{
 const data= await fetchSingleProduct(id);
    setData(data);
    })()
  },[id])    


  return (
<Box sx={{ maxWidth: 900, mx: 'auto',mt:5, p: { xs: 2, md: 4 } }}>
  <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 ,color:'button.main'}}>
    Back
  </Button>

  <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
    <Stack direction={{ xs: 'column', md: 'row' }}>
      
      {/* Image side */}
      <Box sx={{ width: { xs: '100%', md: '45%' } }}>
        <CardMedia
          component="img"
          image={data?.image}
          alt={data?.name}
          sx={{
            width: '100%',
            height: { xs: 280, md: '100%' },
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Details side */}
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          {data?.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'grey.600', mb: 2 }}>
          {data?.category}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'grey.700' }}>
          {data?.description}
        </Typography>
        <Stack direction="row" spacing={2} sx={{alignItems:'center'}}>
          <Typography sx={{ bgcolor: 'primary.main', color: 'white', px: 2, py: 0.5, borderRadius: 1, fontWeight: 600 }}>
            {data?.price} Rs
          </Typography>
          <Divider orientation="vertical" flexItem sx={{bgcolor:'lightgrey'}} />
          <Divider orientation="vertical" flexItem sx={{bgcolor:'lightgrey'}} />
          <Typography sx={{ color: data?.stock > 0 ? 'success.main' : 'error.main', fontWeight: 500 }}>
            {data?.stock > 0 ? `${data.stock} in stock` : 'Out of stock'}
          </Typography>
        </Stack>
      </CardContent>

    </Stack>
  </Card>
</Box>
  
  )
}




