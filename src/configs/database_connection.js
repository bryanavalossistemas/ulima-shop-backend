import sequelize from "./database.js";
import colors from "colors";
import Product from "../models/Product.js";
import ProductCharacteristic from "../models/ProductCharacteristic.js";
import { ProductCategory } from "../models/ProductCategory.js";
import ProductBrand from "../models/ProductBrand.js";
import { User } from "../models/User.js";
import OrderShippingMethod from "../models/OrderShippingMethod.js";
import OrderPaymentMethod from "../models/OrderPaymentMethod.js";
import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import { Token } from "../models/Token.js";
import { Image } from "../models/Image.js";

async function connectDataBase() {
  try {
    Product.hasMany(ProductCharacteristic, {
      foreignKey: "productId",
      as: "productCharacteristics",
    });
    ProductCharacteristic.belongsTo(Product, {
      foreignKey: "productId",
      as: "product",
    });
    ProductBrand.hasMany(Product, {
      foreignKey: "productBrandId",
      as: "products",
    });
    Product.belongsTo(ProductBrand, {
      foreignKey: "productBrandId",
      as: "productBrand",
    });
    ProductCategory.hasMany(Product, {
      foreignKey: "productCategoryId",
      as: "products",
    });
    Product.belongsTo(ProductCategory, {
      foreignKey: "productCategoryId",
      as: "productCategory",
    });

    User.hasMany(Order, {
      foreignKey: "userId",
      as: "orders",
    });
    Order.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    OrderShippingMethod.hasMany(Order, {
      foreignKey: "orderShippingMethodId",
      as: "orders",
    });
    Order.belongsTo(OrderShippingMethod, {
      foreignKey: "orderShippingMethodId",
      as: "orderShippingMethod",
    });

    OrderPaymentMethod.hasMany(Order, {
      foreignKey: "orderPaymentMethodId",
      as: "orders",
    });
    Order.belongsTo(OrderShippingMethod, {
      foreignKey: "orderShippingMethodId",
      as: "orderPaymentMethod",
    });

    Product.hasMany(OrderDetail, {
      foreignKey: "productId",
      as: "orderDetails",
    });
    OrderDetail.belongsTo(Product, {
      foreignKey: "productId",
      as: "product",
    });

    Order.hasMany(OrderDetail, {
      foreignKey: "orderId",
      as: "orderDetails",
    });
    OrderDetail.belongsTo(Order, {
      foreignKey: "orderId",
      as: "order",
    });

    User.hasOne(Token, {
      foreignKey: "userId",
      as: "token",
    });
    Token.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    Image.hasOne(ProductBrand, {
      foreignKey: "imageId",
      as: "productBrand",
    });
    ProductBrand.belongsTo(Image, {
      foreignKey: "imageId",
      as: "image",
    });

    Image.hasOne(ProductCategory, {
      foreignKey: "imageId",
      as: "productCategory",
    });
    ProductCategory.belongsTo(Image, {
      foreignKey: "imageId",
      as: "image",
    });

    Image.hasOne(Product, {
      foreignKey: "imageId",
      as: "product",
    });
    Product.belongsTo(Image, {
      foreignKey: "imageId",
      as: "image",
    });
    await sequelize.authenticate();
    await sequelize.sync();

    console.log(colors.blue.bold("CONEXIÓN EXITOSA A LA BASE DE DATOS"));
  } catch (error) {
    console.log(
      colors.red.bold("HUBO UN ERROR AL CONECTARSE A LA BASE DE DATOS")
    );
    console.log(error);
  }
}

export default connectDataBase;
