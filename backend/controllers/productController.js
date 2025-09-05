import express from "express";
import Category from "../models/Category.js";
import { body , validationResult } from "express-validator";
import Product from "../models/Product.js";

const addProduct = async (req, res) => {
  try {
    // const { user_id, role } = req.user;
    const { name, price, category_id } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    await Promise.all([
      body("name").trim().notEmpty().withMessage("Product name is required").run(req),
      body("price").trim().notEmpty().withMessage("Product price is reuqired").run(req),
      body("category_id").trim().notEmpty().withMessage("Please select the category for the Product").run(req)
    ])
    if (!req.file) {
      return res.status(400).json({
        errors: [{ msg: "Product image is required" }],
      });
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({
        errors: [{ msg: "Invalid category. Please select a valid one." }],
      });
    }
    const newProduct = await Product.create({
      name: name,
      price: price,
      image_url: imageUrl,
      category_id: category_id,
      availability: true
  })

  if(!newProduct){
    return res.json({success:false , message: "Failed to add product"})
  }

  res.json({success: true , message: "Product added Succesfully"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addCategory = async (req , res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    await Promise.all([
      body("name").trim().notEmpty().withMessage("Category name is required").run(req)
    ])

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }


    const newCategory = await Category.create({
      name: name,
      image_url: imageUrl
    })
    if(!newCategory){
      return res.json({success:false, message: "Failed to add category"})
    }
    res.json({success: true , message: "Category added successfully"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, addCategory };
