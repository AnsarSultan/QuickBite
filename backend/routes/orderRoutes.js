import express from "express";
import auth from "../middlewares/auth.js";
import checkPermission from "../middlewares/accessControl.js";
import { placeOrder, getAllOrders , searchOrder, updateOrderStatus, getUserOrders } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.get('/', auth , checkPermission('readAny', 'order'), getAllOrders)
orderRouter.post('/' , auth , checkPermission("createOwn" , "order") , placeOrder)
orderRouter.get('/my/orders' , auth , checkPermission('readOwn' , 'order'), getUserOrders)
orderRouter.get('/:id' , auth , checkPermission('readAny' , 'order'), searchOrder)
orderRouter.patch('/:id' , auth , checkPermission('updateAny' , "order") , updateOrderStatus)


export default orderRouter;
