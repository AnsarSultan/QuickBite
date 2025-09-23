import express from 'express';
import { addCategory, addProduct, deletCategory, deleteProduct, editCategory, editProduct, productByCategory, productDetails, showAllCategory, showAllProducts } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import upload from "../config/multer.js";
import checkPermission from '../middlewares/accessControl.js';


const productRouters = express.Router();


productRouters.get("/", showAllProducts)
productRouters.get("/category" , showAllCategory)

productRouters.get("/:id" , productDetails)
productRouters.get("/category/:categoryId", productByCategory)

productRouters.post("/" , auth , checkPermission("createAny" , "product") ,  upload.single("productImage"),  addProduct)
productRouters.put("/:product_id", auth , checkPermission("updateAny" , "product") ,  upload.single("productImage"), editProduct )
productRouters.delete("/:product_id", auth , checkPermission("deleteAny" , "product") , deleteProduct )



productRouters.post("/category" , auth , checkPermission("createAny" , "category") , upload.single("categoryImage") ,addCategory)
productRouters.put("/category/:categoryId" , auth , checkPermission("updateAny" , "category") , upload.single("categoryImage") , editCategory )
productRouters.delete("/category/:categoryId" , auth , checkPermission("updateAny" , "category") , upload.single("categoryImage") ,  deletCategory)


export default productRouters
