import express from 'express';
import "dotenv/config";
import userRouters from './routes/userRoutes.js';
import("./config/database.js");
const app = express()
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRouters );
// app.use("/api/orders", );
// app.use("/api/products", );
// app.use("/api/promotions", );

app.get('/',(req , res)=>{
    res.send("Server is working...")
})
app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})