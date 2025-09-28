import express from "express";
import auth from "../middlewares/auth.js";
import checkPermission from "../middlewares/accessControl.js";
import { createPromoCode , updatePromoStatus  , deletePromoCode, allPromoCode} from "../controllers/promotionController.js";

const promotionRouters = express.Router();

promotionRouters.get('/' , auth , checkPermission("readAny" , "promotion") , allPromoCode)
promotionRouters.post('/',auth , checkPermission("createAny" , "promotion") , createPromoCode)
promotionRouters.patch('/status/:id' , auth , checkPermission("updateAny" , "promotion") , updatePromoStatus)
promotionRouters.delete('/delete/:id' , auth , checkPermission("updateAny" , "promotion") , deletePromoCode)

export default promotionRouters