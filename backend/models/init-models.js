var DataTypes = require("sequelize").DataTypes;
var _Category = require("./Category");
var _Delivery_address = require("./Delivery_address");
var _Order = require("./Order");
var _Order_item = require("./Order_item");
var _Product = require("./Product");
var _Promotion = require("./Promotion");
var _User = require("./User");
var __prisma_migrations = require("./_prisma_migrations");

function initModels(sequelize) {
  var Category = _Category(sequelize, DataTypes);
  var Delivery_address = _Delivery_address(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var Order_item = _Order_item(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var Promotion = _Promotion(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var _prisma_migrations = __prisma_migrations(sequelize, DataTypes);

  Product.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(Product, { as: "Products", foreignKey: "category_id"});
  Delivery_address.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(Delivery_address, { as: "Delivery_addresses", foreignKey: "order_id"});
  Order_item.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(Order_item, { as: "Order_items", foreignKey: "order_id"});
  Order_item.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Order_item, { as: "Order_items", foreignKey: "product_id"});
  Order.belongsTo(Promotion, { as: "promotion", foreignKey: "promotion_id"});
  Promotion.hasMany(Order, { as: "Orders", foreignKey: "promotion_id"});
  Delivery_address.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Delivery_address, { as: "Delivery_addresses", foreignKey: "user_id"});
  Order.belongsTo(User, { as: "customer", foreignKey: "customer_id"});
  User.hasMany(Order, { as: "Orders", foreignKey: "customer_id"});
  Order.belongsTo(User, { as: "taken_by", foreignKey: "taken_by_id"});
  User.hasMany(Order, { as: "taken_by_Orders", foreignKey: "taken_by_id"});

  return {
    Category,
    Delivery_address,
    Order,
    Order_item,
    Product,
    Promotion,
    User,
    _prisma_migrations,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
