import ProductBrandController from "../controllers/ProductBrandController.js";
import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize,
  upload.single("image"),
  ProductBrandController.createProductBrand
);

router.get(
  "/",
  authenticate,
  authorize,
  ProductBrandController.getAllProductBrands
);

router.get("/:id", ProductBrandController.getProductBrand);

router.put(
  "/:id",
  authenticate,
  authorize,
  upload.single("image"),
  ProductBrandController.updateProductBrand
);

router.delete("/:id", ProductBrandController.deleteProductBrand);

export default router;
