// models/Promotion.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Promotion = sequelize.define(
  "Promotion",
  {
    promotion_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true, // ✅ moved from index for clarity
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "Promotion",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "Promotion_code_key",
        unique: true,
        fields: [{ name: "code" }],
      },
      {
        name: "Promotion_pkey",
        unique: true,
        fields: [{ name: "promotion_id" }],
      },
    ],
  }
);

export default Promotion;
