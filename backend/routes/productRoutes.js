import express from 'express';
import { addCategory, addProduct } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import upload from "../config/multer.js";
import checkPermission from '../middlewares/accessControl.js';


const productRouters = express.Router();

productRouters.post("/addProduct" , auth , checkPermission("createAny" , "product") ,  upload.single("productImage"),  addProduct)
productRouters.post("/addCategory" , auth , checkPermission("createAny" , "product") , upload.single("categoryImage") ,addCategory)


export default productRouters
