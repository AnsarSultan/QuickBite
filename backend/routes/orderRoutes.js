import express from "express";
import auth from "../middlewares/auth.js";
import checkPermission from "../middlewares/accessControl.js";
import { placeOrder, getAllOrders , searchOrder, updateOrderStatus } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.get('/', auth , checkPermission('readAny', 'order'), getAllOrders)
orderRouter.get('/:id' , auth , checkPermission('readAny' , 'order'), searchOrder)

orderRouter.post('/' , auth , checkPermission("createOwn" , "order") , placeOrder)
orderRouter.patch('/:id' , auth , checkPermission('updateAny' , "order") , updateOrderStatus)


export default orderRouter;
