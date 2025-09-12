import express from "express";
import auth from "../middlewares/auth.js";
import checkPermission from "../middlewares/accessControl.js";
import { placeOrder } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post('/' , auth , checkPermission("createOwn" , "order") , placeOrder)

export default orderRouter;
