import express from 'express';
import { createProduct,deleteProduct,getProductById,getProducts, updateProduct } from '../controllers/productControllers.js';
import { isAdmin, protect } from '../middleware/authMiddleWare.js';

const router=express.Router();

router.post('/',protect,isAdmin, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id',protect, isAdmin, updateProduct);
router.delete('/:id',protect, isAdmin, deleteProduct);

export default router;