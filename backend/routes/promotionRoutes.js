import express from "express";
import auth from "../middlewares/auth.js";
import checkPermission from "../middlewares/accessControl.js";
import { createPromoCode , updatePromoStatus  , deletePromoCode, allPromoCode, checkPromoCode} from "../controllers/promotionController.js";

const promotionRouters = express.Router();

promotionRouters.get('/' , auth , checkPermission("readAny" , "promotion") , allPromoCode)
promotionRouters.get('/:code' , checkPromoCode)
promotionRouters.post('/',auth , checkPermission("createAny" , "promotion") , createPromoCode)
promotionRouters.put('/status/:promotion_id' , auth , checkPermission("updateAny" , "promotion") , updatePromoStatus)
promotionRouters.delete('/delete/:id' , auth , checkPermission("updateAny" , "promotion") , deletePromoCode)

export default promotionRouters