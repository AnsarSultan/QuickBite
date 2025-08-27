import express from "express";
const adminRouter = express.Router();

adminRouter.get('/',(req,res)=>{
    res.send("Admin Dashboard")
})

adminRouter.get('/orders',(req,res)=>{
    res.send("admin orders page")
})

export default adminRouter