import { ProductCategoryController } from "../controllers/ProductCategoryController.js";
import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

export const productCategoryRoutes = Router();

productCategoryRoutes.post(
  "/",
  authenticate,
  authorize,
  upload.single("image"),
  ProductCategoryController.createProductCategory
);

productCategoryRoutes.get(
  "/",
  authenticate,
  authorize,
  ProductCategoryController.getAllProductCategories
);

productCategoryRoutes.get(
  "/public",
  ProductCategoryController.getAllProductCategoriesPublic
);

productCategoryRoutes.get("/:id", ProductCategoryController.getProductCategory);

productCategoryRoutes.put(
  "/:id",
  authenticate,
  authorize,
  upload.single("image"),
  ProductCategoryController.updateProductCategory
);

productCategoryRoutes.delete(
  "/:id",
  ProductCategoryController.deleteProductCategory
);
