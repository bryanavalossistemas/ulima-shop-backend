import sequelize from "../configs/database.js";
import Product from "../models/Product.js";
import { ProductCategory } from "../models/ProductCategory.js";
import { Image } from "../models/Image.js";
import { cloudinary } from "../utils/cloudinary.js";

export class ProductCategoryController {
  static async createProductCategory(req, res) {
    try {
      await sequelize.transaction(async (t) => {
        const { file } = req;
        const { products, name } = req.body;
        if (!file || !products || !name) {
          throw Error;
        }
        const result = await cloudinary.uploader.upload(file.path);
        const image = await Image.create(
          {
            publicId: result.public_id,
            url: result.url,
          },
          { transaction: t }
        );
        const category = await ProductCategory.create(
          {
            name,
            imageId: image.id,
          },
          { transaction: t }
        );
        const productsArray = JSON.parse(products);
        const updatedProducts = productsArray.map((product) => {
          return Product.update(
            { categoryId: category.id },
            { where: { id: product.id }, transaction: t }
          );
        });
        await Promise.all([updatedProducts]);
        return res.sendStatus(200);
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async getAllProductCategories(req, res) {
    try {
      const productCategories = await ProductCategory.findAll({
        include: { model: Product, as: "products" },
        attributes: ["id", "name", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
      const filteredProductCategories = productCategories.map(
        (productCategory) => {
          return {
            id: productCategory.id,
            name: productCategory.name,
            createdAt: productCategory.createdAt,
            products: productCategory.products.length,
          };
        }
      );
      return res.status(200).json(filteredProductCategories);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async getAllProductCategoriesPublic(req, res) {
    try {
      const productCategories = await ProductCategory.findAll({
        include: { model: Image, as: "image" },
        attributes: ["id", "name", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
      const filteredProductCategories = productCategories.map(
        (productCategory) => {
          return {
            id: productCategory.id,
            name: productCategory.name,
            imageUrl: productCategory.image.url,
          };
        }
      );
      return res.status(200).json(filteredProductCategories);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async getProductCategory(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw Error;
      }
      const productCategory = await ProductCategory.findByPk(id, {
        include: [
          { model: Product, as: "products" },
          { model: Image, as: "image" },
        ],
      });
      if (!productCategory) {
        return res.status(404).json("Error");
      }
      return res
        .status(200)
        .json({ ...productCategory, imageUrl: productCategory.image.url });
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateProductCategory(req, res) {
    try {
      await sequelize.transaction(async (t) => {
        const idParam = req.params.id;
        const id = Number(idParam);
        if (Number.isNaN(id) || !Number.isInteger(id)) {
          throw Error;
        }
        const { products, name } = req.body;
        if (!products || !name) {
          throw Error;
        }
        const { file } = req;
        if (file) {
          const { publicId, imageId } = req.body;
          if (!publicId || !imageId) {
            throw Error;
          }
          await cloudinary.uploader.destroy(publicId);
          await Image.destroy({ where: { id: imageId }, transaction: t });
          const result = await cloudinary.uploader.upload(file.path);
          const image = await Image.create(
            {
              publicId: result.public_id,
              url: result.url,
            },
            { transaction: t }
          );
          const category = await ProductCategory.update(
            {
              name,
              imageId: image.id,
            },
            { where: { id }, transaction: t }
          );
          const productsArray = JSON.parse(products);
          const updatedProducts = productsArray.map((product) => {
            return Product.update(
              { categoryId: category.id },
              { where: { id: product.id }, transaction: t }
            );
          });
          await Promise.all([updatedProducts]);
          return res.sendStatus(204);
        } else {
          const category = await ProductCategory.update(
            {
              name,
            },
            { where: { id }, transaction: t }
          );
          const productsArray = JSON.parse(products);
          const updatedProducts = productsArray.map((product) => {
            return Product.update(
              { categoryId: category.id },
              { where: { id: product.id }, transaction: t }
            );
          });
          await Promise.all([updatedProducts]);
          return res.sendStatus(204);
        }
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async deleteProductCategory(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const productCategory = await ProductCategory.findByPk(id);
      if (!productCategory) {
        return res.status(404).json("Error");
      }
      await productCategory.destroy();
      return res.status(200).json(productCategory);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}
