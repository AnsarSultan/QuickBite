// models/Order_item.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order_item = sequelize.define(
  "Order_item",
  {
    order_item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Order", 
        key: "order_id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Product", 
        key: "product_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Order_item",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "Order_item_pkey",
        unique: true,
        fields: [{ name: "order_item_id" }],
      },
    ],
  }
);

export default Order_item;
