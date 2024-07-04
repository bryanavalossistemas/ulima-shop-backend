import OrderPaymentMethod from "../models/OrderPaymentMethod.js";

class OrderPaymentMethodController {
  static async createOrderPaymentMethod(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        throw new Error();
      }
      const orderPaymentMethod = await OrderPaymentMethod.create(req.body);
      return res.status(201).json(orderPaymentMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllOrderPaymentMethods(req, res) {
    try {
      const orderPaymentMethods = await OrderPaymentMethod.findAll();
      return res.status(200).json(orderPaymentMethods);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getOrderPaymentMethod(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const orderPaymentMethod = await OrderPaymentMethod.findByPk(id);
      if (!orderPaymentMethod) {
        return res.status(404).json("Error");
      }
      return res.status(200).json(orderPaymentMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateOrderPaymentMethod(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const { name } = req.body;
      if (!name) {
        throw new Error();
      }
      const orderPaymentMethod = await OrderPaymentMethod.findByPk(id);
      if (!orderPaymentMethod) {
        return res.status(404).json("Error");
      }
      await orderPaymentMethod.update(req.body);
      await orderPaymentMethod.save();
      return res.status(200).json(orderPaymentMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async deleteOrderPaymentMethod(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const orderPaymentMethod = await OrderPaymentMethod.findByPk(id);
      if (!orderPaymentMethod) {
        return res.status(404).json("Error");
      }
      await orderPaymentMethod.destroy();
      return res.status(200).json(orderPaymentMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}

export default OrderPaymentMethodController;
