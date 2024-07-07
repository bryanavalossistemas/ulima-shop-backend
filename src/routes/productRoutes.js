import ProductController from "../controllers/ProductController.js";
import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize,
  upload.single("image"),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/active", ProductController.getAllProductsActive);

router.get("/query", ProductController.getAllProductsByQueryAndOrderBy);

router.get("/:id", authenticate, authorize, ProductController.getProduct);

router.get("/public/:id", ProductController.getPublicProduct);

router.put(
  "/:id",
  authenticate,
  authorize,
  upload.single("image"),
  ProductController.updateProduct
);

router.delete("/:id", ProductController.deleteProduct);

router.patch("/:id", ProductController.updateProductCategoryId);

router.patch("/:id/null", ProductController.setNullProductCategoryId);

router.patch("/:id/active", ProductController.toggleProductActive);

router.get(
  "/productCategory/:id",
  authenticate,
  authorize,
  ProductController.getAllProductsAndProductCategory
);

router.get(
  "/productBrand/:id",
  authenticate,
  authorize,
  ProductController.getAllProductsAndProductBrand
);

export default router;
