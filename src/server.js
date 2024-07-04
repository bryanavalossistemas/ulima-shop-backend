import express from "express";
import connectDataBase from "./configs/database_connection.js";
import cors from "cors";
import morgan from "morgan";
import { productCategoryRoutes } from "./routes/productCategoryRoutes.js";
import productBrandRoutes from "./routes/productBrandRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import productCharacteristicRoutes from "./routes/productCharacteristicRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import orderShippingMethodRoutes from "./routes/orderShippingMethodRoutes.js";
import orderPaymentMethodRoutes from "./routes/orderPaymentMethodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderDetailRoutes from "./routes/orderDetailRoutes.js";

// Conectarse a la base de datos
await connectDataBase();

// Configurar el servidor Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Definir las rutas API
app.use("/api/productCategories", productCategoryRoutes);
app.use("/api/productBrands", productBrandRoutes);
app.use("/api/productCharacteristics", productCharacteristicRoutes);
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orderShippingMethods", orderShippingMethodRoutes);
app.use("/api/orderPaymentMethods", orderPaymentMethodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderDetails", orderDetailRoutes);

export default app;
