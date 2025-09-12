import Order from "../models/Order.js";
import Order_item from "../models/Order_item.js";
import Product from "../models/Product.js";
import Promotion from "../models/Promotion.js";

const placeOrder = async (req , res)=>{
   try {
    const { id } = req.user
    function generateUniqueCode() {
        const now = new Date();
      
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // month is 0-based
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
      
        const code = `${id}${day}${month}${hours}${minutes}`;
        return code;
      }
      
      const order_tracking_id = generateUniqueCode()


      const taken_by_id = id;
    const { order_type , promotion_code , items} = req.body
    if(!items || items.length === 0 ){
        return res.status(404).json({success:false , message: "No items in order"})
    }

    let total = 0;
    let orderItems = [];
    for(let item of items){
        const product = await Product.findByPk(item.product_id)
        if(!product){
            return res.status(404).json({success: false , message: "Product not found"})
        }
        const price = product.price;
        const subtotal = price * item.quantity;
        total += subtotal

        orderItems.push({
            product_id: item.product_id,
            quantity: item.quantity,
            price,
            subtotal
        });
    }


    let discount = 0;
    let promotion_id = null;
    if(promotion_code){
        const promo = await Promotion.findOne({where: { code: promotion_code, is_active: true}})
        if (
            promo &&
            new Date() >= new Date(promo.start_date) &&
            new Date() <= new Date(promo.end_date)
          ) {
            promotion_id = promo.promotion_id;
            if (promo.type === "percentage") {
              discount = (total * promo.value) / 100;
            } else if (promo.type === "flat") {
              discount = promo.value;
            }
          } else {
            return res.json({ success: false, message: "Promo code is not valid right now" });
          }
          
    }

    const finalTotal = total - discount

    const order = await Order.create({
        order_uuid: order_tracking_id,
        status: "pending",
        payment_status: "paid",
        order_type,
        discount,
        delivery_charges: 0,
        promotion_id,
        total_amount: finalTotal,
        customer_id: null,
        taken_by_id
    });

    for(let item of orderItems){
            await Order_item.create({...item, order_id: order.order_id})
    }

    res.json({success:true , message: "Order Placed successfully"})


   } catch (error) {
    console.log(error)
    res.status(500).json({success: false , message: "Something went wrong. Please try again later."})
   }
}
const updateOrder = async ()=>{

}

export {placeOrder , updateOrder}