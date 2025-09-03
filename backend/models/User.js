// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    role: {
      type: DataTypes.ENUM("customer", "cashier", "waiter", "admin"),
      defaultValue: "customer",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "User",
    freezeTableName: true,
    timestamps: false,
  }
);

export default User; // 👈 now default export works with "import User from ..."
