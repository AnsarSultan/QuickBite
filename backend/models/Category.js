const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Category',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Category_pkey",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
