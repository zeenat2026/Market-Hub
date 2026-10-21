import express from 'express';
import { placeOrder,getOrders, cancellOrder, changeStatusOrder } from '../controllers/orderController.js';
import { isAdmin, protect } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post('/place-order',protect ,placeOrder);
router.get('/get-orders',protect ,getOrders);
router.patch('/cancel-order/:id',protect, cancellOrder);
router.patch('/update-order/:id',protect,isAdmin ,changeStatusOrder);

export default router