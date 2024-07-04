import Product from "../models/Product.js";
import ProductBrand from "../models/ProductBrand.js";
import { Image } from "../models/Image.js";
import { ProductCategory } from "../models/ProductCategory.js";
import ProductCharacteristic from "../models/ProductCharacteristic.js";
import { Op } from "sequelize";
import sequelize from "../configs/database.js";
import { cloudinary } from "../utils/cloudinary.js";

class ProductController {
  static async createProduct(req, res) {
    try {
      await sequelize.transaction(async (t) => {
        const { file } = req;
        const {
          name,
          price,
          description,
          productCategoryId,
          productBrandId,
          productCharacteristics,
        } = req.body;
        if (
          !file ||
          !name ||
          !price ||
          !description ||
          !productCategoryId ||
          !productBrandId ||
          !productCharacteristics
        ) {
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
        const product = await Product.create(
          {
            name,
            price,
            description,
            productCategoryId,
            productBrandId,
            imageId: image.id,
          },
          { transaction: t }
        );
        const productCharacteristicsArray = JSON.parse(productCharacteristics);
        const createdProductCharacteristics = productCharacteristicsArray.map(
          (productCharacteristic) => {
            return ProductCharacteristic.create({
              name: productCharacteristic.name,
              productId: product.id,
            });
          }
        );
        await Promise.all([createdProductCharacteristics]);
        return res.sendStatus(200);
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: { model: ProductCategory, as: "productCategory" },
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "stock",
          "active",
          "createdAt",
        ],
        order: [["createdAt", "DESC"]],
      });
      const filteredProducts = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          categoryName: product.productCategory.name,
          price: product.price,
          createdAt: product.createdAt,
          stock: product.stock,
          active: product.active,
        };
      });
      return res.status(200).json(filteredProducts);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getProduct(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const product = await Product.findByPk(id, {
        include: [
          { model: ProductCharacteristic, as: "productCharacteristics" },
          { model: ProductCategory, as: "productCategory" },
          { model: ProductBrand, as: "productBrand" },
          { model: Image, as: "image" },
        ],
      });
      if (!product) {
        return res.status(404).json("Error");
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getPublicProduct(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const product = await Product.findByPk(id, {
        include: [
          { model: ProductCharacteristic, as: "productCharacteristics" },
          { model: ProductCategory, as: "productCategory" },
          { model: ProductBrand, as: "productBrand" },
          { model: Image, as: "image" },
        ],
      });
      if (!product) {
        return res.sendStatus(404);
      }
      const productFiltered = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image.url,
        productCharacteristics: product.productCharacteristics,
        productCategory: product.productCategory,
        productBrand: product.productBrand,
      };
      return res.status(200).json(productFiltered);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async updateProduct(req, res) {
    try {
      await sequelize.transaction(async (t) => {
        const idParam = req.params.id;
        const id = Number(idParam);
        if (Number.isNaN(id) || !Number.isInteger(id)) {
          throw Error;
        }
        const {
          name,
          price,
          description,
          productCategoryId,
          productBrandId,
          productCharacteristics,
        } = req.body;
        if (
          !name ||
          !price ||
          !description ||
          !productBrandId ||
          !productCategoryId ||
          !productCharacteristics
        ) {
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
          await Product.update(
            {
              name,
              price,
              description,
              productBrandId,
              productCategoryId,
              imageId: image.id,
            },
            { where: { id }, transaction: t }
          );
          await ProductCharacteristic.destroy({
            where: { productId: id },
            transaction: t,
          });
          const productCharacteristicsArray = JSON.parse(
            productCharacteristics
          );
          const createdProductCharacteristics = productCharacteristicsArray.map(
            (productCharacteristic) => {
              return ProductCharacteristic.create({
                name: productCharacteristic.name,
                productId: id,
              });
            }
          );
          await Promise.all([createdProductCharacteristics]);
          return res.sendStatus(204);
        } else {
          await Product.update(
            {
              name,
              price,
              description,
              productBrandId,
              productCategoryId,
            },
            { where: { id }, transaction: t }
          );
          await ProductCharacteristic.destroy({
            where: { productId: id },
            transaction: t,
          });
          const productCharacteristicsArray = JSON.parse(
            productCharacteristics
          );
          const createdProductCharacteristics = productCharacteristicsArray.map(
            (productCharacteristic) => {
              return ProductCharacteristic.create({
                name: productCharacteristic.name,
                productId: id,
              });
            }
          );
          await Promise.all([createdProductCharacteristics]);
          return res.sendStatus(204);
        }
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json("Error");
      }
      await product.destroy();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateProductCategoryId(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const { productCategoryId } = req.body;
      if (!productCategoryId) {
        throw new Error();
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json("Error");
      }
      product.productCategoryId = productCategoryId;
      await product.save();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async setNullProductCategoryId(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const { productCategoryId } = req.body;
      if (productCategoryId !== null) {
        throw new Error();
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json("Error");
      }
      product.productCategoryId = productCategoryId;
      await product.save();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async toggleProductActive(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json("Error");
      }
      product.active = !product.dataValues.active;
      await product.save();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllProductsActive(req, res) {
    try {
      const products = await Product.findAll({
        include: { model: Image, as: "image" },
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "stock",
          "active",
          "createdAt",
        ],
        where: { active: true },
        order: [["createdAt", "DESC"]],
      });
      const filteredProducts = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          imageUrl: product.image.url,
        };
      });
      return res.status(200).json(filteredProducts);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllProductsByQueryAndOrderBy(req, res) {
    try {
      const { query, orderBy } = req.query;
      if (query === undefined || orderBy === undefined) {
        throw new Error();
      }
      let products = [];
      if (orderBy) {
        products = await Product.findAll({
          include: [
            {
              model: ProductCategory,
              as: "productCategory",
            },
            {
              model: ProductBrand,
              as: "productBrand",
            },
            {
              model: Image,
              as: "image",
            },
          ],
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${query}%` } },
              {
                "$productCategory.name$": { [Op.like]: `%${query}%` },
              },
              {
                "$productBrand.name$": { [Op.like]: `%${query}%` },
              },
            ],
          },
          order: [[`${orderBy}`, "ASC"]],
        });
      } else {
        products = await Product.findAll({
          include: [
            {
              model: ProductCategory,
              as: "productCategory",
            },
            {
              model: ProductBrand,
              as: "productBrand",
            },
            {
              model: Image,
              as: "image",
            },
          ],
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${query}%` } },
              {
                "$productCategory.name$": { [Op.like]: `%${query}%` },
              },
              {
                "$productBrand.name$": { [Op.like]: `%${query}%` },
              },
            ],
          },
        });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllProductsAndProductCategory(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const productCategory = await ProductCategory.findByPk(id, {
        include: [
          { model: Product, as: "products" },
          { model: Image, as: "image" },
        ],
      });
      if (!productCategory) {
        throw Error;
      }
      const products = await Product.findAll({
        include: { model: ProductCategory, as: "productCategory" },
        attributes: ["id", "name", "description"],
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json({
        products,
        productCategory: {
          id: productCategory.id,
          name: productCategory.name,
          image: productCategory.image,
          products: productCategory.products,
        },
      });
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllProductsAndProductBrand(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw Error;
      }
      const productBrand = await ProductBrand.findByPk(id, {
        include: [
          { model: Product, as: "products" },
          { model: Image, as: "image" },
        ],
      });
      if (!productBrand) {
        throw Error;
      }
      const products = await Product.findAll({
        include: { model: ProductBrand, as: "productBrand" },
        attributes: ["id", "name", "description"],
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json({
        products,
        productBrand: {
          id: productBrand.id,
          name: productBrand.name,
          image: productBrand.image,
          products: productBrand.products,
        },
      });
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}

export default ProductController;
