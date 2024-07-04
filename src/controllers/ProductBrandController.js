import sequelize from "../configs/database.js";
import Product from "../models/Product.js";
import ProductBrand from "../models/ProductBrand.js";
import { Image } from "../models/Image.js";
import { cloudinary } from "../utils/cloudinary.js";

class ProductBrandController {
  static async createProductBrand(req, res) {
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
        const brand = await ProductBrand.create(
          {
            name,
            imageId: image.id,
          },
          { transaction: t }
        );
        const productsArray = JSON.parse(products);
        const updatedProducts = productsArray.map((product) => {
          return Product.update(
            { brandId: brand.id },
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

  static async getAllProductBrands(req, res) {
    try {
      const productBrands = await ProductBrand.findAll({
        include: [{ model: Product, as: "products" }],
        attributes: ["id", "name", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
      const filteredProductBrands = productBrands.map((productBrand) => {
        return {
          id: productBrand.id,
          name: productBrand.name,
          createdAt: productBrand.createdAt,
          products: productBrand.products.length,
        };
      });
      return res.status(200).json(filteredProductBrands);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async getProductBrand(req, res) {
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
        return res.status(404).json("Error");
      }
      return res
        .status(200)
        .json({ ...productBrand, imageUrl: productBrand.image.url });
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateProductBrand(req, res) {
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
          const brand = await ProductBrand.update(
            {
              name,
              imageId: image.id,
            },
            { where: { id }, transaction: t }
          );
          const productsArray = JSON.parse(products);
          const updatedProducts = productsArray.map((product) => {
            return Product.update(
              { brandId: brand.id },
              { where: { id: product.id }, transaction: t }
            );
          });
          await Promise.all([updatedProducts]);
          return res.sendStatus(204);
        } else {
          const brand = await ProductBrand.update(
            {
              name,
            },
            { where: { id }, transaction: t }
          );
          const productsArray = JSON.parse(products);
          const updatedProducts = productsArray.map((product) => {
            return Product.update(
              { brandId: brand.id },
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

  static async deleteProductBrand(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const productBrand = await ProductBrand.findByPk(id);
      if (!productBrand) {
        return res.status(404).json("Error");
      }
      await productBrand.destroy();
      return res.status(200).json(productBrand);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}

export default ProductBrandController;
