// models/Delivery_address.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DeliveryAddress = sequelize.define(
  "Delivery_address",
  {
    address_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    address_line1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address_line2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Order", // 👈 must match your Order model name
        key: "order_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // 👈 must match your User model name
        key: "user_id",
      },
    },
  },
  {
    tableName: "Delivery_address",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "Delivery_address_pkey",
        unique: true,
        fields: [{ name: "address_id" }],
      },
    ],
  }
);

export default DeliveryAddress;
