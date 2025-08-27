import express from 'express';
import "dotenv/config";
const app = express()
const port = process.env.PORT;
import adminRouter from './routes/adminRoutes.js';
import publicRouter from './routes/publicRoutes.js';

app.use('/admin',adminRouter)
app.use('/', publicRouter)

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})