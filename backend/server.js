import express from 'express';
import cors from "cors";
import "dotenv/config";
import userRouters from './routes/userRoutes.js';
import productRouters from './routes/productRoutes.js';
import promotionRouters from './routes/promotionRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import("./config/database.js");
const app = express()
const port = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true                 
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRouters );
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouters);
app.use("/api/promotions", promotionRouters );

app.get('/',(req , res)=>{
    res.send("Server is runing...")
})
app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})