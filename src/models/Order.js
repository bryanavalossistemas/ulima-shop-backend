import sequelize from "../configs/database.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstDirection: {
      type: DataTypes.STRING,
    },
    secondDirection: {
      type: DataTypes.STRING,
    },
    district: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pendiente",
    },
    lastFourNumbersPay: {
      type: DataTypes.STRING,
    },
    subtotal: {
      type: DataTypes.FLOAT,
    },
    shippingAmount: {
      type: DataTypes.FLOAT,
    },
    tax: {
      type: DataTypes.FLOAT,
    },
    total: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Order;
