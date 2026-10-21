//module js 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRouter.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoutes.js';



/// for reading .env file;
dotenv.config();

const app=express();
//middleware

connectDB().catch((err) => console.log('DB connection failed:', err.message));

app.use(cors());
app.use(express.json());

app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes);
app.use('/api/carts',cartRoutes);
app.use('/api/orders',orderRoutes);


const PORT=process.env.PORT || 5000

if (!process.env.VERCEL) {
    app.listen(PORT,()=>{
    console.log('Server is running on http://localhost:5000/');
});
}


export default app;