import Order from "./Order.js";
import Order_item from "./Order_item.js";
import Product from "./Product.js";

Order.hasMany(Order_item, { foreignKey: "order_id" });
Order_item.belongsTo(Order, { foreignKey: "order_id" });

Order_item.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Order_item, { foreignKey: "product_id" });

export { Order, Order_item, Product };
