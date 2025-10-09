import { body, validationResult } from "express-validator";
import Promotion from "../models/Promotion.js";
import { sequelize, Order, Order_item, Product } from "../models/index.js";
import User from "../models/User.js";
import ac from "../config/role.js";
import eventBus from "../events/eventBus.js";

const placeOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
   
    const { id } = req.user;
    const { promotion_code, items, name, address, phone } = req.body;
    let taken_by_id;
    function generateUniqueCode() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear().toString().slice(-2);
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${id}${year}${day}${month}${hours}${minutes}`;
    }

    const order_tracking_id = generateUniqueCode();
   
    let order_type = "din-in";
    let customer_id = null;
    let payment_status = "unpaid";
    let delivery_charges = 0;

    const userDetails = await User.findByPk(id, { transaction: t });
    if (!userDetails) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (userDetails.role === "customer") {
      if (!name || !address || !phone) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "Name, address and phone are required for customers",
        });
      }

      
      
      customer_id = userDetails.user_id;
      payment_status = "unpaid";
      order_type = "Home delivery";
      delivery_charges = 90;
      await User.update(
        {
          name: userDetails.name || name,
          address: userDetails.address || address,
          phone: userDetails.phone || phone,
        },
        { where: { user_id: id }, transaction: t }
      );
    } else  {
      payment_status = "paid";
      order_type = "Takeaway";
     taken_by_id = id;
    }
    
  
    if (!items || items.length === 0) {
      await t.rollback();
      return res
        .status(400)
        .json({ success: false, message: "No items in order" });
    }

    let total = 0;
    let orderItems = [];
    for (let item of items) {
      const product = await Product.findByPk(item.product_id, {
        transaction: t,
      });
      if (!product) {
        await t.rollback();
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      
      const price = product.price;
      const subtotal = price * item.quantity;
      total += subtotal;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price,
        subtotal,
      });
    }

    let discount = 0;
    let promotion_id = null;
    if (promotion_code) {
      const promo = await Promotion.findOne({
        where: { code: promotion_code, is_active: true },
        transaction: t,
      });

      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-CA");
      
      if (
        promo &&
        formattedDate >= promo.start_date &&
        formattedDate <= promo.end_date
      ) {
        promotion_id = promo.promotion_id;
        discount =
          promo.type === "percentage"
            ? (total * promo.value) / 100
            : promo.type === "flat"
            ? promo.value
            : 0;
      } else {
        await t.rollback();
        return res.json({
          success: false,
          message: "Promo code is not valid right now",
        });
      }
    }


    const finalTotal = total - discount + delivery_charges;

    const order = await Order.create(
      {
        order_uuid: order_tracking_id,
        status: "pending",
        payment_status,
        order_type,
        discount,
        delivery_charges,
        promotion_id,
        total_amount: finalTotal,
        customer_id,
        taken_by_id,
      },
      { transaction: t }
    );

    for (let item of orderItems) {
      await Order_item.create(
        { ...item, order_id: order.order_id },
        { transaction: t }
      );
    }

  
    const orderDetails = await Order.findOne({
      where: { order_id: order.order_id },
      include: [
        {
          model: Order_item,
          attributes: [
            "order_item_id",
            "product_id",
            "quantity",
            "price",
            "subtotal",
          ],
          include: [
            {
              model: Product,
              attributes: ["name", "price"],
            },
          ],
        },
        {
          model: User,
          as: "customer",
          attributes: ["user_id", "name", "role"],
        },
      ],
      transaction: t
    });
    
    await t.commit();

    if(userDetails.role === 'customer'){
      eventBus.emit("orderplaced", orderDetails , userDetails )
    }

    return res.json({
      success: true,
      message: "Order Placed successfully",
      order: orderDetails,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { id, role } = req.user;

    const permission = ac.can(role).readAny("order");

    let whereCondition = {};

    if (permission.granted) {
      whereCondition = {};
    } else {
      if (role === "waiter") {
        whereCondition = { taken_by_id: id };
      } else if (role === "customer") {
        whereCondition = { customer_id: id };
      }
    }

    const orders = await Order.findAll({
      where: whereCondition,
      include: [
        {
          model: Order_item,
          attributes: [
            "order_item_id",
            "product_id",
            "quantity",
            "price",
            "subtotal",
          ],
          include: [
            {
              model: Product,
              attributes: ["name", "image_url"],
            },
          ],
        },
        {
          model: User,
          as: "takenBy",
          attributes: ["user_id", "name", "role"],
        },
        {
          model: User,
          as: "customer",
          attributes: ["user_id", "name", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching orders",
    });
  }
};

const searchOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { order_uuid: id },
      include: [
        {
          model: Order_item,
          attributes: [
            "order_item_id",
            "product_id",
            "quantity",
            "price",
            "subtotal",
          ],
          include: [
            {
              model: Product,
              attributes: ["name", "image_url"],
            },
          ],
        },
        {
          model: User,
          as: "takenBy",
          attributes: ["user_id", "name", "role"],
        },
        {
          model: User,
          as: "customer",
          attributes: ["user_id", "name", "role"],
        },
      ],
    });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    return res.json({ success: true, order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Promise.all([
      body("status").isIn(["ready", "delivered", "cancelled"]).run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const checkOrder = await Order.findByPk(id);
    if (!checkOrder) {
      res.json({ success: false, message: "Record not found." });
    }
    checkOrder.status = status;
    await checkOrder.save();
    res.json({ success: true, message: "Status Updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wront. Please try again later",
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.findAll({
      where: { taken_by_id: id },
      include: [
        {
          model: Order_item,
          attributes: [
            "order_item_id",
            "product_id",
            "quantity",
            "price",
            "subtotal",
          ],
          include: [
            {
              model: Product,
              attributes: ["name", "image_url"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wront. Please try again later",
    });
  }
};

export {
  placeOrder,
  getAllOrders,
  searchOrder,
  updateOrderStatus,
  getUserOrders,
};
