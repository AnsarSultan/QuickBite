import express from 'express';
import { addCategory, addProduct, productByCategory, productDetails, showAllProducts } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import upload from "../config/multer.js";
import checkPermission from '../middlewares/accessControl.js';


const productRouters = express.Router();


productRouters.get("/", showAllProducts)
productRouters.get("/:id" , productDetails)
productRouters.get("/category/:categoryId", productByCategory)


productRouters.post("/" , auth , checkPermission("createAny" , "product") ,  upload.single("productImage"),  addProduct)
productRouters.post("/addCategory" , auth , checkPermission("createAny" , "product") , upload.single("categoryImage") ,addCategory)

export default productRouters
