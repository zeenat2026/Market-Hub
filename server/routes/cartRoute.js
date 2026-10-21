import { addToCart,getCart,removeCartItem, updateCartItem,  } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleWare.js";
import express from 'express';


const router = express.Router();

router.get('/get-Cart',protect ,getCart);
router.post('/addToCart',protect ,addToCart);
router.put('/update-CartItem/:id',protect, updateCartItem);
router.delete('/remove-CartItem/:id',protect, removeCartItem);


export default router;