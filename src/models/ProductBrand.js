import sequelize from "../configs/database.js";
import { DataTypes } from "sequelize";

const ProductBrand = sequelize.define(
  "ProductBrand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default ProductBrand;
