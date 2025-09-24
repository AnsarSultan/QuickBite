import Category from "../models/Category.js";
import { body, validationResult } from "express-validator";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

const addProduct = async (req, res) => {
  try {
    // const { user_id, role } = req.user;
    const { name, price, category_id , description , availability} = req.body;

    const imageUrl = req.file ? req.file.path : null;
    const imagePublicId = req.file? req.file.filename : null;

    await Promise.all([
      body("name").trim().notEmpty().withMessage("Product name is required").run(req),
      body("price").trim().notEmpty().withMessage("Product price is reuqired").run(req),
      body("category_id").trim().notEmpty().withMessage("Please select the category for the Product").run(req),
      body("availability").trim().notEmpty().withMessage("Please select the availability for the Product").run(req)
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
      description: description,
      image_url: imageUrl,
      image_public_id: imagePublicId,
      category_id: category_id,
      availability: availability
    })

    if (!newProduct) {
      return res.json({ success: false, message: "Failed to add product" })
    }

    res.json({ success: true, message: "Product added Succesfully" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const editProduct = async (req , res)=>{
  try {
    const { product_id } = req.params;
    const { name , price , category_id , description, availability} = req.body;
    await Promise.all([
      body("name").optional().trim().notEmpty().withMessage("Product name cannot be empty").run(req),
      body("price").optional().trim().notEmpty().withMessage("Product Price is required").run(req),
      body("category_id ").optional().trim().notEmpty().withMessage("Please select a category").run(req),
    ]);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

    const product = await Product.findByPk(product_id)
    if(!product){
      return res.status(404).json({success: false , message: "Product not found"});
    }

    if(category_id){
      const category = await Category.findByPk(category_id);
      if(!category){
        return res.status(400).json({ errors: [{ msg: "Invalid category. Please select a valid one." }],
        });
      }
    }

    let imageUrl = product.image_url;
    let imagePublicId = product.image_public_id;

    if(req.file){
      if(product.image_public_id){
        await cloudinary.uploader.destroy(product.image_public_id);
      }
      imageUrl = req.file.path;
      imagePublicId = req.file.filename
    }

    const updateProduct = await product.update({
      name: name ?? product.name,
      price: price ?? product.price,
      category_id: category_id ?? product.category_id,
      description: description ?? product.description,
      availability:  availability ?? product.availability,
      image_url: imageUrl,
      image_public_id: imagePublicId
    });

    if(!updateProduct){
      return res.status(400).json({success: false , message: "Failed to update the product."})
    };

    res.json({ success:true , message: "Product Updated successfully"});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


const deleteProduct = async (req , res)=>{
  try {
    const { product_id } = req.params;

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.image_public_id) {
      await cloudinary.uploader.destroy(product.image_public_id);
    }

    await product.destroy();

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}


const showAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" })
    }
    res.json({ success: true, data: products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
  }
}


const productDetails = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" })
    }
    res.json({ success: true, data: product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
  }
}


const productByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const products = await Product.findAll({
      where: { category_id: categoryId }
    })
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" })
    }
    res.json({ success: true, data: products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
  }
}


const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const imagePublicId = req.file ? req.file.filename : null;

    await Promise.all([
      body("name").trim().notEmpty().withMessage("Category name is required").run(req)
    ])

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const newCategory = await Category.create({
      name: name,
      image_url: imageUrl,
      image_public_id: imagePublicId,
    })
    if (!newCategory) {
      return res.json({ success: false, message: "Failed to add category" })
    }
    res.json({ success: true, message: "Category added successfully" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong. Please try again later" });
  }
};


const editCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" })
    }

    await Promise.all([
      body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category name cannot be empty")
        .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let updatedData = {};

    if(name){
      updatedData.name = name;
    }

    if(req.file){
      updatedData.image_url = req.file.path;
      updatedData.image_public_id = req.file.filename;
    }

    const updateCategory = await category.update(updatedData)

    if(!updateCategory){
      res.json({success: false , message: "Failed to update the category"})
    }

    res.json({success: true , message: "Category updated successfully"})



  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
  }
}

const showAllCategory = async (req , res)=>{
  try {
    const category = await Category.findAll()
    if (category.length === 0) {
      return res.status(404).json({ success: false, message: "No category found" })
    }
    res.json({ success: true, data: category })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
  }
}

const deletCategory = async (req , res)=>{
 try {
  const { categoryId } = req.params

  const category = await Category.findByPk(categoryId)
  if(!category){
    res.status(400).json({ success:false , message: "Category not found."})
  }

  if(category.image_public_id){
    await cloudinary.uploader.destroy(category.image_public_id)
  }
  await category.destroy();
  res.json({success:true , message: "Category delete Successfully"})
 } catch (error) {
  console.log(error);
    res.status(500).json({ success: false, message: error.message });
 }
}


export { addProduct, addCategory, showAllProducts, productDetails, productByCategory, editCategory,deletCategory, showAllCategory , editProduct , deleteProduct};
