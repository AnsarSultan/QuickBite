import express from 'express';
import { addCategory, addProduct, editCategory, productByCategory, productDetails, showAllProducts } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import upload from "../config/multer.js";
import checkPermission from '../middlewares/accessControl.js';


const productRouters = express.Router();


productRouters.get("/", showAllProducts)
productRouters.get("/:id" , productDetails)
productRouters.get("/category/:categoryId", productByCategory)


productRouters.post("/" , auth , checkPermission("createAny" , "product") ,  upload.single("productImage"),  addProduct)
productRouters.post("/category" , auth , checkPermission("createAny" , "category") , upload.single("categoryImage") ,addCategory)
productRouters.put("/category/:categoryId" , auth , checkPermission("updateAny" , "category") , upload.single("categoryImage") , editCategory )


export default productRouters
