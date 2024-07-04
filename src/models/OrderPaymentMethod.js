import sequelize from "../configs/database.js";
import { DataTypes } from "sequelize";

const OrderPaymentMethod = sequelize.define(
  "OrderPaymentMethod",
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

export default OrderPaymentMethod;
