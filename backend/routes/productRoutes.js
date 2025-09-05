import express from 'express';
import { addCategory, addProduct } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import upload from "../config/multer.js";


const productRouters = express.Router();

productRouters.post("/addProduct" , auth , upload.single("productImage"),  addProduct)
productRouters.post("/addCategory" , auth , upload.single("categoryImage") ,addCategory)


export default productRouters
