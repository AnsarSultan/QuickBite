import express from 'express';
import "dotenv/config";
import userRouters from './routes/userRoutes.js';
import productRouters from './routes/productRoutes.js';
import promotionRouters from './routes/promotionRoutes.js';
import("./config/database.js");
const app = express()
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRouters );
// app.use("/api/orders", );
app.use("/api/products", productRouters);
app.use("/api/promotions", promotionRouters );

app.get('/',(req , res)=>{
    res.send("Server is working...")
})
app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})