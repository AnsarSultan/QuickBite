import express from "express";
import auth from "../middlewares/auth.js";
import checkPermission from "../middlewares/accessControl.js";
import { createPromoCode , updatePromoStatus  , deletePromoCode} from "../controllers/promotionController.js";

const promotionRouters = express.Router();

promotionRouters.post('/addPromoCode',auth , checkPermission("createAny" , "promotion") , createPromoCode)
promotionRouters.patch('/status/:id' , auth , checkPermission("updateAny" , "promotion") , updatePromoStatus)
promotionRouters.delete('/delete/:id' , auth , checkPermission("updateAny" , "promotion") , deletePromoCode)

export default promotionRouters