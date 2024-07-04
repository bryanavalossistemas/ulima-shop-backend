import sequelize from "../configs/database.js";
import { DataTypes } from "sequelize";

const ProductCharacteristic = sequelize.define(
  "ProductCharacteristic",
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

export default ProductCharacteristic;
