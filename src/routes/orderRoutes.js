import OrderController from "../controllers/OrderController.js";
import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/", authenticate, OrderController.createOrder);

router.get("/", OrderController.getAllOrders);

router.get("/createdAt", OrderController.getOrdersByCreatedAt);

router.get("/user", authenticate, OrderController.getOrdersByUserId);

router.get("/:id", OrderController.getOrder);

router.put("/:id", OrderController.updateOrder);

router.delete("/:id", OrderController.deleteOrder);

router.patch("/:id/cancel", OrderController.cancelOrder);

export default router;
