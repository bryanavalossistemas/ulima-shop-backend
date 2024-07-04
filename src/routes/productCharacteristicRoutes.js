import ProductCharacteristicController from "../controllers/ProductCharacteristicController.js";
import { Router } from "express";

const router = Router();

router.post("/", ProductCharacteristicController.createProductCharacteristic);

router.get("/", ProductCharacteristicController.getAllProductCharacteristics);

router.get("/:id", ProductCharacteristicController.getProductCharacteristic);

router.put("/:id", ProductCharacteristicController.updateProductCharacteristic);

router.delete(
  "/:id",
  ProductCharacteristicController.deleteProductCharacteristic
);

router.delete(
  "/product/:id",
  ProductCharacteristicController.deleteProductCharacteristicsByProductId
);

export default router;
