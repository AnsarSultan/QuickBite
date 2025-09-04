import express from "express"
const addProduct =async (req , res)=>{
   try {
    const { user_id, role } = req.user; 
    const { name, price  , category_id} = req.body;

    const imageUrl = req.file ? req.file.path : null;
    
    res.json({
        success: true,
        message: "Product added successfully",
        tokenData: { user_id, role },   
        productData: {                  
          name,
          price,
          category_id,
          imageUrl
        }
      });
    } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message}) 
   }
}

const updateProduct = ()=>{

}

export {addProduct , updateProduct}