import Cart from "../models/cart.js";
import Order from "../models/orders.js";
import Product from "../models/products.js";

export const placeOrder = async (req, res) => {
    const reservedItems = [];

    const restoreStock = async (reservedItems) => {
       for(const item of reservedItems){
        await Product.findByIdAndUpdate(item._id,{$inc:{stock:+item.quantity}});
       }
    }


try {
    const cart = await Cart.findOne({userId:req.user._id}).populate('products.productId')
     
    if(!cart || !cart.products.length){
        return res.status(400).json({message:'Cart is Empty'})
    }

    let totalPrice = 0;
    const productOrders = [];
   
    /// first loop for making order array
    for (const item of cart.products) {

        const product = item.productId;
         if(!product) {
            await restoreStock(reservedItems)
         return res.status(404).json({message:'Product not found'})
         }
        const quantity = item.quantity;
        const price = product.price ;
    
       

 const stockCheckAndDecreese =  await Product.findOneAndUpdate({_id:product._id , stock : {$gte:quantity}},{$inc:{stock : - quantity}});

    if(!stockCheckAndDecreese){
        await restoreStock(reservedItems)
    return res.status(400).json({message:`${product.name} is in ${product.stock} stock`})
    }
    reservedItems.push({_id:product._id, quantity});   

        productOrders.push({ productId: product._id, quantity, priceAtPurchase: price });
           totalPrice += price * quantity;
    }

    const order = await Order.create({
        userId: req.user._id,
        products: productOrders,
        totalPrice,
    });
    let warning=null
    try {
          cart.products = [];
    await cart.save();


    } catch (error) {
        console.error(error.message);
       warning = "Order placed, but cart could not be cleared. Please clear the cart manually."
        
    }

        return res.status(201).json({order,warning})
  

} 
catch (error) {
    await restoreStock(reservedItems)
    return res.status(500).json({message : error.message})
}
}


export const getOrders = async (req, res) => {
    try {
    const orders = await Order.find({userId:req.user._id}).populate('products.productId').sort({createdAt:-1});

    return res.status(200).json(orders)

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}


export const cancellOrder = async (req , res) => {
    try {
    const order = await Order.findOne({
        userId:req.user._id,
        _id:req.params.id
    });

    if(!order) {
       return res.status(404).json({message:"Order Not Found"})
    };

  const updatedOrder = await Order.findOneAndUpdate({
    userId:req.user._id,
    _id:req.params.id,
    status:"pending"
  },{
    $set:{
      status:"cancelled"
    },
    
  },{returnDocument:'after',runValidators:true});

 
 if(!updatedOrder){
    return res.status(400).json({message : 'Only pending orders can be cancelled'})
 }

      for(const item of order.products){
        await Product.findByIdAndUpdate(item.productId,{$inc:{stock:+item.quantity}});
      }
    
     
      return res.status(200).json(updatedOrder);
    } 

    catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const changeStatusOrder = async (req , res) => {
 const allowedForm = {shipped:'pending',delivered:'shipped'};
 const {status} = req.body;
  try {
       const requiredStatus =  allowedForm[status];

   if(!requiredStatus){
    return res.status(400).json({message:"Invalid Status"})
   }

    const order = await Order.findOne({_id:req.params.id});
    if(!order) {
        return res.status(404).json({message:'Order Not Found'})
    }

 const changedOrder = await Order.findOneAndUpdate(
    {
    _id : req.params.id,
    status : requiredStatus
 },{
    $set : {
        status
    }
 },
 {returnDocument:'after' , runValidators: true}
 );

 if(!changedOrder){
    return res.status(400).json({message:`Only ${requiredStatus} orders can be ${status}`})
 }
 return res.status(200).json(changedOrder)

  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}