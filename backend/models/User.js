// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // your sequelize instance

const User = sequelize.define("User", {
  user_id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "User",
  schema: "public",
  timestamps: false
});

export default User;
