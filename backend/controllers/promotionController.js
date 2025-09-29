import { body, validationResult } from "express-validator";
import Promotion from "../models/Promotion.js";
import moment from "moment";

const allPromoCode = async (req , res)=>{
    try {
        const PromoCodes = await Promotion.findAll();
        if(PromoCodes.lentgh === 0){
            res.status(404).json({success: false , data: "No record found"})
        }
        res.json({success: true , data: PromoCodes})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong. Please try again later." })
    }

}

const createPromoCode = async (req, res) => {
    try {
        const { code, type, value, start_date, end_date, is_active } = req.body

        await Promise.all([
            body("code").trim().notEmpty().withMessage("Promo code is required").run(req),
            body("type").trim().notEmpty().withMessage("Please select the type").isIn(["percentage", "flat"]).withMessage("Type must be 'percentage' or 'flat'").run(req),
            body("value").notEmpty().withMessage("Value is required").isFloat({ gt: 0 }).withMessage("Value must be a number greater than 0").run(req),
            body("start_date").notEmpty().withMessage("Start date is required").run(req),
            body("end_date").notEmpty().withMessage("End Date is required").run(req),
            body("is_active").isBoolean().withMessage("Status must be true or false").run(req),
        ])
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const promoCodeExist = await Promotion.findOne({ where: { code } })
        if (promoCodeExist) {
            return res.json({ success: false, message: "Promo code already exist" })
        }

        const newPromoCode = await Promotion.create({
            code,
            type,
            value,
            start_date: moment(start_date, "DD-MM-YYYY").toDate(),
            end_date: moment(end_date, "DD-MM-YYYY").toDate(),            
            is_active
          });

        if (newPromoCode) {
            return res.json({ success: true, message: "Promo code Added successfully" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong. Please try again later." })
    }
}

const updatePromoStatus = async (req,res)=>{
    try {
        const {promotion_id} = req.params;
        const { code, type, value, start_date, end_date, is_active } = req.body

        await Promise.all([
            body("code").trim().notEmpty().withMessage("Promo code is required").run(req),
            body("type").trim().notEmpty().withMessage("Please select the type").isIn(["percentage", "flat"]).withMessage("Type must be 'percentage' or 'flat'").run(req),
            body("value").notEmpty().withMessage("Value is required").isFloat({ gt: 0 }).withMessage("Value must be a number greater than 0").run(req),
            body("start_date").notEmpty().withMessage("Start date is required").run(req),
            body("end_date").notEmpty().withMessage("End Date is required").run(req),
            body("is_active").isBoolean().withMessage("Status must be true or false").toBoolean().run(req),
        ])
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const promoCodeExist = await Promotion.findByPk(promotion_id)
        if (!promoCodeExist) {
            return res.json({ success: false, message: "Promo code not exist." })
        }

        const updatePromoCode =await Promotion.update(
            {
              code,
              type,
              value,
              start_date: moment(start_date, "DD-MM-YYYY").toDate(),
              end_date: moment(end_date, "DD-MM-YYYY").toDate(),
              is_active,
            },
            { where: { promotion_id } } 
          );

        if (updatePromoCode) {
            return res.json({ success: true, message: "Promo code Updated successfully" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong. Please try again later." })
    }
}
const deletePromoCode = async (req,res)=>{
    try {
        const {id } = req.params;

          const promo = await Promotion.findByPk(id);
          if(!promo){
            return res.status(404).json({success:false , message: "Promo code not found"})
          }
          await promo.destroy();
          res.json({ success: true, message: "Promo code deleted Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
    }
}


const checkPromoCode = async (req, res) => {
    try {
      const { code } = req.params;
      if (!code) {
        return res.status(400).json({ success: false, message: "Promo code is required" });
      }      
      const promo = await Promotion.findOne({ where: { code } });
  
      if (promo) {
        return res.status(200).json({ success: true, data: promo });
      } else {
        return res.status(404).json({ success: false, message: "Promo not found." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  };
  


export {allPromoCode , createPromoCode ,updatePromoStatus , deletePromoCode , checkPromoCode}