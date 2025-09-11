// models/Category.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_public_id: {   
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Category",
    schema: "public",
    timestamps: true,
    indexes: [
      {
        name: "Category_pkey",
        unique: true,
        fields: [{ name: "category_id" }],
      },
    ],
  }
);

export default Category;
