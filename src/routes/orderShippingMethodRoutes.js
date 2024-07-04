import OrderShippingMethodController from "../controllers/OrderShippingMethodController.js";
import { Router } from "express";

const router = Router();

router.post("/", OrderShippingMethodController.createOrderShippingMethod);

router.get("/", OrderShippingMethodController.getAllOrderShippingMethods);

router.get("/:id", OrderShippingMethodController.getOrderShippingMethod);

router.put("/:id", OrderShippingMethodController.updateOrderShippingMethod);

router.delete("/:id", OrderShippingMethodController.deleteOrderShippingMethod);

export default router;
