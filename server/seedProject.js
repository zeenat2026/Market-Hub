

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/products.js'; 

dotenv.config();

const productsData = [
  { name: 'Running Sneakers', description: 'Lightweight running shoes with breathable mesh upper.', category: 'Footware', price: 3200, countInStock: 25, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { name: 'Leather Loafers', description: 'Classic slip-on leather loafers for formal wear.', category: 'Footware', price: 4500, countInStock: 15, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400' },
  { name: 'Denim Jacket', description: 'Classic blue denim jacket, unisex fit.', category: 'Clothing', price: 4800, countInStock: 20, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
  { name: 'Wool Winter Coat', description: 'Warm wool-blend coat for cold weather.', category: 'Clothing', price: 7500, countInStock: 10, image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=400' },
  { name: 'Cotton T-Shirt', description: 'Soft 100% cotton crew-neck t-shirt.', category: 'Clothing', price: 1200, countInStock: 50, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { name: 'Matte Lipstick', description: 'Long-lasting matte finish lipstick, deep red shade.', category: 'Cosmetics', price: 950, countInStock: 40, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400' },
  { name: 'Compact Face Powder', description: 'Oil-control pressed powder for all-day matte finish.', category: 'Cosmetics', price: 1100, countInStock: 35, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400' },
  { name: 'Volumizing Mascara', description: 'Waterproof mascara for bold, voluminous lashes.', category: 'Cosmetics', price: 850, countInStock: 45, image: 'https://images.unsplash.com/photo-1631730359585-5a5e6a5ce6c0?w=400' },
  { name: 'Liquid Foundation', description: 'Full coverage liquid foundation, natural finish.', category: 'Cosmetics', price: 1400, countInStock: 30, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400' },
  { name: 'Wireless Earbuds', description: 'Bluetooth earbuds with noise cancellation.', category: 'Electronics', price: 5500, countInStock: 18, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' },
  { name: 'Smart Watch', description: 'Fitness tracker smartwatch with heart-rate monitor.', category: 'Electronics', price: 8900, countInStock: 12, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { name: 'Leather Handbag', description: 'Genuine leather handbag with adjustable strap.', category: 'Accessories', price: 6200, countInStock: 14, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    await Product.deleteMany(); // clear existing products

    await Product.insertMany(productsData); // insert new products

    console.log(`${productsData.length} products inserted successfully!`);
    process.exit(); // exit the process after seeding
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1); // exit with failure code
  }
};

importData();