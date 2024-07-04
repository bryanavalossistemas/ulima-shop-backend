import OrderPaymentMethodController from "../controllers/OrderPaymentMethodController.js";
import { Router } from "express";

const router = Router();

router.post("/", OrderPaymentMethodController.createOrderPaymentMethod);

router.get("/", OrderPaymentMethodController.getAllOrderPaymentMethods);

router.get("/:id", OrderPaymentMethodController.getOrderPaymentMethod);

router.put("/:id", OrderPaymentMethodController.updateOrderPaymentMethod);

router.delete("/:id", OrderPaymentMethodController.deleteOrderPaymentMethod);

export default router;
