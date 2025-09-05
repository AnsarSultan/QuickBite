// models/Order.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    order_uuid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    },
    delivery_charges: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User", 
        key: "user_id",
      },
    },
    taken_by_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Promotion",
        key: "promotion_id",
      },
    },
  },
  {
    sequelize,
    tableName: "Order",
    schema: "public",
    timestamps: true,
    indexes: [
      {
        name: "Order_pkey",
        unique: true,
        fields: [{ name: "order_id" }],
      },
    ],
  }
);

export default Order;
