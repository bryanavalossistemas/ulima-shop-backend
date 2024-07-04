import ProductCharacteristic from "../models/ProductCharacteristic.js";
import Product from "../models/Product.js";

class ProductCharacteristicController {
  static async createProductCharacteristic(req, res) {
    try {
      const { name, productId } = req.body;
      if (!name || !productId) {
        throw new Error();
      }
      const productCharacteristic = await ProductCharacteristic.create(
        req.body
      );
      return res.status(201).json(productCharacteristic);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllProductCharacteristics(req, res) {
    try {
      const productCharacteristics = await ProductCharacteristic.findAll();
      return res.status(200).json(productCharacteristics);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getProductCharacteristic(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const productCharacteristic = await ProductCharacteristic.findByPk(id);
      if (!productCharacteristic) {
        return res.status(404).json("Error");
      }
      return res.status(200).json(productCharacteristic);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateProductCharacteristic(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const { name, productId } = req.body;
      if (!name || !productId) {
        throw new Error();
      }
      const productCharacteristic = await ProductCharacteristic.findByPk(id);
      if (!productCharacteristic) {
        return res.status(404).json("Error");
      }
      await productCharacteristic.update(req.body);
      await productCharacteristic.save();
      return res.status(200).json(productCharacteristic);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async deleteProductCharacteristic(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const productCharacteristic = await ProductCharacteristic.findByPk(id);
      if (!productCharacteristic) {
        return res.status(404).json("Error");
      }
      await productCharacteristic.destroy();
      return res.status(200).json(productCharacteristic);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async deleteProductCharacteristicsByProductId(req, res) {
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
      await ProductCharacteristic.destroy({
        where: { productId: product.id },
      });
      return res.status(200).json("Caracteristicas eliminadas correctamente");
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}

export default ProductCharacteristicController;
