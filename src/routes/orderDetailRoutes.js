import OrderDetailController from "../controllers/OrderDetailController.js";
import { Router } from "express";

const router = Router();

router.post("/", OrderDetailController.createOrderDetail);

router.get("/", OrderDetailController.getAllOrderDetails);

router.get("/:id", OrderDetailController.getOrderDetail);

router.put("/:id", OrderDetailController.updateOrderDetail);

router.delete("/:id", OrderDetailController.deleteOrderDetail);

export default router;
