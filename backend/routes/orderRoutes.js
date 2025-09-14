import express from "express";
import auth from "../middlewares/auth.js";
import checkPermission from "../middlewares/accessControl.js";
import { placeOrder, getAllOrders } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post('/' , auth , checkPermission("createOwn" , "order") , placeOrder)
orderRouter.get('/', auth , checkPermission('readAny', 'order'), getAllOrders)

export default orderRouter;
