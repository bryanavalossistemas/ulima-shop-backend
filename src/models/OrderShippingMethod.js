import sequelize from "../configs/database.js";
import { DataTypes } from "sequelize";

const OrderShippingMethod = sequelize.define(
  "OrderShippingMethod",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default OrderShippingMethod;
