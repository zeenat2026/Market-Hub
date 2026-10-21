import Cart from '../models/cart.js';
import Product from '../models/products.js';

export const addToCart=async (req,res) =>{
 const {productId,quantity} = req.body;
try {
    const product = await Product.findById(productId);
if (!product) return res.status(404).json({ message: 'Product not found' });
if (quantity > product.stock) {
  return res.status(400).json({ message: `Only ${product.stock} in stock` });
}

     const cart= await Cart.findOne({userId:req.user._id})

       if(!cart) {
        const newCart= await Cart.create({
        userId:req.user._id,
        products:[{
            productId,
        quantity,
        }]
     })  ;
     const populatedData = await newCart.populate('products.productId');
  return res.status(201).json(populatedData);   
    
       }
   
 const existingProduct = cart.products.find((obj)=>obj.productId.toString() === productId);

if (existingProduct) {

  const newTotal = existingProduct.quantity + quantity;
  if (newTotal > product.stock) {
    return res.status(400).json({ message: `You can't add more than ${product.stock} of this product` });
  }
  existingProduct.quantity = newTotal;
  await cart.save();
  const populatedData = await cart.populate('products.productId');
  return res.status(200).json(populatedData);      
} else {
  cart.products.push({ productId, quantity });
  await cart.save();
  const populatedData = await cart.populate('products.productId');
  return res.status(200).json(populatedData);   
     
}
   
} catch (error) {
   return res.status(500).json({message:error.message})
}
}

export const getCart = async (req, res) => {
    try {
    const cart= await Cart.findOne({userId:req.user._id}).populate('products.productId');
    return res.status(200).json(cart);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};



export const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.products.find((obj) => obj.productId._id.toString() === req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        
        cart.products = cart.products.filter((obj) => obj.productId._id.toString() !== req.params.id);
         await cart.save();
        const populatedData = await cart.populate('products.productId');
        return res.status(200).json(populatedData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const updateCartItem = async (req, res) => {
   
   try {
     const product = await Product.findById(req.params.id);
     if (!product) return res.status(404).json({ message: 'Product not found' });
    if(  req.body.quantity < 1  || req.body.quantity > product.stock) {
     return res.status(400).json({ message: `Quantity must be between 1 and ${product.stock}` });
        }

     const cart = await Cart.findOne({ userId: req.user._id });
     if (!cart) return res.status(404).json({ message: 'Cart not found' });

     const existingProduct = cart.products.find((obj) => obj.productId.toString() === req.params.id);
     if(!existingProduct) return res.status(404).json({message:'Item Not Found'});
       existingProduct.quantity = req.body.quantity;
    
       await cart.save()
       const populatedData = await cart.populate('products.productId');
       return res.status(200).json(populatedData);
     

   } catch (error) {
  return res.status(500).json({message:error.message})
    
   }
}