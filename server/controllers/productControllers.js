import Product from "../models/products.js";

export const createProduct= async (req,res)=>{
    try {
        const product= new Product(req.body)
        const savedProducts=await product.save();
        res.status(201).json(savedProducts)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,      // URL se ID li
      req.body,           // naya data jo update karna hai
      { new: true }        // updated document wapas do (purana nahi)
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductById= async (req,res)=>{
  try {
    const product= await Product.findById(req.params.id);
   if(!product){
    return res.status(404).json({message:"Product not found"})
   }
   res.status(200).json(product)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}