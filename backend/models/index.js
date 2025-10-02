import Order from "./Order.js";
import Order_item from "./Order_item.js";
import Product from "./Product.js";
import User from "./User.js";
import sequelize from "../config/database.js";

Order.hasMany(Order_item, { foreignKey: "order_id" });
Order_item.belongsTo(Order, { foreignKey: "order_id" });

Order_item.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Order_item, { foreignKey: "product_id" });

Order.belongsTo(User, { foreignKey: "taken_by_id", as: "takenBy" });
Order.belongsTo(User, { foreignKey: "customer_id", as: "customer" });

export { sequelize ,Order, Order_item, Product , User };
