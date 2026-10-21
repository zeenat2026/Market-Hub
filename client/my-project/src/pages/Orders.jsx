
import { Alert, Box, Button, Card, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { cancellOrder, getOrders } from '../services/orderServices';
import Loader from '../components/common/Loader';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [orderLoading, setOrderLoading] = useState(true)
    const [orderErr, setOrderErr] = useState(null)
    const location = useLocation();
    const warning = location.state?.warning



  const updateOrderStatus= (theCancelledOrder) => {
   setOrders((preV)=>preV.map((order) =>order._id === theCancelledOrder._id ? {...order,status:theCancelledOrder.status} : order));
  }


    useEffect(() => {
        (async () => {
            try {
                setOrderLoading(true)
                const data = await getOrders()
                setOrders(data)


            } catch (error) {
                setOrderErr(error.response?.data?.message || 'Something went wrong')
            } finally {
                setOrderLoading(false)
            }
        })()
    }, [])

    if (orderLoading) return <Loader />
    if (orderErr) return <Alert severity='error'>{orderErr}</Alert>
    return (
        <Box sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
            {warning && <Alert severity="warning" sx={{ mb: 2 }}>{warning}</Alert>}

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 ,color:'grey.700'}}>
                My Orders
            </Typography>

            {orders.length === 0 ? (
                <Alert severity="info">No orders yet</Alert>
            ) : (
                <Stack spacing={3}>
                    
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} updateOrderStatus={updateOrderStatus} />
                    ))}
                </Stack>
            )}
        </Box>
    );
}






const OrderCard = ({ order ,updateOrderStatus}) => {
  const [cancelLoading , setCancelLoading] = useState(false)
  const [cancelErr , setCancelErr] = useState(null)
    const date = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString('en-PK', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : '';

        const statusColor={
            pending:'warning',
            shipped:'info',
            delivered:'success',
            cancelled:'error'
        }


    

   useEffect(()=>{
   const timeoutId = setTimeout(() => setCancelErr(null), 6000);
   return () => clearTimeout(timeoutId)
   },[cancelErr])

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            {cancelErr && <Alert severity='error'>{cancelErr}</Alert>}
              <Stack direction={'row'} sx={{margin:2,justifyContent:'space-between'}}>
                      <Chip 
                    label={`${order.status}`}
                     color={statusColor[order.status]}
                    sx={{ fontWeight: 700, fontSize: '1rem' }} />
                      
                    {order.status === 'pending' && <Button
                    disabled={cancelLoading}
                     onClick={async ()=>{
                        try {
                setCancelLoading(true)
                  const data = await cancellOrder(order._id)
                
                    updateOrderStatus(data)
                
                        } catch (error) {
                    setCancelErr(error.response?.data?.message || 'Something went wrong')
                        } finally{
                            setCancelLoading(false)
                        }
                    }} color='secondary'>{cancelLoading ? 'Cancelling...' : 'Cancel'}</Button>}
                    </Stack>
            {/* Header: order id, date, total */}
            <Box
                sx={{
                    px: 3,
                    py: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: 'action.hover',
                }}
            >


                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Order #{order._id.slice(-6).toUpperCase()}
                    </Typography>
                    {date && (
                        <Typography variant="body2" color="text.secondary">
                            {date}
                        </Typography>
                    )}
                </Box>
                <Chip
                    label={`${order.totalPrice.toLocaleString('en-PK')} Rs`}
                    color="primary"
                    sx={{ fontWeight: 700, fontSize: '1rem' }}
                />
            </Box>

            <Divider />

            {/* Items */}
            <CardContent>
                <Stack spacing={2} divider={<Divider flexItem />}>
                    {order.products.map((item) => (
                        <Stack key={item._id} direction="row" spacing={2} sx={{alignItems:"center"}}>
                            <CardMedia
                                component="img"
                                image={item.productId?.image || 'https://placehold.co/100x100?text=No+Image'}
                                alt={item.productId?.name || 'Product'}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/100x100?text=No+Image';
                                }}
                                sx={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover' }}
                            />
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                <Typography noWrap sx={{ fontWeight: 600 }}>
                                    {item.productId?.name || 'Product no longer available'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.quantity} × {item.priceAtPurchase.toLocaleString('en-PK')} Rs
                                </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                {(item.quantity * item.priceAtPurchase).toLocaleString('en-PK')} Rs
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Orders
